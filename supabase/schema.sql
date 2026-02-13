create extension if not exists pgcrypto;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary_ko text not null,
  impact_level text not null check (impact_level in ('low','mid','high')),
  tags text[] default '{}',
  source_url text,
  created_at timestamptz not null default now()
);

insert into events (title, summary_ko, impact_level, tags, source_url)
values
('개인정보 규제 강화 보도', '개인정보 처리 기준 강화가 예고되며 기업의 준수 비용이 늘어날 가능성이 있습니다.', 'mid', '{세금,의무}', 'https://example.com/1'),
('에너지 요금 정책 조정', '요금 정책 조정 발표로 공과금 및 생활비 항목 변동 가능성이 제기됩니다.', 'high', '{요금,인프라}', 'https://example.com/2')
on conflict do nothing;
