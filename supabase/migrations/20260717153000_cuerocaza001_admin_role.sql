-- Grant admin role immediately if the user already exists in auth.users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) = 'cuerocaza001@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create trigger function to automatically grant admin role to cuerocaza001@gmail.com upon creation
CREATE OR REPLACE FUNCTION public.auto_grant_admin_role()
RETURNS trigger AS $$
BEGIN
  IF lower(NEW.email) = 'cuerocaza001@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS tr_auto_grant_admin_role ON auth.users;

-- Create trigger on auth.users table
CREATE TRIGGER tr_auto_grant_admin_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_grant_admin_role();
