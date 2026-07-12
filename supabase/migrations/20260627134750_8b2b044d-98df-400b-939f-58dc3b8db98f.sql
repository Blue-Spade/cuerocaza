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
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

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

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  subtotal_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'AED',
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  shipping_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

INSERT INTO public.products (name, description, category, price_cents, currency, image_url, sort_order, featured) VALUES
('Unisex Wallet — Edition 01', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-1.jpeg', 1001, true),
('Unisex Wallet — Edition 02', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-2.jpeg', 1002, true),
('Unisex Wallet — Edition 03', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-3.jpeg', 1003, false),
('Unisex Wallet — Edition 04', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-4.jpeg', 1004, false),
('Unisex Wallet — Edition 05', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-5.jpeg', 1005, false),
('Unisex Wallet — Edition 06', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-6.jpeg', 1006, false),
('Unisex Wallet — Edition 07', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-7.jpeg', 1007, false),
('Unisex Wallet — Edition 08', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-8.jpeg', 1008, false),
('Unisex Wallet — Edition 09', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-9.jpeg', 1009, false),
('Unisex Wallet — Edition 10', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-10.jpeg', 1010, false),
('Unisex Wallet — Edition 11', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-11.jpeg', 1011, false),
('Unisex Wallet — Edition 12', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-12.jpeg', 1012, false),
('Unisex Wallet — Edition 13', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-13.jpeg', 1013, false),
('Unisex Wallet — Edition 14', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-14.jpeg', 1014, false),
('Unisex Wallet — Edition 15', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-15.jpeg', 1015, false),
('Unisex Wallet — Edition 16', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-16.jpeg', 1016, false),
('Unisex Wallet — Edition 17', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-17.jpeg', 1017, false),
('Unisex Wallet — Edition 18', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-18.jpeg', 1018, false),
('Unisex Wallet — Edition 19', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-19.jpeg', 1019, false),
('Unisex Wallet — Edition 20', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-20.jpeg', 1020, false),
('Unisex Wallet — Edition 21', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-21.jpeg', 1021, false),
('Unisex Wallet — Edition 22', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-22.jpeg', 1022, false),
('Unisex Wallet — Edition 23', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-23.jpeg', 1023, false),
('Unisex Wallet — Edition 24', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-24.jpeg', 1024, false),
('Unisex Wallet — Edition 25', 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.', 'unisex-wallets', 14900, 'AED', '/products/wallets/wallet-25.jpeg', 1025, false),
('Unisex Card Holder — Edition 01', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-1.jpeg', 2001, true),
('Unisex Card Holder — Edition 02', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-10.jpeg', 2002, true),
('Unisex Card Holder — Edition 03', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-11.png', 2003, false),
('Unisex Card Holder — Edition 04', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-2.jpeg', 2004, false),
('Unisex Card Holder — Edition 05', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-3.jpeg', 2005, false),
('Unisex Card Holder — Edition 06', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-4.jpeg', 2006, false),
('Unisex Card Holder — Edition 07', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-5.jpeg', 2007, false),
('Unisex Card Holder — Edition 08', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-6.jpeg', 2008, false),
('Unisex Card Holder — Edition 09', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-7.jpeg', 2009, false),
('Unisex Card Holder — Edition 10', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-8.jpeg', 2010, false),
('Unisex Card Holder — Edition 11', 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.', 'unisex-card-holders', 7900, 'AED', '/products/card-holders/card-holder-9.jpeg', 2011, false);