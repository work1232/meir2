import { Lock } from "lucide-react";
import {
  PricingCard,
  ShaderCanvas,
  type PricingCardProps,
} from "@/components/ui/animated-glassy-pricing";
import { useLang } from "@/i18n/LanguageProvider";
import { useAuth, type Account } from "@/auth/AuthProvider";
import { openWhatsApp, fillTemplate } from "@/lib/whatsapp";

export function Pricing() {
  const { t } = useLang();
  const { user, openAuth } = useAuth();

  // Build the WhatsApp message for a chosen plan and open it.
  const sendPlan = (planName: string, price: string, name: string) => {
    const message = fillTemplate(t.pricing.waTemplate, {
      name,
      plan: planName,
      price,
    });
    openWhatsApp(message);
  };

  // Package buttons only work when signed in: if not, open the auth modal and
  // continue to WhatsApp automatically once the user is authenticated.
  const handleSelect = (planName: string, price: string) => {
    if (user) {
      sendPlan(planName, price, user.name);
    } else {
      openAuth((account: Account) => sendPlan(planName, price, account.name), "signup");
    }
  };

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
    onSelect: () => handleSelect(p.name, p.price),
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

          {!user && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-foreground/80">
              <Lock className="h-3.5 w-3.5 text-cyan-300" />
              {t.pricing.loginToChoose}
            </p>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 items-stretch justify-center gap-2 sm:gap-3 md:mt-14 md:flex md:flex-row md:gap-6">
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
