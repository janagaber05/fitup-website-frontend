import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import en from "./translations/en.json";
import ar from "./translations/ar.json";
import enPages from "./translations/pages.en.json";
import arPages from "./translations/pages.ar.json";

const STORAGE_KEY = "fitup-locale";

const messages = {
  en: { ...en, ...enPages },
  ar: { ...ar, ...arPages },
};

const fallbackEn = { ...en, ...enPages };

function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") return saved;
    } catch {
      /* ignore */
    }
    return "en";
  });

  const setLocale = useCallback((next) => {
    if (next !== "en" && next !== "ar") return;
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const table = messages[locale] || messages.en;

  const t = useCallback(
    (key, vars) => {
      let v = getNested(table, key);
      if (v == null || typeof v !== "string") {
        v = getNested(fallbackEn, key);
      }
      if (v == null || typeof v !== "string") return key;
      if (vars && typeof vars === "object") {
        return Object.keys(vars).reduce(
          (s, k) => s.split(`{${k}}`).join(String(vars[k])),
          v
        );
      }
      return v;
    },
    [table]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
