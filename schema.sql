create extension if not exists pgcrypto;

create table workouts(
id uuid primary key default gen_random_uuid(),
user_id uuid,
date date,
type text,
distance numeric,
duration integer,
notes text,
updated_at timestamptz default now()
);

create table observations(
id uuid primary key default gen_random_uuid(),
workout_id uuid references workouts(id) on delete cascade,
user_id uuid,
content text,
updated_at timestamptz default now()
);

alter table workouts enable row level security;
alter table observations enable row level security;
