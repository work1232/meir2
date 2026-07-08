import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { openWhatsApp } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Large CTA band — deep espresso panel with a caramel glow, big heading
 * and two actions (WhatsApp + portfolio), before the contact section.
 */
export function CtaBand() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <section aria-label="cta" className="relative py-10 sm:py-14">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0D1626] px-6 py-16 text-center shadow-2xl shadow-[#0D1626]/40 sm:px-12 sm:py-20">
            {/* caramel glows */}
            <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#2968DB]/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#C9D4E4]/20 blur-[100px]" />

            <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-bold text-white sm:text-5xl">
              {t.ctaBand.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-[#C9D4E4]/85 sm:text-lg">
              {t.ctaBand.subtitle}
            </p>

            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <GlassButton
                  className="glass-primary"
                  size="lg"
                  onClick={() => openWhatsApp(t.ctaBand.waText)}
                  contentClassName="flex items-center gap-2"
                >
                  {t.ctaBand.primary}
                  <MessageCircle className="h-5 w-5" />
                </GlassButton>
              </Magnetic>
              <Magnetic>
                <a href="#work">
                  <GlassButton size="lg" contentClassName="flex items-center gap-2">
                    {t.ctaBand.secondary}
                    <Arrow className="h-5 w-5" />
                  </GlassButton>
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
