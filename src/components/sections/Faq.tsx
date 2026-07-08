import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * FAQ accordion — smooth open/close via the CSS grid-rows trick
 * (0fr → 1fr animates height without JS measurements).
 */
export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-14 sm:py-16">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {t.faq.kicker}
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t.faq.title}
          </h2>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl items-start gap-3 lg:grid-cols-2">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                    isOpen ? "border-primary/40 shadow-lg shadow-[#2968DB]/10" : "border-black/5"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className="font-bold">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
