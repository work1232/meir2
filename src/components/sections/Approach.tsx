import { Lightbulb, ClipboardList, ShieldCheck, Hourglass } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { useLang } from "@/i18n/LanguageProvider";

const ICONS = [Lightbulb, ClipboardList, ShieldCheck, Hourglass];

/**
 * "My approach" — 4 icon columns (reference: NEXARCH "Our Approach" band),
 * adapted to the site's monochrome palette with 3D tilt cards.
 */
export function Approach() {
  const { t } = useLang();

  return (
    <section id="approach" className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {t.approach.kicker}
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t.approach.title}
          </h2>
          {/* short underline, like the reference */}
          <span className="mx-auto mt-6 block h-0.5 w-16 rounded-full bg-gradient-to-r from-white to-neutral-600" />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.approach.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <TiltCard
                  max={8}
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/5 text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
