
-- Stock + payment method
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock integer NOT NULL DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'cod';

-- Product reviews
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 80),
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL CHECK (length(btrim(comment)) BETWEEN 1 AND 2000),
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.product_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_reviews TO authenticated;
GRANT ALL ON public.product_reviews TO service_role;

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved reviews"
  ON public.product_reviews FOR SELECT
  USING (approved = true);

CREATE POLICY "Anyone can submit reviews"
  ON public.product_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins manage all reviews"
  ON public.product_reviews FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS product_reviews_product_id_idx ON public.product_reviews(product_id);

-- Stock defaults: wallets/card holders = 3, belts = 6
UPDATE public.products SET stock = 3 WHERE category IN ('unisex-wallets','unisex-card-holders') AND stock = 0;

-- Belts category
INSERT INTO public.products (name, description, category, price_cents, currency, image_url, sort_order, featured, stock) VALUES
  ('Dark Brown Casual Men''s Leather Belt', 'Hand-finished dark brown leather with patterned antique buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/14d3c68f-ab2f-4f8e-9e3d-ebaae5bff5ea/belt-1-dark-brown.png', 700, false, 6),
  ('Tan Casual Men''s Leather Belt', 'Soft tan full-grain leather with brushed steel pin buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/e2417682-475c-48b3-9ce8-87013062930f/belt-2-tan.png', 701, false, 6),
  ('Light Brown Casual Men''s Leather Belt', 'Light brown smooth leather with crosshatched steel buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/af40f7ee-8a33-4564-83af-779bdb907153/belt-3-light-brown.png', 702, false, 6),
  ('Light Brown Casual Men''s Leather Belt', 'Light brown leather with twin-rivet keeper and polished pin buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/b5ad0d3c-3283-46bd-bad9-1701546aaa37/belt-4-light-brown.png', 703, false, 6),
  ('Dark Brown Casual Men''s Leather Belt', 'Diamond-embossed dark brown leather with antique buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/707e5d78-83dc-4d84-9529-b647d9d5126e/belt-5-dark-brown.png', 704, false, 6),
  ('Light Brown Casual Men''s Leather Belt', 'Perforated detail in tan leather with copper-tone buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/48bf56e7-8eb9-4762-b1d0-0c89d4d2df6a/belt-6-light-brown.png', 705, false, 6);
