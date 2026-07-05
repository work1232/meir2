import { siteConfig } from "@/config";

/**
 * The owner's number converted to the digits-only international format that
 * WhatsApp links require (no "+", no leading 0, no dashes).
 * "0543821419" → "972543821419".
 */
export function waNumber(): string {
  let digits = siteConfig.whatsapp.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = "972" + digits.slice(1);
  return digits;
}

/** Both link forms for the owner's number with a prefilled message. */
export function buildWaLinks(message: string) {
  const phone = waNumber();
  const text = encodeURIComponent(message);
  return {
    /** Opens the WhatsApp APP directly (no browser interstitial page). */
    app: `whatsapp://send?phone=${phone}&text=${text}`,
    /** Web link — api.whatsapp.com directly (wa.me just redirects here, so
     * linking straight to it saves a slow extra hop). */
    web: `https://api.whatsapp.com/send/?phone=${phone}&text=${text}&type=phone_number&app_absent=0`,
  };
}

/** Fill {name} / {plan} / {price} placeholders in a message template. */
export function fillTemplate(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

function isMobileDevice(): boolean {
  const ua = navigator.userAgent;
  // iPadOS 13+ reports itself as "Mac" but has multitouch.
  const iPadOs = /Mac/.test(ua) && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod|Android/i.test(ua) || iPadOs;
}

/**
 * Open WhatsApp with a prefilled message to the owner's number.
 *
 * Mobile: launch the app directly via the whatsapp:// scheme — this skips the
 * wa.me interstitial page that often looks "stuck" on iOS Safari. If the app
 * doesn't take over within ~1.6s (not installed), fall back to wa.me.
 *
 * Desktop: open wa.me in a new tab (a direct user-gesture window.open is not
 * popup-blocked), so the site stays open behind it.
 */
export function openWhatsApp(message: string) {
  const { app, web } = buildWaLinks(message);

  if (isMobileDevice()) {
    const fallbackTimer = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.location.href = web;
      }
    }, 1600);

    const cancelFallback = () => window.clearTimeout(fallbackTimer);
    // If the app opened, the page gets hidden — cancel the fallback.
    window.addEventListener("pagehide", cancelFallback, { once: true });
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "hidden") cancelFallback();
      },
      { once: true }
    );

    window.location.href = app;
    return;
  }

  const win = window.open(web, "_blank");
  if (win) {
    try {
      win.opener = null;
    } catch {
      /* ignore */
    }
  } else {
    // Popup blocked (shouldn't happen on a direct gesture) — navigate.
    window.location.href = web;
  }
}
