ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS matric_stream TEXT,
  ADD COLUMN IF NOT EXISTS roll_number TEXT;