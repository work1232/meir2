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
    <footer className="border-t border-[#0D1626] bg-[#0D1626]">
      <div className="container-x py-12">
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-start lg:grid-cols-4">
          {/* Brand + socials */}
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#C9D4E4] to-[#2968DB] font-display text-lg font-bold text-[#0D1626]">
                {siteConfig.brand.replace(/[^A-Za-z]/g, "").slice(-1) || "M"}
              </span>
              <span className="font-display text-lg font-bold text-white">
                {siteConfig.brand}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
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
                  className="lift-3d grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-[#C9D4E4]/50 hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C9D4E4]">
              {t.footer.quickTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C9D4E4]">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.about.services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C9D4E4]">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {contacts.map((c) => (
                <li key={c.value}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-center gap-2.5 text-sm text-white/55 transition-colors hover:text-white sm:justify-start"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-primary/40">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span dir={c.dir}>{c.value}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-center justify-center gap-2.5 text-sm text-white/55 sm:justify-start">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                  <Clock className="h-4 w-4" />
                </span>
                <span>{t.footer.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
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
