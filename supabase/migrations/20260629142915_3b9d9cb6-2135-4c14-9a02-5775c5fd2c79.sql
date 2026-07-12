
CREATE OR REPLACE FUNCTION public.rotate_owner_email(_new_email text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE new_user_id uuid;
BEGIN
  EXECUTE format(
    'CREATE OR REPLACE FUNCTION public.owner_email() RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT %L::text $f$;',
    lower(_new_email)
  );
  DELETE FROM public.user_roles WHERE role = 'admin';
  SELECT id INTO new_user_id FROM auth.users WHERE lower(email) = lower(_new_email) LIMIT 1;
  IF new_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (new_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;
REVOKE ALL ON FUNCTION public.rotate_owner_email(text) FROM public, anon, authenticated;
