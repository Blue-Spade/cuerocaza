
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

CREATE POLICY "Admins can insert user roles" ON public.user_roles
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update user roles" ON public.user_roles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete user roles" ON public.user_roles
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'wallet',
  price_cents INTEGER,
  currency TEXT NOT NULL DEFAULT 'AED',
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  stock INTEGER NOT NULL DEFAULT 0,
  offer_price_cents INTEGER,
  offer_starts_at TIMESTAMPTZ,
  offer_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT products_offer_window_chk CHECK (
    offer_ends_at IS NULL OR offer_starts_at IS NULL OR offer_ends_at > offer_starts_at
  )
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Inquiries
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 200
    AND length(btrim(email)) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 1 AND 5000
    AND (phone IS NULL OR length(phone) <= 50)
  );
CREATE POLICY "Admins can read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  subtotal_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'AED',
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  shipping_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT NOT NULL DEFAULT 'cod',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT INSERT ON public.orders TO anon;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anonymous users can place guest orders" ON public.orders FOR INSERT TO anon WITH CHECK (
  user_id IS NULL
  AND length(btrim(contact_name)) BETWEEN 1 AND 200
  AND length(btrim(contact_email)) BETWEEN 3 AND 320
  AND contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(shipping_address)) BETWEEN 1 AND 1000
  AND (contact_phone IS NULL OR length(contact_phone) <= 50)
);

-- Reviews
CREATE TABLE public.product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 80),
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL CHECK (length(btrim(comment)) BETWEEN 1 AND 2000),
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.product_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_reviews TO authenticated;
GRANT ALL ON public.product_reviews TO service_role;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read approved reviews" ON public.product_reviews FOR SELECT USING (approved = true);
CREATE POLICY "Anyone can submit reviews" ON public.product_reviews FOR INSERT TO anon, authenticated WITH CHECK (
  approved = false
  AND rating BETWEEN 1 AND 5
  AND length(btrim(name)) BETWEEN 1 AND 80
  AND length(btrim(comment)) BETWEEN 1 AND 2000
);
CREATE POLICY "Admins manage all reviews" ON public.product_reviews FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE INDEX product_reviews_product_id_idx ON public.product_reviews(product_id);

-- Seed: wallets
INSERT INTO public.products (name, description, category, price_cents, currency, image_url, sort_order, featured, stock) VALUES
('Unisex Wallet — Edition 01', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-1.jpeg', 1001, true, 3),
('Unisex Wallet — Edition 02', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-2.jpeg', 1002, true, 3),
('Unisex Wallet — Edition 03', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-3.jpeg', 1003, false, 3),
('Unisex Wallet — Edition 04', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-4.jpeg', 1004, false, 3),
('Unisex Wallet — Edition 05', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-5.jpeg', 1005, false, 3),
('Unisex Wallet — Edition 06', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-6.jpeg', 1006, false, 3),
('Unisex Wallet — Edition 07', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-7.jpeg', 1007, false, 3),
('Unisex Wallet — Edition 08', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-8.jpeg', 1008, false, 3),
('Unisex Wallet — Edition 09', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-9.jpeg', 1009, false, 3),
('Unisex Wallet — Edition 10', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-10.jpeg', 1010, false, 3),
('Unisex Wallet — Edition 11', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-11.jpeg', 1011, false, 3),
('Unisex Wallet — Edition 12', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-12.jpeg', 1012, false, 3),
('Unisex Wallet — Edition 13', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-13.jpeg', 1013, false, 3),
('Unisex Wallet — Edition 14', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-14.jpeg', 1014, false, 3),
('Unisex Wallet — Edition 15', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-15.jpeg', 1015, false, 3),
('Unisex Wallet — Edition 16', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-16.jpeg', 1016, false, 3),
('Unisex Wallet — Edition 17', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-17.jpeg', 1017, false, 3),
('Unisex Wallet — Edition 18', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-18.jpeg', 1018, false, 3),
('Unisex Wallet — Edition 19', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-19.jpeg', 1019, false, 3),
('Unisex Wallet — Edition 20', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-20.jpeg', 1020, false, 3),
('Unisex Wallet — Edition 21', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-21.jpeg', 1021, false, 3),
('Unisex Wallet — Edition 22', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-22.jpeg', 1022, false, 3),
('Unisex Wallet — Edition 23', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-23.jpeg', 1023, false, 3),
('Unisex Wallet — Edition 24', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-24.jpeg', 1024, false, 3),
('Unisex Wallet — Edition 25', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-25.jpeg', 1025, false, 3),
('Unisex Card Holder — Edition 01', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-1.jpeg', 2001, true, 3),
('Unisex Card Holder — Edition 02', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-10.jpeg', 2002, true, 3),
('Unisex Card Holder — Edition 03', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-11.png', 2003, false, 3),
('Unisex Card Holder — Edition 04', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-2.jpeg', 2004, false, 3),
('Unisex Card Holder — Edition 05', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-3.jpeg', 2005, false, 3),
('Unisex Card Holder — Edition 06', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-4.jpeg', 2006, false, 3),
('Unisex Card Holder — Edition 07', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-5.jpeg', 2007, false, 3),
('Unisex Card Holder — Edition 08', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-6.jpeg', 2008, false, 3),
('Unisex Card Holder — Edition 09', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-7.jpeg', 2009, false, 3),
('Unisex Card Holder — Edition 10', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-8.jpeg', 2010, false, 3),
('Unisex Card Holder — Edition 11', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-9.jpeg', 2011, false, 3),
('Dark Brown Casual Men''s Leather Belt', 'Hand-finished dark brown leather with patterned antique buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/14d3c68f-ab2f-4f8e-9e3d-ebaae5bff5ea/belt-1-dark-brown.png', 700, false, 6),
('Tan Casual Men''s Leather Belt', 'Soft tan full-grain leather with brushed steel pin buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/e2417682-475c-48b3-9ce8-87013062930f/belt-2-tan.png', 701, false, 6),
('Light Brown Casual Men''s Leather Belt', 'Light brown smooth leather with crosshatched steel buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/af40f7ee-8a33-4564-83af-779bdb907153/belt-3-light-brown.png', 702, false, 6),
('Light Brown Casual Men''s Leather Belt', 'Light brown leather with twin-rivet keeper and polished pin buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/b5ad0d3c-3283-46bd-bad9-1701546aaa37/belt-4-light-brown.png', 703, false, 6),
('Dark Brown Casual Men''s Leather Belt', 'Diamond-embossed dark brown leather with antique buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/707e5d78-83dc-4d84-9529-b647d9d5126e/belt-5-dark-brown.png', 704, false, 6),
('Light Brown Casual Men''s Leather Belt', 'Perforated detail in tan leather with copper-tone buckle.', 'mens-belts', 18900, 'AED', '/__l5e/assets-v1/48bf56e7-8eb9-4762-b1d0-0c89d4d2df6a/belt-6-light-brown.png', 705, false, 6);
