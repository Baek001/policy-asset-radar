# PPulse 배포 전 체크리스트

## 1) 로컬 기능 확인
- [ ] `npm run build` 성공
- [ ] `/api/health` 응답 확인 (`ok:true`)
- [ ] `/api/ingest` 실행 후 DB 적재 확인
- [ ] 홈 피드에 뉴스/법안/근거문장 표시 확인
- [ ] 포트폴리오/생활비 로컬 저장 확인
- [ ] 로그인 페이지 동작 확인 (`/auth`)

## 2) Vercel 환경변수
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `GNEWS_API_KEY`
- [ ] `NAVER_CLIENT_ID`
- [ ] `NAVER_CLIENT_SECRET`

## 3) Supabase Auth 설정
- [ ] Email provider ON
- [ ] Google provider ON (Client ID/Secret 등록)
- [ ] Redirect URL 확인 (Vercel 도메인)

## 4) 배포 직후 점검
- [x] 홈 접속
- [x] `/api/health` 연결 상태 정상
- [x] `/api/release-status` 종합 체크 OK
- [x] `/api/ingest` 성공 및 DB 신규 적재
- [ ] 로그인/로그아웃 동작
- [x] 주요 페이지(/, /portfolio, /living, /auth) 정상

### 최근 검증 기록
- 2026-02-15 07:42 KST: `/api/health` ok, `/api/release-status` ok, `/api/demo` ok

## 5) 출시 판단
- [ ] 주요 기능 동작
- [ ] 데이터 수집 정상
- [ ] 오류 로그 없음
- [ ] 사용자 공개 가능
