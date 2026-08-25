ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS alumni_id text;

CREATE SEQUENCE IF NOT EXISTS public.alumni_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION public.assign_alumni_id()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.alumni_id IS NULL OR btrim(NEW.alumni_id) = '' THEN
    NEW.alumni_id := 'UMBRELLA-' || lpad(nextval('public.alumni_id_seq')::text, 3, '0');
  END IF;
  RETURN NEW;
END;
$$;

-- Backfill existing rows in join order
WITH ordered AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) AS rn
  FROM public.profiles
  WHERE alumni_id IS NULL
)
UPDATE public.profiles p
SET alumni_id = 'UMBRELLA-' || lpad(o.rn::text, 3, '0')
FROM ordered o
WHERE p.id = o.id;

SELECT setval('public.alumni_id_seq', GREATEST((SELECT count(*) FROM public.profiles), 1), true);

CREATE UNIQUE INDEX IF NOT EXISTS profiles_alumni_id_key ON public.profiles (alumni_id);

DROP TRIGGER IF EXISTS profiles_assign_alumni_id ON public.profiles;
CREATE TRIGGER profiles_assign_alumni_id
BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.assign_alumni_id();