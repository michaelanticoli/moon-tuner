-- Attach the existing handle_new_user() function to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for any existing users that don't have one
INSERT INTO public.profiles (user_id, email)
SELECT u.id, COALESCE(u.email, '')
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.id IS NULL
  AND u.email IS NOT NULL;