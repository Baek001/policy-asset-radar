'use client';
import { useState } from 'react';
import { livingImpactFromTags } from '../../lib/core';

export default function LivingPage() {
  const [tags, setTags] = useState('요금,세금');
  const arr = tags.split(',').map((x) => x.trim()).filter(Boolean);
  const impacts = livingImpactFromTags(arr);

  return (
    <main>
      <h1>생활비 영향</h1>
      <p>태그를 쉼표로 입력 (예: 요금,세금,인프라)</p>
      <input value={tags} onChange={(e)=>setTags(e.target.value)} style={{ width: 360 }} />
      <h3>영향 항목</h3>
      <ul>{impacts.map((i)=><li key={i}>{i}</li>)}</ul>
    </main>
  );
}
