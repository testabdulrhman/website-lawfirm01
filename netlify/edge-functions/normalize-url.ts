/**
 * Keep one canonical URL shape for pages.
 *
 * Netlify's redirect engine treats slash and non-slash paths as equivalent,
 * which can create loops with forced wildcard rules. Edge Functions receive
 * the original request pathname, so they can safely remove trailing slashes.
 */
export default async function handler(
  request: Request,
  context: { next: () => Promise<Response> },
) {
  const url = new URL(request.url);

  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    return Response.redirect(url, 301);
  }

  return context.next();
}

export const config = { path: "/*" };
