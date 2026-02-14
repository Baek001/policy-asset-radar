'use client';
import { useEffect, useState } from 'react';
import { livingImpactFromTags } from '../../lib/core';

const KEY = 'ppulse_living_tags_v1';

export default function LivingPage() {
  const [tags, setTags] = useState('요금,세금');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setTags(raw);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, tags);
    } catch {}
  }, [tags]);

  const arr = tags.split(',').map((x) => x.trim()).filter(Boolean);
  const impacts = livingImpactFromTags(arr);

  return (
    <main>
      <h1>생활비 영향</h1>
      <p>태그를 쉼표로 입력 (예: 요금,세금,인프라)</p>
      <input value={tags} onChange={(e)=>setTags(e.target.value)} style={{ width: 360 }} />
      <h3>영향 항목</h3>
      <ul>{impacts.map((i)=><li key={i}>{i}</li>)}</ul>

      <h3>이번 입력 요약</h3>
      <p>입력 태그 {arr.length}개 / 영향 항목 {impacts.length}개</p>
    </main>
  );
}
