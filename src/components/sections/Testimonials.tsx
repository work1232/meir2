import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Testimonials — three premium white cards with caramel stars and
 * initials avatars, on the cream background.
 */
export function Testimonials() {
  const { t } = useLang();

  return (
    <section id="testimonials" className="relative py-20 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {t.testimonials.kicker}
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t.testimonials.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => {
            const initials = item.name
              .split(/\s+/)
              .map((w) => w[0])
              .join("")
              .slice(0, 2);
            return (
              <Reveal key={item.name} delay={i * 0.1} className="h-full">
                <TiltCard
                  max={7}
                  className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-lg shadow-[#2E1E15]/5"
                >
                  <div className="flex gap-1" aria-label="5/5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-[#C58B47] text-[#C58B47]"
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 leading-relaxed text-foreground/85">
                    “{item.text}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#E7C89B] to-[#C58B47] text-sm font-bold text-[#2E1E15]">
                      {initials}
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {item.role}
                      </span>
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
