import { siteConfig } from "@/config";

/**
 * Open WhatsApp (app on mobile / web on desktop) with a pre-filled message to
 * the site owner's number. Uses a synthesized anchor click so it isn't caught
 * by popup blockers.
 */
export function openWhatsApp(message: string) {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Fill {name} / {plan} / {price} placeholders in a message template. */
export function fillTemplate(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}
