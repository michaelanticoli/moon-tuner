REVOKE EXECUTE ON FUNCTION public.ensure_user_profile() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.ensure_user_profile() FROM anon;
GRANT EXECUTE ON FUNCTION public.ensure_user_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_user_profile() TO service_role;