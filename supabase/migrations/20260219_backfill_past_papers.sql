-- One-time backfill into past_papers from legacy tables.
-- Source of truth remains the existing past_papers table.

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public' and table_name = 'papers'
  ) then
    insert into public.past_papers (subject, year, file_url, board, class_level, exam_shift, is_solved)
    select
      coalesce(nullif(trim(p.subject), ''), coalesce(nullif(trim(p.title), ''), 'Unknown Subject')) as subject,
      coalesce(nullif(p.year::text, '')::int, extract(year from now())::int) as year,
      coalesce(p.file_url, p.pdf_url) as file_url,
      coalesce(nullif(trim(p.board), ''), 'Unknown Board') as board,
      coalesce(nullif(trim(p.class_level), ''), 'General') as class_level,
      'morning' as exam_shift,
      false as is_solved
    from public.papers p
    where coalesce(p.file_url, p.pdf_url) is not null
    on conflict do nothing;
  else
    raise notice 'Table public.papers does not exist. Skipping papers backfill.';
  end if;
end $$;

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public' and table_name = 'exams'
  ) then
    raise notice 'Table public.exams exists but has no file_url mapping in current app model. Skipping exams backfill.';
  end if;
end $$;

-- Post-migration verification
select count(*) as total_rows from public.past_papers;
select
  count(*) filter (where subject is null) as null_subject,
  count(*) filter (where year is null) as null_year,
  count(*) filter (where file_url is null) as null_file_url,
  count(*) filter (where board is null) as null_board,
  count(*) filter (where class_level is null) as null_class_level,
  count(*) filter (where exam_shift is null) as null_exam_shift,
  count(*) filter (where is_solved is null) as null_is_solved
from public.past_papers;
