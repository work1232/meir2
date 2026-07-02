import { Instagram, Linkedin, Dribbble, Heart } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";

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

  return (
    <footer className="border-t border-white/10 bg-white/[0.02]">
      <div className="container-x py-14">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-start">
          <div className="max-w-xs">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#5b3df5] font-display text-lg font-bold text-white">
                {siteConfig.brand.replace(/[^A-Za-z]/g, "").slice(-1) || "M"}
              </span>
              <span className="font-display text-lg font-bold">
                {siteConfig.brand}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-muted-foreground sm:flex-row">
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
