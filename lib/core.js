import { createClient } from '@supabase/supabase-js';

export function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export function fiveLineSummary(raw = '') {
  const s = raw.replace(/\s+/g, ' ').trim();
  const cut = (n) => (s.length > n ? s.slice(0, n) + '...' : s || '정보 없음');
  return [
    `무엇이 바뀌나: ${cut(60)}`,
    '누가 대상인가: 개인 투자자/관련 업종',
    '언제 적용되나: 원문 기준 시점 확인 필요',
    '돈은 어디서 움직이나: 비용 레버(요금/세금/의무) 점검',
    '투자자 관점: 직접 영향 업종 우선 체크',
  ];
}

export function livingImpactFromTags(tags = []) {
  const map = {
    요금: '공과금',
    세금: '세금',
    부담금: '통신/금융수수료',
    수수료: '통신/금융수수료',
    인프라: '교통/공과금(간접)',
    에너지: '전기/가스/연료',
    규제: '행정비용(간접)'
  };
  const hits = tags.map((t) => map[t]).filter(Boolean);
  return hits.length ? [...new Set(hits)] : ['직접 연결 없음'];
}

export function assetExposureFromEvent({ title = '', tags = [] } = {}, portfolio = []) {
  const t = `${title} ${(tags || []).join(' ')}`.toLowerCase();
  const defaults = ['반도체', '금융', '통신', '에너지'];
  const names = (portfolio && portfolio.length ? portfolio : defaults).map((x) => String(x));

  return names.map((name) => {
    const n = name.toLowerCase();
    let level = 'low';
    let reason = '간접 연관 가능성';

    if (t.includes(n)) {
      level = 'high';
      reason = '자산/업종 직접 언급';
    } else if ((n.includes('에너지') && /에너지|요금|인프라/.test(t)) || (n.includes('금융') && /세금|수수료|규제/.test(t)) || (n.includes('통신') && /수수료|요금|규제/.test(t)) || (n.includes('반도체') && /규제|제재|관세/.test(t))) {
      level = 'mid';
      reason = '비용 레버/규제 태그 연동';
    }

    return { asset: name, level, reason };
  });
}
