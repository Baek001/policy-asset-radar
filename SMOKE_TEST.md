# PPulse 로컬 스모크 테스트

> Last quick run: 2026-02-15 08:12 KST (production endpoints healthy)

아래 순서대로 실행하면 배포 전 핵심 동작을 빠르게 점검할 수 있습니다.

1. 개발 서버 실행
```bash
npm run dev
```

2. 상태 확인
- `http://localhost:3000/api/health`
- 기대값: `ok: true`, env 항목 true(로컬 .env 설정 시), feedCount > 0

3. 피드 적재
- `http://localhost:3000/api/ingest`
- 기대값: `ok: true`, inserted >= 0

4. 데모 출력
- `http://localhost:3000/api/demo`
- 기대값: top 배열 5개 이하, title/impact/evidence 포함

5. 화면 확인
- `/` 홈: 실시간 카드, 근거문장, 노출 신호 표시
- `/portfolio` : 항목 저장/초기화 동작
- `/living` : 태그 저장 및 요약 동작
- `/auth` : 이메일 링크/구글 로그인 버튼 노출

6. 빌드 검증
```bash
npm run build
```
