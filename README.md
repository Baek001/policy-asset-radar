# Policy Asset Radar (MVP)

무료 플랜 기준(Vercel + Supabase)으로 오늘 안에 배포 가능한 MVP 구조입니다.

## 1) 스택
- Frontend/API: Next.js (Vercel Free)
- DB/Auth: Supabase Free
- Language: ko (기본)

## 2) 환경변수 (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## 3) 실행
```bash
npm install
npm run dev
```

## 4) DB 테이블 생성
Supabase SQL Editor에서 `supabase/schema.sql` 실행

## 5) 배포
- GitHub에 push
- Vercel에서 해당 repo import
- Environment Variables에 위 2개 등록

## 6) 오늘 목표 기능
- 사건(Event) 목록 피드
- 사건 카드 상세(요약/태그/근거/원문 링크)
- 포트폴리오 노출 등급(라벨)
