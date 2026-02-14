import { supabase } from './core';
import { fetchLiveFeed } from './live';

function normalizeSummary(item) {
  return (item.summary || item.title || '요약 없음').replace(/\s+/g, ' ').trim().slice(0, 700);
}

export async function ingestLiveFeedToDb() {
  const db = supabase();
  if (!db) {
    return { ok: false, reason: 'missing_supabase_env', inserted: 0, scanned: 0 };
  }

  const live = await fetchLiveFeed();
  if (!live.length) return { ok: true, inserted: 0, scanned: 0 };

  const { data: recent } = await db
    .from('events')
    .select('title, source_url')
    .order('created_at', { ascending: false })
    .limit(300);

  const seen = new Set((recent || []).map((x) => `${x.title}__${x.source_url || ''}`));

  const rows = live
    .filter((x) => !seen.has(`${x.title}__${x.source_url || ''}`))
    .map((x) => ({
      title: x.title,
      summary_ko: normalizeSummary(x),
      impact_level: x.impact_level === 'high' ? 'high' : x.impact_level === 'mid' ? 'mid' : 'low',
      tags: x.tags || [],
      source_url: x.source_url || null,
    }));

  if (!rows.length) return { ok: true, inserted: 0, scanned: live.length };

  const { error } = await db.from('events').insert(rows);
  if (error) return { ok: false, reason: error.message, inserted: 0, scanned: live.length };

  return { ok: true, inserted: rows.length, scanned: live.length };
}
