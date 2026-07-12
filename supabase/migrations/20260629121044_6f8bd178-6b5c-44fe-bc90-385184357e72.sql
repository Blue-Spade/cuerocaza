
ALTER TABLE public.product_reviews ALTER COLUMN approved SET DEFAULT false;

DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.product_reviews;

CREATE POLICY "Anyone can submit reviews"
  ON public.product_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    approved = false
    AND rating BETWEEN 1 AND 5
    AND length(btrim(name)) BETWEEN 1 AND 80
    AND length(btrim(comment)) BETWEEN 1 AND 2000
  );
