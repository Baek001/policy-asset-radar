import Link from 'next/link';
import { supabase, fiveLineSummary } from '../../../lib/core';

export default async function EventPage({ params }) {
  const db = supabase();
  const { data } = db ? await db.from('events').select('*').eq('id', params.id).single() : { data: null };
  if (!data) return <main><p>사건 없음</p><Link href="/">뒤로</Link></main>;

  const lines = fiveLineSummary(data.summary_ko);
  return (
    <main>
      <Link href="/">← 피드</Link>
      <h1>{data.title}</h1>
      <p>영향도: {data.impact_level}</p>
      <h3>5줄 요약</h3>
      <ol>{lines.map((l, i) => <li key={i}>{l}</li>)}</ol>
      <p>원문: {data.source_url ? <a href={data.source_url}>링크</a> : '없음'}</p>
    </main>
  );
}
