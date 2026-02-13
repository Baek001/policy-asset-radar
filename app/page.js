import Link from 'next/link';
import { supabase, fiveLineSummary } from '../lib/core';

export default async function Home() {
  const db = supabase();
  let events = [];
  if (db) {
    const { data } = await db.from('events').select('*').order('created_at', { ascending: false }).limit(20);
    events = data || [];
  }

  return (
    <main>
      <h1>PPulse</h1>
      <p>정책/법안 변화가 내 자산과 생활비에 주는 영향</p>
      <p><Link href="/portfolio">포트폴리오</Link> | <Link href="/living">생활비 영향</Link></p>
      <hr />
      {events.length === 0 ? <p>이벤트 없음</p> : (
        <ul>
          {events.map((e) => (
            <li key={e.id} style={{ marginBottom: 18 }}>
              <b>{e.title}</b> [{e.impact_level}] <Link href={`/events/${e.id}`}>상세</Link>
              <div>{fiveLineSummary(e.summary_ko).slice(0,2).join(' / ')}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
