-- ============================================================
-- Storage Policy Fix — CMS Supabase Project
-- Run in: https://jabzmmmjafuqynjyhkrv.supabase.co → SQL Editor
--
-- Problem: cms-images bucket has no INSERT/UPDATE/DELETE policy
--          so anon key uploads fail with "row-level security violation"
-- ============================================================

-- Allow anyone to upload files into cms-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anon to upload (INSERT)
CREATE POLICY "Allow public uploads to cms-images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'cms-images');

-- Allow anon to update/upsert (needed for upsert:true)
CREATE POLICY "Allow public updates to cms-images"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'cms-images');

-- Allow anon to read (SELECT) — may already exist, safe to re-run
CREATE POLICY "Allow public reads from cms-images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'cms-images');

-- ============================================================
-- VERIFY: after running, check active policies:
--   SELECT policyname, roles, cmd
--   FROM pg_policies
--   WHERE tablename = 'objects' AND schemaname = 'storage';
-- ============================================================
