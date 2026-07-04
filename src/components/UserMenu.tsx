import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Mail, Phone, User } from "lucide-react";
import { useAuth } from "@/auth/AuthProvider";
import { useLang } from "@/i18n/LanguageProvider";

export function UserMenu() {
  const { user, openAuth, signOut } = useAuth();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prevUserRef = useRef(user);

  // Right after a successful login, open the profile panel for a moment so
  // the user clearly sees they're signed in and where their details live.
  useEffect(() => {
    const wasLoggedOut = !prevUserRef.current;
    prevUserRef.current = user;
    if (wasLoggedOut && user) {
      setOpen(true);
      const timer = setTimeout(() => setOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (!open) return;
    // pointerdown covers both mouse and touch (mousedown is unreliable on iOS).
    const onDown = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  if (!user) {
    return (
      <button
        onClick={() => openAuth(undefined, "signin")}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{t.auth.signIn}</span>
      </button>
    );
  }

  const initials =
    user.name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.auth.account}
        className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-[#5b3df5] text-sm font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      >
        {initials}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel absolute end-0 top-12 z-50 w-64 overflow-hidden rounded-2xl p-2"
          >
            <div className="px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t.auth.myProfile}
              </p>
              <p className="mt-2 flex items-center gap-2 font-bold text-foreground">
                <User className="h-4 w-4 text-muted-foreground" />
                {user.name}
              </p>
              <p className="mt-1.5 flex items-center gap-2 truncate text-sm text-muted-foreground" dir="ltr">
                <Mail className="h-4 w-4 shrink-0" />
                {user.email}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground" dir="ltr">
                <Phone className="h-4 w-4 shrink-0" />
                {user.phone}
              </p>
            </div>
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-xl border-t border-white/10 px-3 py-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              {t.auth.logout}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
