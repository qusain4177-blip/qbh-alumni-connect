-- Migration: insert Zafaryab Haider profile
-- Run this migration with your Supabase migration tool or psql if needed.

INSERT INTO public.profiles (id, full_name, email, graduation_year, country, father_name, date_of_birth, marital_status, city, profession, company, higher_education, avatar_url, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Zafaryab Haider',
  'Zafaryab.s3522@gmail.com',
  2021,
  'Pakistan',
  'Muhammad Ali',
  '2005-11-21'::date,
  'Single',
  'Karachi',
  'Bachelors in Civil Engineering',
  'NED University of Engineering and Technology',
  'Engineering',
  '/images/zafaryab-avatar.svg',
  'approved',
  now(),
  now()
);
