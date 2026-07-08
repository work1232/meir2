import { useLang } from "@/i18n/LanguageProvider";

export function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="relative border-y border-black/5 bg-white/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-background to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-background to-transparent rtl:bg-gradient-to-r" />
      <div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-lg font-medium text-foreground/70">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
