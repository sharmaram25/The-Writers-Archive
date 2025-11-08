-- Supabase schema for The Writer's Archive
-- Run this in the SQL editor. Adjust schema name if needed (defaults to public).

-- Enable UUID extension (already enabled on many Supabase projects)
create extension if not exists "uuid-ossp";

-- Shayris table: stores each poem
create table if not exists public.shayris (
  id uuid primary key default uuid_generate_v4(),
  title text,
  preview text, -- auto-generated via trigger from first 4 lines of full_content
  full_content text not null,
  theme text constraint shayris_theme_check check (theme in ('Love','Heart Break','Dreams','Memories')),
  image_url text,
  created_at timestamptz default now()
);

-- Helpful index for newest-first queries
create index if not exists shayris_created_at_idx on public.shayris (created_at desc);

-- Automatic preview generation trigger (first 4 lines of full_content)
create or replace function public.generate_preview() returns trigger as $$
declare
  preview_text text;
begin
  -- Build preview from the first 4 lines using regexp_split_to_table for broad compatibility
  select string_agg(line, E'\n') into preview_text
  from (
    select line
    from regexp_split_to_table(coalesce(new.full_content,''), E'\n') as line
    limit 4
  ) t;
  new.preview := preview_text;
  return new;
end; $$ language plpgsql;

drop trigger if exists shayris_preview_trg on public.shayris;
create trigger shayris_preview_trg before insert or update on public.shayris
for each row execute function public.generate_preview();

-- Row Level Security (RLS) considerations:
-- If you enable RLS, you must add policies. Example read-only public access:
-- alter table public.shayris enable row level security;
-- create policy "Public read" on public.shayris for select using (true);
-- create policy "Allow inserts" on public.shayris for insert with check (true);
-- create policy "Allow updates" on public.shayris for update using (true) with check (true);
-- create policy "Allow deletes" on public.shayris for delete using (true);
-- NOTE: Refine policies for production; the above are fully open.

-- Done.
