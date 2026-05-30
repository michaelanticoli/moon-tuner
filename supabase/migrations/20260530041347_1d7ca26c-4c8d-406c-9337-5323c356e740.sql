GRANT SELECT ON public.digital_products TO anon, authenticated;
GRANT ALL ON public.digital_products TO service_role;

GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

GRANT SELECT ON public.purchases TO authenticated;
GRANT ALL ON public.purchases TO service_role;

GRANT ALL ON public.gifts TO service_role;

GRANT ALL ON public.report_narrations TO service_role;

GRANT SELECT ON public.natal_reports TO authenticated;
GRANT INSERT, UPDATE ON public.natal_reports TO authenticated;
GRANT ALL ON public.natal_reports TO service_role;