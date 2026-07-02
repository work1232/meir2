import {
  PricingCard,
  ShaderCanvas,
  type PricingCardProps,
} from "@/components/ui/animated-glassy-pricing";
import { useLang } from "@/i18n/LanguageProvider";

export function Pricing() {
  const { t } = useLang();

  const plans: PricingCardProps[] = t.pricing.plans.map((p) => ({
    planName: p.name,
    description: p.tagline,
    price: p.price,
    features: p.features,
    buttonText: t.pricing.cta,
    isPopular: !!p.featured,
    buttonVariant: p.featured ? "primary" : "secondary",
    currency: "",
    period: "",
    popularText: t.pricing.popular,
  }));

  return (
    <section id="pricing" className="relative w-full overflow-hidden py-24 sm:py-32">
      {/* Animated WebGL background (scoped to this section) */}
      <ShaderCanvas />

      {/* Blend the section edges into the page background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300">
            {t.pricing.kicker}
          </span>
          <h2 className="mt-5 bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text font-display text-4xl font-extralight tracking-tight text-transparent md:text-6xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-lg text-foreground/80">{t.pricing.desc}</p>
        </div>

        <div className="mx-auto mt-14 flex max-w-4xl flex-col items-stretch justify-center gap-8 md:flex-row md:gap-6">
          {plans.map((plan) => (
            <PricingCard key={plan.planName} {...plan} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-foreground/70">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
