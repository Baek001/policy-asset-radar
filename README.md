# PPulse

해커톤 제출용 실사용 MVP.

## 스택
- Next.js + Supabase + Vercel

## 환경변수
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## 페이지
- / : 사건 피드
- /events/[id] : 사건 상세 + 5줄 요약
- /portfolio : 포트폴리오 노출 계산
- /living : 생활비 영향

## 실행
npm install
npm run dev

## 배포
GitHub push 후 Vercel 자동 배포
