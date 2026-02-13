'use client';

import { useMemo, useState } from 'react';
import { scoreExposure } from '../../lib/supabase';

export default function PortfolioPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', industry: '반도체', amount: '' });
  const [event, setEvent] = useState({ title: '', summary: '' });

  const addItem = () => {
    if (!form.name || !form.amount) return;
    setItems((prev) => [...prev, { ...form, amount: Number(form.amount) }]);
    setForm({ name: '', industry: '반도체', amount: '' });
  };

  const exposures = useMemo(() => {
    return items.map((item) => ({
      ...item,
      exposure: scoreExposure(event.title, event.summary, item.industry),
      reason:
        scoreExposure(event.title, event.summary, item.industry) === '높음'
          ? '사건 텍스트에 업종 키워드가 직접 포함됨'
          : '직접 키워드 일치가 없어 간접 영향으로 분류',
    }));
  }, [items, event]);

  return (
    <main>
      <h1>포트폴리오 노출 계산(초기 버전)</h1>

      <h3>사건 입력</h3>
      <input placeholder="사건 제목" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
      <br />
      <textarea placeholder="사건 요약" value={event.summary} onChange={(e) => setEvent({ ...event, summary: e.target.value })} rows={4} cols={60} />

      <h3>보유 종목 추가</h3>
      <input placeholder="종목명" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}>
        <option>반도체</option><option>2차전지</option><option>금융</option><option>통신</option><option>에너지</option><option>바이오</option>
      </select>
      <input placeholder="금액" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <button onClick={addItem}>추가</button>

      <h3>노출 결과</h3>
      <ul>
        {exposures.map((x, i) => (
          <li key={i}>
            <b>{x.name}</b> ({x.industry}) - {x.exposure} / {x.reason}
          </li>
        ))}
      </ul>
    </main>
  );
}
