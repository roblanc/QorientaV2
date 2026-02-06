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

-- 5. Create the leads table (for email capture and quiz results)
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  name text,
  audience_type text, -- 'student', 'adult', 'unknown'
  source text,        -- 'mystery_landing_illustration', 'quiz_end'
  quiz_result text    -- e.g. 'creative', 'technical'
);

-- 6. Enable RLS for leads
alter table leads enable row level security;

-- 7. Policies for leads
-- Allow anyone (anon) to insert leads
create policy "Public can insert leads" 
on leads for insert 
to anon 
with check (true);

-- Only service_role (admin) can read leads (protect user privacy)
create policy "Admin can view leads" 
on leads for select 
to service_role 
using (true);

-- 8. Create the messages table (for contact form)
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text not null,
  message text not null,
  status text default 'new' -- 'new', 'read', 'replied'
);

-- 9. Enable RLS for messages
alter table messages enable row level security;

-- 10. Policies for messages
-- Allow anyone to insert messages
create policy "Public can insert messages" 
on messages for insert 
to anon 
with check (true);

-- Only admin can read messages
create policy "Admin can view messages" 
on messages for select 
to service_role 
using (true);
