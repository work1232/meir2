import { siteConfig } from "@/config";

/**
 * Open WhatsApp (app on mobile / web on desktop) with a pre-filled message to
 * the site owner's number. Uses a synthesized anchor click so it isn't caught
 * by popup blockers.
 */
export function openWhatsApp(message: string) {
  // International number WITH the leading "+", e.g. +972543821419.
  const phone = "+" + siteConfig.whatsapp.replace(/\D/g, "");
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  // Navigate the current tab straight to wa.me. This is the ONLY method that
  // reliably opens WhatsApp on iOS Safari — window.open()/anchor _blank clicks
  // are blocked there. wa.me opens the app on mobile / WhatsApp Web on desktop.
  window.location.href = url;
}

/** Fill {name} / {plan} / {price} placeholders in a message template. */
export function fillTemplate(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}
