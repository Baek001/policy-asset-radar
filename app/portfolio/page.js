'use client';
import { useState } from 'react';

export default function Portfolio() {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('반도체');
  const [rows, setRows] = useState([]);

  const add = () => {
    const high = title.includes(industry) || title.toLowerCase().includes('규제');
    setRows((r) => [...r, { industry, exposure: high ? '높음' : '중간' }]);
  };

  return (
    <main>
      <h1>포트폴리오 노출</h1>
      <input placeholder="사건 제목" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <select value={industry} onChange={(e)=>setIndustry(e.target.value)}>
        <option>반도체</option><option>금융</option><option>통신</option><option>에너지</option>
      </select>
      <button onClick={add}>계산</button>
      <ul>{rows.map((x,i)=><li key={i}>{x.industry}: {x.exposure}</li>)}</ul>
    </main>
  );
}
