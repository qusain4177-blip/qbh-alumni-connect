CREATE TABLE public.success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_name text NOT NULL,
  batch_year integer,
  degree text,
  institute text,
  category text NOT NULL DEFAULT 'career',
  badge text,
  poster_path text,
  poster_url text,
  snippet text,
  story text,
  gallery_paths text[] NOT NULL DEFAULT '{}',
  congrats_notes text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.success_stories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.success_stories TO authenticated;
GRANT ALL ON public.success_stories TO service_role;

ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published success stories public" ON public.success_stories
FOR SELECT USING (published = true);

CREATE POLICY "Admins manage success stories" ON public.success_stories
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER success_stories_touch BEFORE UPDATE ON public.success_stories
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();