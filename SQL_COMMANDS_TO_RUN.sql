-- COPY AND PASTE THE CODE BELOW INTO SUPABASE SQL EDITOR

-- 5. Create the leads table (Safe to re-run, will skip if exists)
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

-- 7. Policies for leads (Drop first to avoid errors)
drop policy if exists "Public can insert leads" on leads;
create policy "Public can insert leads" 
on leads for insert 
to anon 
with check (true);

drop policy if exists "Admin can view leads" on leads;
create policy "Admin can view leads" 
on leads for select 
to authenticated -- CHANGED: Allow any logged-in user (your team)
using (true);

-- 8. Create the messages table
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
drop policy if exists "Public can insert messages" on messages;
create policy "Public can insert messages" 
on messages for insert 
to anon 
with check (true);

drop policy if exists "Admin can view messages" on messages;
create policy "Admin can view messages" 
on messages for select 
to authenticated -- CHANGED: Allow any logged-in user (your team)
using (true);
