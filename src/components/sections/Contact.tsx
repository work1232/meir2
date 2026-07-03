import { useRef, useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone, Check } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { useLang } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";
import { openWhatsApp } from "@/lib/whatsapp";

export function Contact() {
  const { t } = useLang();
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const methods = [
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      label: t.contact.callLabel,
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
    },
  ];

  // Open WhatsApp with the pre-filled message. Runs from the button's onClick
  // (a direct user gesture) so it never depends on native form-submit quirks
  // and is never caught by a popup blocker.
  const sendToWhatsApp = () => {
    // Require the fields to be filled (shows the native validation bubble).
    if (formRef.current && !formRef.current.reportValidity()) return;

    const lines = [message, "", `— ${name}`, email].filter(Boolean).join("\n");
    openWhatsApp(lines);

    setSent(true);
  };

  // Also handle the Enter key inside a field.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendToWhatsApp();
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background video — "call 2" */}
      <BackgroundVideo
        src="/call2.mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.75]"
      />
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />
      <div className="pointer-events-none absolute inset-0 halo" />
      <div className="container-x relative z-10">
        <div className="glass-panel overflow-hidden rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Left — info */}
            <div className="relative p-5 sm:p-8 md:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {t.contact.kicker}
              </span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                {t.contact.title}
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
                {t.contact.desc}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 lg:mt-8 lg:grid-cols-1 lg:gap-3">
                {methods.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-primary/40 hover:bg-white/[0.06] lg:gap-4 lg:rounded-2xl lg:p-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-[#5b3df5] text-white lg:h-11 lg:w-11 lg:rounded-xl">
                      <m.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] text-muted-foreground lg:text-xs">
                        {m.label}
                      </span>
                      <span className="block truncate text-xs font-medium text-foreground lg:text-base" dir="ltr">
                        {m.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="border-t border-white/10 bg-black/20 p-5 sm:p-8 md:p-12 lg:border-s lg:border-t-0">
              {sent ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                    <Check className="h-8 w-8" strokeWidth={3} />
                  </span>
                  <p className="mt-6 text-lg font-medium">{t.contact.form.sent}</p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground/90">
                      {t.contact.form.name}
                    </label>
                    <input
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="h-12 w-full rounded-xl border border-white/12 bg-white/5 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
                      placeholder={t.contact.form.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground/90">
                      {t.contact.form.email}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      dir="ltr"
                      className="h-12 w-full rounded-xl border border-white/12 bg-white/5 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground/90">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
                      placeholder={t.contact.form.message}
                    />
                  </div>
                  <GlassButton
                    type="button"
                    onClick={sendToWhatsApp}
                    className="glass-primary mt-1 w-full"
                    size="lg"
                    contentClassName="flex w-full items-center justify-center gap-2"
                  >
                    {t.contact.form.submit}
                    <MessageCircle className="h-5 w-5" />
                  </GlassButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
