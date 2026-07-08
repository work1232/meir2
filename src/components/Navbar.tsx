import { useEffect, useState } from "react";
import {
  Globe,
  Home,
  Briefcase,
  LayoutGrid,
  Workflow,
  Wallet,
  Mail,
} from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { UserMenu } from "@/components/UserMenu";
import { useLang } from "@/i18n/LanguageProvider";
import { siteConfig, brandInitials } from "@/config";

export function Navbar() {
  const { t, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#top", label: t.nav.cta, Icon: Home },
    { href: "#work", label: t.nav.work, Icon: Briefcase },
    { href: "#services", label: t.nav.services, Icon: LayoutGrid },
    { href: "#process", label: t.nav.process, Icon: Workflow },
    { href: "#pricing", label: t.nav.pricing, Icon: Wallet },
    { href: "#contact", label: t.nav.contact, Icon: Mail },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#2E1E15]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-x relative flex h-16 items-center justify-between md:h-20">
          {/* Brand */}
          <a href="#top" className="group z-10 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#E7C89B] to-[#C58B47] font-display text-sm font-bold text-[#2E1E15] shadow-lg shadow-[#C58B47]/30">
              {brandInitials}
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {siteConfig.brand}
            </span>
          </a>

          {/* Desktop dock (icons) */}
          <div className="pointer-events-none absolute left-1/2 top-[16px] hidden -translate-x-1/2 md:block">
            <div className="pointer-events-auto">
              <Dock
                align="top"
                panelHeight={48}
                magnification={62}
                distance={130}
                className="border border-white/10 bg-[#2E1E15]/85"
              >
                {links.map((l) => (
                  <a key={l.href} href={l.href} aria-label={l.label}>
                    <DockItem className="aspect-square rounded-full border border-white/10 bg-white/10 transition-colors hover:bg-white/[0.18]">
                      <DockLabel className="border-white/10 bg-[#2E1E15]/95">
                        {l.label}
                      </DockLabel>
                      <DockIcon>
                        <l.Icon className="h-full w-full text-white/85" />
                      </DockIcon>
                    </DockItem>
                  </a>
                ))}
              </Dock>
            </div>
          </div>

          {/* Actions */}
          <div className="z-10 flex items-center gap-2 md:gap-3">
            <button
              onClick={toggle}
              aria-label="Switch language"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Globe className="h-4 w-4" />
              {t.langToggle}
            </button>

            <UserMenu />

            <a href="#contact" className="hidden md:block">
              <GlassButton className="glass-primary" size="sm">
                {t.nav.cta}
              </GlassButton>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
