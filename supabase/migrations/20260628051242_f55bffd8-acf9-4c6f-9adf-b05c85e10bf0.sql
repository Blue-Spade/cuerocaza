ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS offer_price_cents integer,
  ADD COLUMN IF NOT EXISTS offer_starts_at timestamptz,
  ADD COLUMN IF NOT EXISTS offer_ends_at timestamptz;

ALTER TABLE public.products
  ADD CONSTRAINT products_offer_window_chk
  CHECK (
    offer_ends_at IS NULL
    OR offer_starts_at IS NULL
    OR offer_ends_at > offer_starts_at
  );