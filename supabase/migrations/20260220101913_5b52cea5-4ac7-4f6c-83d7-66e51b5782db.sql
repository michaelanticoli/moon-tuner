-- Block all direct SELECT access to newsletter_subscribers
-- Data should only be accessed via service role in edge functions
CREATE POLICY "No direct select access to subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (false);