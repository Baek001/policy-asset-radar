'use client';
import { useEffect, useState } from 'react';

const KEY = 'ppulse_portfolio_rows_v1';

export default function Portfolio() {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('반도체');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setRows(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(rows));
    } catch {}
  }, [rows]);

  const add = () => {
    const high = title.includes(industry) || title.toLowerCase().includes('규제');
    setRows((r) => [...r, { industry, exposure: high ? '높음' : '중간' }]);
  };

  const clearAll = () => setRows([]);

  return (
    <main>
      <h1>포트폴리오 노출</h1>
      <input placeholder="사건 제목" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <select value={industry} onChange={(e)=>setIndustry(e.target.value)}>
        <option>반도체</option><option>금융</option><option>통신</option><option>에너지</option>
      </select>
      <button onClick={add}>계산</button>
      <button onClick={clearAll} style={{ marginLeft: 8 }}>초기화</button>
      <p>저장된 항목: {rows.length}개</p>
      <ul>{rows.map((x,i)=><li key={i}>{x.industry}: {x.exposure}</li>)}</ul>
    </main>
  );
}
