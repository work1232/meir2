import {
  Instagram,
  Linkedin,
  Dribbble,
  Heart,
  Phone,
  Mail,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";
import { waNumber } from "@/lib/whatsapp";

/**
 * Rich 4-column footer (reference: NEXARCH) — brand + socials, quick links,
 * services list, and contact details with hours. Monochrome.
 */
export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
    { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
    { icon: Dribbble, href: siteConfig.socials.behance, label: "Portfolio" },
  ];

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#services", label: t.nav.services },
    { href: "#process", label: t.nav.process },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#contact", label: t.nav.contact },
  ];

  const contacts = [
    {
      icon: Phone,
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
      dir: "ltr" as const,
    },
    {
      icon: Mail,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      dir: "ltr" as const,
    },
    {
      icon: MessageCircle,
      value: "WhatsApp",
      href: `https://wa.me/${waNumber()}`,
      dir: "ltr" as const,
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-white/[0.02]">
      <div className="container-x py-16">
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-start lg:grid-cols-4">
          {/* Brand + socials */}
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-white to-[#8b8b96] font-display text-lg font-bold text-neutral-900">
                {siteConfig.brand.replace(/[^A-Za-z]/g, "").slice(-1) || "M"}
              </span>
              <span className="font-display text-lg font-bold">
                {siteConfig.brand}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 sm:justify-start">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="lift-3d grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
              {t.footer.quickTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.about.services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {contacts.map((c) => (
                <li key={c.value}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:justify-start"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-primary/40">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span dir={c.dir}>{c.value}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-center justify-center gap-2.5 text-sm text-muted-foreground sm:justify-start">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                  <Clock className="h-4 w-4" />
                </span>
                <span>{t.footer.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-muted-foreground sm:flex-row">
          <span>
            © {year} {siteConfig.brand}. {t.footer.rights}
          </span>
          <span className="flex items-center gap-1.5">
            {t.footer.madeWith}
            <Heart className="h-4 w-4 fill-primary text-primary" />
          </span>
        </div>
      </div>
    </footer>
  );
}
