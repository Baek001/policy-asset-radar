import { fetchLiveFeed } from '../../../lib/live';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = [];

  checks.push({
    key: 'supabase_env',
    ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  });
  checks.push({
    key: 'news_env',
    ok: Boolean(process.env.GNEWS_API_KEY && process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET),
  });

  let feedCount = 0;
  try {
    const feed = await fetchLiveFeed();
    feedCount = feed.length;
  } catch {}

  checks.push({ key: 'feed_non_empty', ok: feedCount > 0, value: feedCount });

  const ok = checks.every((c) => c.ok);
  return Response.json({ ok, checks, checkedAt: new Date().toISOString() });
}
