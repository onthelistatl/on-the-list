create table clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  neighborhood text not null,
  city text not null default 'Atlanta',
  genre text,
  dress_code text,
  last_call text,
  cover_tiers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table clubs enable row level security;

create policy "Clubs are viewable by everyone"
  on clubs for select
  using (true);
