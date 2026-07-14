-- Update owner_email function to return the original admin/owner email address
CREATE OR REPLACE FUNCTION public.owner_email() RETURNS text
LANGUAGE sql IMMUTABLE AS $$ SELECT 'areebanasir415@gmail.com'::text $$;

-- Revoke previous admin roles that don't match the reverted owner email
DELETE FROM public.user_roles WHERE role = 'admin' AND user_id NOT IN
  (SELECT id FROM auth.users WHERE lower(email) = lower(public.owner_email()));

-- Grant admin role to the owner email if the user already exists in auth.users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) = lower(public.owner_email())
ON CONFLICT (user_id, role) DO NOTHING;
