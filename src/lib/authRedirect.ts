const DEFAULT_AUTH_REDIRECT_PATH = "/dashboard";

const isSafeRedirectPath = (value: string) =>
  value.startsWith("/") && !value.startsWith("//");

export const sanitizeRedirectPath = (
  value?: string | null,
  fallback = DEFAULT_AUTH_REDIRECT_PATH
) => {
  if (!value) return fallback;
  return isSafeRedirectPath(value) ? value : fallback;
};

export const getRedirectPathFromLocationState = (state: unknown) => {
  if (!state || typeof state !== "object" || !("from" in state)) return null;

  const from = (state as {
    from?: { pathname?: unknown; search?: unknown; hash?: unknown };
  }).from;

  if (!from || typeof from !== "object") return null;

  const pathname = typeof from.pathname === "string" ? from.pathname : "";
  const search = typeof from.search === "string" ? from.search : "";
  const hash = typeof from.hash === "string" ? from.hash : "";
  const combined = `${pathname}${search}${hash}`;

  if (!combined || !isSafeRedirectPath(combined)) return null;

  return combined;
};

const getPublicSiteUrl = () => {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();

  if (configuredSiteUrl) {
    try {
      return new URL(configuredSiteUrl).href.replace(/\/$/, "");
    } catch {
      console.warn("Ignoring invalid VITE_SITE_URL for auth redirects.", {
        value: configuredSiteUrl,
      });
    }
  }

  return window.location.origin;
};

export const buildAuthCallbackUrl = (
  redirectPath = DEFAULT_AUTH_REDIRECT_PATH
) => {
  const callbackUrl = new URL("/auth/callback", getPublicSiteUrl());
  callbackUrl.searchParams.set("next", sanitizeRedirectPath(redirectPath));
  return callbackUrl.toString();
};

export { DEFAULT_AUTH_REDIRECT_PATH };
