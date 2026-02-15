'use client';

import { useEffect, useMemo, useState } from 'react';

const CATEGORIES = [
  '세금', '전기·가스요금', '교통비', '통신비', '대출금리', '월세', '보험료', '식료품',
  '국내주식', '미국주식', '코인', '환율(원달러)', '금리',
  '밀가루', '원두', '설탕', '우유', '돼지고기', '닭고기', '원유', '알루미늄', '구리'
];

export default function OnboardingGate({ children }) {
  const [selected, setSelected] = useState([]);
  const ready = selected.length >= 3;

  useEffect(() => {
    const raw = localStorage.getItem('ppulse_onboarding_categories');
    if (raw) {
      try { setSelected(JSON.parse(raw)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ppulse_onboarding_categories', JSON.stringify(selected));
  }, [selected]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggle = (item) => {
    setSelected((prev) => {
      const has = prev.includes(item);
      if (has) return prev.filter((x) => x !== item);
      if (prev.length >= 12) return prev;
      return [...prev, item];
    });
  };

  if (!ready) {
    return (
      <main>
        <h1>PPulse 시작 설정</h1>
        <p>관심 카테고리를 최소 3개 선택해주세요. (최대 12개)</p>
        <p><b>선택됨:</b> {selected.length} / 12</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {CATEGORIES.map((item) => (
            <button
              key={item}
              onClick={() => toggle(item)}
              style={{
                borderColor: selectedSet.has(item) ? '#66d9ef' : undefined,
                background: selectedSet.has(item) ? 'rgba(102,217,239,0.18)' : undefined
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <p style={{ marginTop: 16, color: '#9fb0d9' }}>3개 이상 선택하면 자동으로 대시보드가 열립니다.</p>
      </main>
    );
  }

  return children;
}
