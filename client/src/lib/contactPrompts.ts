import { stripLangPrefix } from "@/lib/localePath";

/**
 * Pages where the shared sales prompts stay hidden: the navbar's
 * "book a consultation" button and the floating WhatsApp button.
 * - The homepage is the firm's formal front page.
 * - The careers pages speak to job applicants, not clients; a booking button
 *   or a WhatsApp link pre-filled with "I want a legal consultation" would
 *   send applicants into the client channel.
 */
export function hidesContactPrompts(location: string): boolean {
  const path = stripLangPrefix(location.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/");
  return path === "/" || path === "/careers" || path.startsWith("/careers/");
}
