CREATE TABLE public.gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  title text,
  caption text,
  taken_on date,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_photos TO authenticated;
GRANT ALL ON public.gallery_photos TO service_role;

ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery photos public" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery photos" ON public.gallery_photos FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER gallery_photos_touch BEFORE UPDATE ON public.gallery_photos
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE POLICY "Gallery files readable" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Admins upload gallery files" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update gallery files" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete gallery files" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));