import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Lock } from "lucide-react";
import {
  PricingCard,
  ShaderCanvas,
  type PricingCardProps,
} from "@/components/ui/animated-glassy-pricing";
import { useLang } from "@/i18n/LanguageProvider";
import { useAuth, type Account } from "@/auth/AuthProvider";
import { openWhatsApp, fillTemplate } from "@/lib/whatsapp";
import { useIsMobile } from "@/hooks/useIsMobile";
import { TiltCard } from "@/components/TiltCard";

/**
 * "Monolith rise": the side plans trail slightly behind the featured middle
 * one while scrolling in, giving the columns depth. Desktop-only (plain div
 * on mobile / reduced motion).
 */
function MonolithRise({
  lag,
  children,
}: {
  lag: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 60%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [lag, 0]);

  // ref stays attached on the fallback too, so useScroll always has a target.
  if (isMobile || reduceMotion)
    return (
      <div ref={ref} className="h-full">
        {children}
      </div>
    );
  return (
    <motion.div ref={ref} style={{ y }} className="h-full will-change-transform">
      {children}
    </motion.div>
  );
}

export function Pricing() {
  const { t } = useLang();
  const { user, openAuth } = useAuth();
  const isMobile = useIsMobile();

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
      openAuth((account: Account) => sendPlan(planName, price, account.name));
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
      {/* Animated WebGL background — desktop only. On mobile we skip it so iOS
          Safari's single WebGL context stays free for the Spline 3D robot, and
          use a light CSS glow instead. */}
      {isMobile ? (
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(235,235,245,0.16),transparent_70%)]" />
      ) : (
        <ShaderCanvas />
      )}

      {/* Blend the section edges into the page background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-semibold text-neutral-200">
            {t.pricing.kicker}
          </span>
          <h2 className="mt-5 bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text font-display text-4xl font-extralight tracking-tight text-transparent md:text-6xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-lg text-foreground/80">{t.pricing.desc}</p>

          {!user && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-foreground/80">
              <Lock className="h-3.5 w-3.5 text-neutral-300" />
              {t.pricing.loginToChoose}
            </p>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 items-stretch justify-center gap-2 sm:gap-3 md:mt-14 md:flex md:flex-row md:gap-6">
          {plans.map((plan, i) => (
            <MonolithRise key={plan.planName} lag={plan.isPopular ? 0 : 64 + i * 8}>
              <TiltCard max={7} scale={1.03} glare={false} className="h-full">
                <PricingCard {...plan} />
              </TiltCard>
            </MonolithRise>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-foreground/70">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
