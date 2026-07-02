import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/config";
import { translations, type Content } from "./translations";

type LangContextValue = {
  lang: Lang;
  t: Content;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "studio-m-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "he";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "he" ? saved : "he";
  });

  const t = translations[lang];

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", t.dir);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, t.dir]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((prev) => (prev === "he" ? "en" : "he"));

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
