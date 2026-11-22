-- =====================================================================
-- KHOKA TECH — 004 storage for template preview images
-- Public bucket: anyone can view images by URL; only admins can upload,
-- replace or delete. Limited to images up to 2 MB.
-- =====================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('template-previews', 'template-previews', true, 2097152,
        array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create policy "Admins upload template previews"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'template-previews' and public.is_admin());

create policy "Admins replace template previews"
  on storage.objects for update to authenticated
  using (bucket_id = 'template-previews' and public.is_admin())
  with check (bucket_id = 'template-previews' and public.is_admin());

create policy "Admins delete template previews"
  on storage.objects for delete to authenticated
  using (bucket_id = 'template-previews' and public.is_admin());

-- Listing files is admin-only; viewing a file by its public URL needs no policy.
create policy "Admins list template previews"
  on storage.objects for select to authenticated
  using (bucket_id = 'template-previews' and public.is_admin());
