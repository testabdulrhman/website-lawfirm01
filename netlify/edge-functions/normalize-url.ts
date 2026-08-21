/**
 * Keep one canonical URL shape for pages by collapsing repeated slashes and
 * removing trailing slashes.
 *
 * Netlify's redirect engine treats slash and non-slash paths as equivalent,
 * which can create loops with forced wildcard rules. Edge Functions receive
 * the original request pathname, so they can safely normalize both cases.
 */
export default async function handler(
  request: Request,
  context: { next: () => Promise<Response> },
) {
  const url = new URL(request.url);
  const normalizedPath =
    url.pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";

  if (normalizedPath !== url.pathname) {
    url.pathname = normalizedPath;
    return Response.redirect(url, 301);
  }

  return context.next();
}

export const config = { path: "/*" };
