CREATE POLICY "Anonymous users can place guest orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (
  user_id IS NULL
  AND length(btrim(contact_name)) BETWEEN 1 AND 200
  AND length(btrim(contact_email)) BETWEEN 3 AND 320
  AND contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(shipping_address)) BETWEEN 1 AND 1000
  AND (contact_phone IS NULL OR length(contact_phone) <= 50)
);

GRANT INSERT ON public.orders TO anon;