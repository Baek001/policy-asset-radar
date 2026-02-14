# PPulse

해커톤 제출용 실사용 MVP.

## 스택
- Next.js + Supabase + Vercel

## 환경변수
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- GNEWS_API_KEY
- NAVER_CLIENT_ID
- NAVER_CLIENT_SECRET

## 페이지
- / : 사건 피드
- /events/[id] : 사건 상세 + 5줄 요약
- /portfolio : 포트폴리오 노출 계산
- /living : 생활비 영향
- /auth : 이메일/구글 로그인

## 실행
npm install
npm run dev

## 동기화
- `GET /api/ingest` : 실시간 피드를 Supabase events 테이블로 적재
- `GET /api/health` : 환경변수 연결 상태 + 피드 수집 상태 확인
- `GET /api/demo` : 상위 이슈 5개 데모 응답(JSON)
- `GET /api/release-status` : 배포 직전 필수 체크 종합 상태(JSON)

## 배포
GitHub push 후 Vercel 자동 배포
