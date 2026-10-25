/**
 * Turn a supabase-js `functions.invoke` error into a readable reason.
 *
 * supabase-js only says "Edge Function returned a non-2xx status code". The real
 * reason is in the response body: our functions send `{ error }`, while the
 * Supabase gateway (timeouts, compute limits, bad keys) sends `{ code, message }`.
 * Always include the HTTP status so a failure can be traced from a screenshot.
 */
export async function readInvokeError(error: unknown, fallback = "Service unavailable"): Promise<string> {
  const ctx = (error as { context?: unknown })?.context;
  const baseMessage = (error as Error)?.message || fallback;

  if (ctx instanceof Response) {
    const status = ctx.status;
    let reason: string | undefined;
    try {
      const text = await ctx.clone().text();
      try {
        const body = JSON.parse(text);
        // Our own functions write user-facing text in `error`; show it as is.
        const own = body?.error ?? body?.detail;
        if (own) return typeof own === "string" ? own : JSON.stringify(own);
        const gateway = body?.message ?? body?.msg ?? body?.code;
        if (gateway) reason = String(gateway);
      } catch {
        if (text.trim()) reason = text.trim().slice(0, 200);
      }
    } catch {
      /* body unreadable */
    }
    return `${reason ?? baseMessage} (status ${status})`;
  }

  return baseMessage;
}
