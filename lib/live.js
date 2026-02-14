const GNEWS_ENDPOINT = 'https://gnews.io/api/v4/search';
const NAVER_ENDPOINT = 'https://openapi.naver.com/v1/search/news.json';
const GOVTRACK_BILL_ENDPOINT = 'https://www.govtrack.us/api/v2/bill';

function toImpactLevel(text = '') {
  const t = text.toLowerCase();
  if (/ban|sanction|emergency|shock|crisis|폭락|급등|강화|규제/.test(t)) return 'high';
  if (/tax|tariff|subsidy|요금|세금|법안|policy|bill/.test(t)) return 'mid';
  return 'low';
}

function tagFromText(text = '') {
  const tags = [];
  if (/tax|세금|관세/.test(text)) tags.push('세금');
  if (/rate|요금|utility|전기|가스/.test(text)) tags.push('요금');
  if (/regulation|규제|compliance|의무/.test(text)) tags.push('규제');
  if (/subsidy|보조금|지원/.test(text)) tags.push('보조금');
  if (/energy|석유|gas|oil|전력/.test(text)) tags.push('에너지');
  return [...new Set(tags)];
}

function stripHtml(s = '') {
  return String(s).replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

function evidenceLines(text = '') {
  const bits = String(text)
    .split(/[.!?。\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 18)
    .slice(0, 3);
  if (bits.length >= 2) return bits;
  if (bits.length === 1) return [bits[0], bits[0]];
  return ['근거 문장 확보 필요', '원문 링크에서 본문 확인'];
}

function normalizeNews(items = [], region = 'global') {
  return items.map((x, i) => {
    const title = stripHtml(x.title || x.title_origin || '제목 없음');
    const body = stripHtml(x.description || x.originallink || x.content || '');
    const joined = `${title} ${body}`;
    return {
      id: `${region}-news-${i}-${Buffer.from(title).toString('base64').slice(0, 8)}`,
      type: 'news',
      region,
      title,
      summary: body,
      evidence: evidenceLines(body || title),
      source_url: x.url || x.link || x.originallink || null,
      impact_level: toImpactLevel(joined),
      tags: tagFromText(joined),
      published_at: x.publishedAt || x.pubDate || new Date().toISOString(),
    };
  });
}

function normalizeBills(items = [], region = 'us') {
  return items.map((x, i) => {
    const title = x.title || x.display_number || '법안';
    const summary = x.current_status_description || x.title_without_number || '최근 법안 업데이트';
    const joined = `${title} ${summary}`;
    return {
      id: `${region}-bill-${i}-${Buffer.from(title).toString('base64').slice(0, 8)}`,
      type: 'bill',
      region,
      title,
      summary,
      evidence: evidenceLines(`${title}. ${summary}`),
      source_url: x.link || x.url || null,
      impact_level: toImpactLevel(joined),
      tags: [...new Set(['법안', ...tagFromText(joined)])],
      published_at: x.current_status_date || x.introduced_date || new Date().toISOString(),
    };
  });
}

function clusterByTitle(items = []) {
  const m = new Map();
  for (const it of items) {
    const key = (it.title || '').toLowerCase().replace(/\s+/g, ' ').trim();
    if (!key) continue;
    if (!m.has(key)) {
      m.set(key, { ...it, related_count: 1 });
    } else {
      const prev = m.get(key);
      m.set(key, { ...prev, related_count: (prev.related_count || 1) + 1 });
    }
  }
  return [...m.values()];
}

export async function fetchLiveFeed() {
  const tasks = [];

  const gnewsKey = process.env.GNEWS_API_KEY;
  if (gnewsKey) {
    tasks.push(
      fetch(`${GNEWS_ENDPOINT}?q=(policy OR bill OR regulation) AND (US OR America)&lang=en&max=8&apikey=${gnewsKey}`, { next: { revalidate: 1800 } })
        .then((r) => (r.ok ? r.json() : { articles: [] }))
        .then((j) => normalizeNews(j.articles || [], 'us'))
        .catch(() => [])
    );
  } else {
    tasks.push(Promise.resolve([]));
  }

  const naverId = process.env.NAVER_CLIENT_ID;
  const naverSecret = process.env.NAVER_CLIENT_SECRET;
  if (naverId && naverSecret) {
    const headers = { 'X-Naver-Client-Id': naverId, 'X-Naver-Client-Secret': naverSecret };
    tasks.push(
      fetch(`${NAVER_ENDPOINT}?query=${encodeURIComponent('정책 OR 법안 OR 규제')}&display=8&sort=date`, { headers, next: { revalidate: 1800 } })
        .then((r) => (r.ok ? r.json() : { items: [] }))
        .then((j) => normalizeNews(j.items || [], 'kr'))
        .catch(() => [])
    );

    // KR major bill-related news (crawler substitute for MVP)
    tasks.push(
      fetch(`${NAVER_ENDPOINT}?query=${encodeURIComponent('국회 법안 발의')}&display=6&sort=date`, { headers, next: { revalidate: 3600 } })
        .then((r) => (r.ok ? r.json() : { items: [] }))
        .then((j) => normalizeBills((j.items || []).map((x) => ({
          title: x.title,
          current_status_description: x.description,
          link: x.link || x.originallink,
          current_status_date: x.pubDate,
        })), 'kr'))
        .catch(() => [])
    );
  } else {
    tasks.push(Promise.resolve([]), Promise.resolve([]));
  }

  // US bills via public GovTrack API (no key)
  tasks.push(
    fetch(`${GOVTRACK_BILL_ENDPOINT}?sort=-current_status_date&limit=8`, { next: { revalidate: 3600 } })
      .then((r) => (r.ok ? r.json() : { objects: [] }))
      .then((j) => normalizeBills((j.objects || []).map((x) => ({
        title: `${x.display_number || ''} ${x.title_without_number || ''}`.trim(),
        current_status_description: x.current_status_description,
        link: x.link,
        current_status_date: x.current_status_date,
      })), 'us'))
      .catch(() => [])
  );

  const [usNews, krNews, krBills, usBills] = await Promise.all(tasks);

  return clusterByTitle([...usNews, ...krNews, ...usBills, ...krBills])
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 30);
}
