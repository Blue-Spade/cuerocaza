-- Update owner_email function to return the new admin/owner email address (cuerocaza001@gmail.com)
CREATE OR REPLACE FUNCTION public.owner_email() RETURNS text
LANGUAGE sql IMMUTABLE AS $$ SELECT 'cuerocaza001@gmail.com'::text $$;

-- Revoke previous admin roles that don't match the new owner email
DELETE FROM public.user_roles WHERE role = 'admin' AND user_id NOT IN
  (SELECT id FROM auth.users WHERE lower(email) = lower(public.owner_email()));

-- Grant admin role to the new owner email if the user already exists in auth.users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) = lower(public.owner_email())
ON CONFLICT (user_id, role) DO NOTHING;
