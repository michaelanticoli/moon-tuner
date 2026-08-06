DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can assign roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can remove roles" ON public.user_roles;

REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM authenticated;