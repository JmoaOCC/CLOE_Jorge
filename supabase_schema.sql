create table workouts (
 id uuid primary key default gen_random_uuid(),
 date date not null,
 type text,
 distance numeric,
 duration integer,
 notes text,
 updated_at timestamptz default now()
);

create table observations (
 id uuid primary key default gen_random_uuid(),
 workout_id uuid references workouts(id),
 content text
);
