import { siteConfig } from "@/config";

/**
 * Open WhatsApp (app on mobile / web on desktop) with a pre-filled message to
 * the site owner's number. Uses a synthesized anchor click so it isn't caught
 * by popup blockers.
 */
/**
 * The owner's number converted to the digits-only international format that
 * wa.me links require (per WhatsApp's docs: no "+", no leading 0, no dashes).
 * "0543821419" → "972543821419".
 */
export function waNumber(): string {
  let digits = siteConfig.whatsapp.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = "972" + digits.slice(1);
  return digits;
}

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${waNumber()}?text=${encodeURIComponent(message)}`;
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
