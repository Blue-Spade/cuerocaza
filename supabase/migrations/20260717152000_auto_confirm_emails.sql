-- Create a trigger function to automatically confirm all new users' emails in auth.users
CREATE OR REPLACE FUNCTION public.auto_confirm_email()
RETURNS trigger AS $$
BEGIN
  NEW.email_confirmed_at := now();
  NEW.confirmed_at := now(); -- support legacy columns in some supabase versions
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS tr_auto_confirm_email ON auth.users;

-- Create trigger on auth.users table
CREATE TRIGGER tr_auto_confirm_email
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_confirm_email();
