# Deploy Handoff (when user says "배포해")

1. Vercel env 확인
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- GNEWS_API_KEY
- NAVER_CLIENT_ID
- NAVER_CLIENT_SECRET

2. Redeploy 실행
- latest commit 기준 재배포

3. 배포 직후 점검
- /api/health
- /api/ingest
- /api/demo
- /auth 로그인/로그아웃

4. 사용자 보고 포맷
- commit hash
- deploy URL
- 정상 동작 확인 항목
