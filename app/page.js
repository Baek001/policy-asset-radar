import Link from 'next/link';
import { supabase, fiveLineSummary, assetExposureFromEvent, livingImpactFromTags } from '../lib/core';
import { fetchLiveFeed } from '../lib/live';
import AuthStatus from '../components/AuthStatus';

export default async function Home() {
  const db = supabase();
  let events = [];
  if (db) {
    const { data } = await db.from('events').select('*').order('created_at', { ascending: false }).limit(10);
    events = data || [];
  }

  const live = await fetchLiveFeed();

  return (
    <main>
      <h1>PPulse</h1>
      <p>미국/한국 우선 뉴스·법안 + 자산/생활비 영향 신호</p>
      <p><Link href="/portfolio">포트폴리오</Link> | <Link href="/living">생활비 영향</Link> | <AuthStatus /> | <a href="/api/ingest" target="_blank">DB 동기화 실행</a> | <a href="/api/health" target="_blank">상태 확인</a> | <a href="/api/demo" target="_blank">데모 JSON</a></p>
      <hr />

      <h2>실시간 정책/법안 피드</h2>
      {live.length === 0 ? <p>실시간 피드 없음 (API 키 확인 필요)</p> : (
        <ul>
          {live.map((e) => {
            const exposure = assetExposureFromEvent({ title: e.title, tags: e.tags }).slice(0, 2);
            const living = livingImpactFromTags(e.tags || []);
            return (
              <li key={e.id} style={{ marginBottom: 16 }}>
                <b>{e.title}</b> [{e.region.toUpperCase()} · {e.type} · {e.impact_level}]
                <div>{fiveLineSummary(e.summary).slice(0, 2).join(' / ')}</div>
                <div>자산 노출: {exposure.map((x) => `${x.asset}:${x.level}`).join(', ')}</div>
                <div>생활비 노출: {living.join(', ')}</div>
                <div>근거: {(e.evidence || []).slice(0,2).join(' / ')}</div>
                <div>태그: {(e.tags || []).join(', ') || '없음'} {e.related_count > 1 ? `(관련 ${e.related_count}건)` : ''} {e.source_url ? <a href={e.source_url} target="_blank">원문</a> : null}</div>
              </li>
            );
          })}
        </ul>
      )}

      <hr />
      <h2>내 DB 이벤트</h2>
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
