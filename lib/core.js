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
    인프라: '교통/공과금(간접)'
  };
  const hits = tags.map((t) => map[t]).filter(Boolean);
  return hits.length ? [...new Set(hits)] : ['직접 연결 없음'];
}
