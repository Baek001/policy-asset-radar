import { createClient } from '@supabase/supabase-js';

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export const INDUSTRY_KEYWORDS = {
  "반도체": ["반도체", "chip", "semiconductor"],
  "2차전지": ["배터리", "2차전지", "battery"],
  "금융": ["금융", "은행", "보험", "증권"],
  "통신": ["통신", "요금", "telecom"],
  "에너지": ["에너지", "전기", "가스", "유가"],
  "바이오": ["의약", "바이오", "헬스"],
};

export function scoreExposure(title = '', summary = '', industry = '') {
  const text = `${title} ${summary}`.toLowerCase();
  const words = INDUSTRY_KEYWORDS[industry] || [];
  const hit = words.some((w) => text.includes(w.toLowerCase()));
  return hit ? '높음' : '낮음';
}
