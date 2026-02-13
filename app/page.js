import Link from 'next/link';
import { getSupabaseServerClient } from '../lib/supabase';

export default async function Home() {
  const supabase = getSupabaseServerClient();
  let events = [];

  if (supabase) {
    const { data } = await supabase
      .from('events')
      .select('id,title,summary_ko,impact_level,created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    events = data || [];
  }

  return (
    <main>
      <h1>PPulse</h1>
      <p>정책/법안 변화가 내 자산·생활비에 미치는 영향</p>
      <p><Link href="/portfolio">포트폴리오 노출 계산기 →</Link></p>
      <hr />
      <h2>사건 피드</h2>
      {events.length === 0 ? (
        <p>이벤트가 아직 없습니다. Supabase에 seed 데이터를 넣어주세요.</p>
      ) : (
        <ul>
          {events.map((e) => (
            <li key={e.id} style={{ marginBottom: 16 }}>
              <b>{e.title}</b> [{e.impact_level}] <Link href={`/events/${e.id}`}>상세</Link>
              <div>{e.summary_ko}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
