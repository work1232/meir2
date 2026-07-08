import { Check, MessageCircle, ArrowLeft, ArrowRight, CalendarClock } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { openWhatsApp } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Split band straight from the reference layout: a dark "Why choose us?"
 * panel sitting flush next to a light promo/availability panel — full-bleed,
 * edge to edge, two things on screen at once.
 */
export function WhyUs() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <section id="why" className="relative">
      <div className="grid md:grid-cols-2">
        {/* Dark navy half — why choose me */}
        <div className="relative overflow-hidden bg-[#0D1626] px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -top-20 -end-20 h-64 w-64 rounded-full bg-[#2968DB]/20 blur-[90px]" />
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9D4E4]/30 bg-[#C9D4E4]/10 px-3 py-1 text-sm font-semibold text-[#C9D4E4]">
              {t.whyUs.kicker}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              {t.whyUs.title}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/70">
              {t.whyUs.desc}
            </p>
            <ul className="mt-6 grid gap-3">
              {t.whyUs.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5B8CEF] to-[#2458C7] text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-white/90">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Magnetic>
                <a href="#work">
                  <GlassButton contentClassName="flex items-center gap-2">
                    {t.whyUs.cta}
                    <Arrow className="h-5 w-5" />
                  </GlassButton>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Light silver half — availability promo */}
        <div className="relative flex items-center overflow-hidden bg-gradient-to-br from-[#E9EEF6] to-[#C9D4E4]/70 px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-white/60 blur-[80px]" />
          <Reveal className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <CalendarClock className="h-4 w-4" />
              {t.promo.kicker}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#0D1626] sm:text-4xl">
              {t.promo.title}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-[#3A4A66]">
              {t.promo.desc}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <GlassButton
                  className="glass-primary"
                  onClick={() => openWhatsApp(t.promo.waText)}
                  contentClassName="flex items-center gap-2"
                >
                  {t.promo.cta}
                  <MessageCircle className="h-5 w-5" />
                </GlassButton>
              </Magnetic>
              <span className="text-sm text-[#3A4A66]/80">{t.promo.note}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
