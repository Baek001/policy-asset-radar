import Link from 'next/link';
import { getSupabaseServerClient } from '../../../lib/supabase';

export default async function EventDetail({ params }) {
  const supabase = getSupabaseServerClient();
  const id = params.id;

  let event = null;
  if (supabase) {
    const { data } = await supabase
      .from('events')
      .select('id,title,summary_ko,impact_level,created_at')
      .eq('id', id)
      .single();
    event = data;
  }

  if (!event) {
    return (
      <main>
        <h1>사건을 찾을 수 없습니다.</h1>
        <Link href="/">← 피드로 돌아가기</Link>
      </main>
    );
  }

  return (
    <main>
      <Link href="/">← 피드로 돌아가기</Link>
      <h1>{event.title}</h1>
      <p><b>영향도:</b> {event.impact_level}</p>
      <p><b>요약:</b> {event.summary_ko}</p>
      <p><b>생성시각:</b> {new Date(event.created_at).toLocaleString('ko-KR')}</p>
    </main>
  );
}
