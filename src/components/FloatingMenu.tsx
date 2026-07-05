import { Menu as MenuIcon, X, Home, Briefcase, Wallet, Mail } from "lucide-react";
import { MenuContainer, MenuItem } from "@/components/ui/fluid-menu";
import { useLang } from "@/i18n/LanguageProvider";

export function FloatingMenu() {
  const { t } = useLang();

  const go = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const items = [
    { icon: Home, id: "#top", label: t.nav.cta },
    { icon: Briefcase, id: "#work", label: t.nav.work },
    { icon: Wallet, id: "#pricing", label: t.nav.pricing },
    { icon: Mail, id: "#contact", label: t.nav.contact },
  ];

  return (
    <div className="fixed bottom-6 start-6 z-40">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl" />

      <MenuContainer
        direction="up"
        triggerClassName="bg-gradient-to-br from-white to-[#8b8b96] ring-1 ring-white/40"
      >
        {/* Toggle */}
        <MenuItem
          label="Menu"
          icon={
            <div className="relative h-6 w-6 text-neutral-900">
              <div className="absolute inset-0 origin-center rotate-0 scale-100 opacity-100 transition-all duration-300 ease-in-out [div[data-expanded=true]_&]:rotate-180 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:opacity-0">
                <MenuIcon size={24} strokeWidth={2} />
              </div>
              <div className="absolute inset-0 origin-center -rotate-180 scale-0 opacity-0 transition-all duration-300 ease-in-out [div[data-expanded=true]_&]:rotate-0 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:opacity-100">
                <X size={24} strokeWidth={2} />
              </div>
            </div>
          }
        />

        {items.map((it) => (
          <MenuItem
            key={it.id}
            label={it.label}
            onClick={() => go(it.id)}
            icon={<it.icon size={22} strokeWidth={1.75} className="text-foreground" />}
          />
        ))}
      </MenuContainer>
    </div>
  );
}
