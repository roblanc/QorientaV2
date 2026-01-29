-- Run this in the Supabase SQL Editor to set up the live voting system

-- 1. Create the table
create table logo_votes (
  logo_id text primary key,
  count int default 0
);

-- 2. Enable Row Level Security (RLS)
alter table logo_votes enable row level security;

-- 3. Create policies
-- Allow anyone to read
create policy "Public can read votes" 
on logo_votes for select 
to anon 
using (true);

-- Allow anyone to insert/update (or better, use the function below)
create policy "Public can update" 
on logo_votes for all 
to anon 
using (true)
with check (true);


-- 4. Create a function to securely increment votes (Prevents race conditions)
create or replace function increment_vote(logo_slug text)
returns void as
$$
begin
  insert into logo_votes (logo_id, count)
  values (logo_slug, 1)
  on conflict (logo_id)
  do update set count = logo_votes.count + 1;
end;
$$ language plpgsql;
