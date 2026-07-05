import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, User, Mail, Phone } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { useAuth } from "@/auth/AuthProvider";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * One-step join modal: name + email + phone → done. No passwords, no
 * sign-in/sign-up modes — a returning email simply signs back in.
 */
export function AuthModal() {
  const { authOpen, closeAuth, join, user } = useAuth();
  const { t } = useLang();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Reset the error when the modal opens; prefill from a known user.
  useEffect(() => {
    if (authOpen) {
      setError("");
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, [authOpen, user]);

  // Close on Escape.
  useEffect(() => {
    if (!authOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuth();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [authOpen, closeAuth]);

  const submit = () => {
    try {
      setError("");
      if (!name.trim() || !email.trim() || !phone.trim()) {
        setError(t.auth.errFields);
        return;
      }
      join({ name, email, phone });
    } catch (err) {
      // Never leave the button silently dead — surface whatever went wrong.
      setError(`${t.auth.errUnknown} ${String(err)}`);
    }
  };

  // Enter key inside a field submits too.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-white/12 bg-white/5 ps-11 pe-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30";

  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeAuth}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel relative z-10 w-full max-w-md overflow-hidden rounded-3xl p-8"
          >
            <button
              onClick={closeAuth}
              aria-label="Close"
              className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#8b8b96] text-neutral-900 shadow-lg shadow-white/20">
              <User className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold">{t.auth.authTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.auth.authSubtitle}
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
              <div className="relative">
                <User className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  className={inputClass}
                  placeholder={t.auth.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="relative">
                <Mail className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  className={inputClass}
                  type="email"
                  placeholder={t.auth.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  dir="ltr"
                />
              </div>

              <div className="relative">
                <Phone className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  className={inputClass}
                  type="tel"
                  placeholder={t.auth.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  dir="ltr"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-medium text-white"
                >
                  {error}
                </p>
              )}

              <GlassButton
                type="button"
                onClick={submit}
                className="glass-primary mt-2 w-full"
                size="lg"
                contentClassName="w-full text-center"
              >
                {t.auth.authSubmit}
              </GlassButton>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
