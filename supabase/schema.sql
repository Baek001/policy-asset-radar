create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary_ko text not null,
  impact_level text not null check (impact_level in ('low','mid','high')),
  created_at timestamptz not null default now()
);

insert into events (title, summary_ko, impact_level)
values
('개인정보 규제 강화 보도', '규제 강화 가능성이 제기되며 관련 업종의 비용 구조 변화가 예상됩니다.', 'mid'),
('에너지 요금 정책 조정 발표', '공과금 관련 생활비 항목에 중기적 영향 가능성이 있습니다.', 'high')
on conflict do nothing;
