create table reports (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references clubs (id) on delete cascade,
  crowd_level smallint not null check (crowd_level between 1 and 5),
  cover_paid numeric not null default 0 check (cover_paid >= 0),
  created_at timestamptz not null default now()
);

alter table reports enable row level security;

create policy "Reports are viewable by everyone"
  on reports for select
  using (true);

create policy "Anyone can submit a report"
  on reports for insert
  with check (true);
