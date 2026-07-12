
CREATE OR REPLACE FUNCTION public.owner_email() RETURNS text
LANGUAGE sql IMMUTABLE AS $$ SELECT 'areebanasir415@gmail.com'::text $$;

CREATE OR REPLACE FUNCTION public.enforce_admin_owner_email()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE u_email text;
BEGIN
  IF NEW.role = 'admin' THEN
    SELECT email INTO u_email FROM auth.users WHERE id = NEW.user_id;
    IF lower(coalesce(u_email,'')) <> lower(public.owner_email()) THEN
      RAISE EXCEPTION 'Only % may hold the admin role', public.owner_email();
    END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS enforce_admin_owner_email_trg ON public.user_roles;
CREATE TRIGGER enforce_admin_owner_email_trg
BEFORE INSERT OR UPDATE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.enforce_admin_owner_email();

CREATE OR REPLACE FUNCTION public.grant_owner_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(coalesce(NEW.email,'')) = lower(public.owner_email()) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS grant_owner_admin_on_create ON auth.users;
CREATE TRIGGER grant_owner_admin_on_create
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.grant_owner_admin();

DROP TRIGGER IF EXISTS grant_owner_admin_on_confirm ON auth.users;
CREATE TRIGGER grant_owner_admin_on_confirm
AFTER UPDATE OF email_confirmed_at ON auth.users FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.grant_owner_admin();

DELETE FROM public.user_roles WHERE role = 'admin' AND user_id NOT IN
  (SELECT id FROM auth.users WHERE lower(email) = lower(public.owner_email()));
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) = lower(public.owner_email())
ON CONFLICT (user_id, role) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.admin_change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  new_email text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_change_requests TO service_role;
ALTER TABLE public.admin_change_requests ENABLE ROW LEVEL SECURITY;
