import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import navBrandImage from "../assets/logo/Asset 10 1.png";
import "./FitupNav.css";

const NAV_LINKS = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
  { to: "/security", key: "nav.security" },
  { to: "/join-us", key: "nav.joinUs" },
  { to: "/how-it-works", key: "nav.howItWorks" },
  { to: "/platform", key: "nav.platform" },
  { to: "/for-gyms", key: "nav.forGyms" },
  { to: "/app-experience", key: "nav.appExperience" },
];

function FitupNav() {
  const { locale, setLocale, t } = useI18n();
  const location = useLocation();
  const drawerId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const isNavActive = (to) =>
    to === "/"
      ? location.pathname === "/" || location.pathname === "/landing"
      : location.pathname === to;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fitup-nav fitup-wrap" dir="ltr">
        <div className="fitup-nav-left">
          <Link to="/" className="fitup-nav-brand" aria-label={t("nav.homeAria")}>
            <img src={navBrandImage} alt="" className="fitup-nav-brand-img" width={160} height={44} />
          </Link>
          <Link to="/profile" className="fitup-nav-profile" aria-label={t("nav.account")}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 20v-1.2c0-2.8 2.2-5 5-5h2c2.8 0 5 2.2 5 5V20" />
            </svg>
          </Link>
        </div>

        <nav className="fitup-links" aria-label="Primary">
          {NAV_LINKS.map(({ to, key }) => (
            <Link key={to} to={to} className={isNavActive(to) ? "is-active" : ""}>
              {t(key)}
            </Link>
          ))}
        </nav>

        <span className="fitup-nav-spacer" aria-hidden="true" />

        <div className="fitup-nav-lang" role="group" aria-label="Language">
          <button
            type="button"
            className={`fitup-nav-lang-btn${locale === "en" ? " is-active" : ""}`}
            onClick={() => setLocale("en")}
            lang="en"
          >
            {t("nav.langEn")}
          </button>
          <button
            type="button"
            className={`fitup-nav-lang-btn${locale === "ar" ? " is-active" : ""}`}
            onClick={() => setLocale("ar")}
            lang="ar"
          >
            {t("nav.langAr")}
          </button>
        </div>

        <div className="fitup-nav-right">
          <Link to="/partner" className="fitup-btn fitup-btn-small">
            {t("nav.partnerCta")}
          </Link>
        </div>

        <button
          type="button"
          className="fitup-nav-burger"
          aria-expanded={menuOpen}
          aria-controls={drawerId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="fitup-nav-burger-label">{menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}</span>
          <span className="fitup-nav-burger-icon" aria-hidden="true">
            <span className={`fitup-nav-burger-line${menuOpen ? " is-open" : ""}`} />
            <span className={`fitup-nav-burger-line${menuOpen ? " is-open" : ""}`} />
            <span className={`fitup-nav-burger-line${menuOpen ? " is-open" : ""}`} />
          </span>
        </button>
      </header>

      <div
        className={`fitup-nav-backdrop${menuOpen ? " is-visible" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <aside
        id={drawerId}
        className={`fitup-nav-drawer${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        aria-label={t("nav.menuTitle")}
      >
        <div className="fitup-nav-drawer-top">
          <span className="fitup-nav-drawer-title">{t("nav.menuTitle")}</span>
          <button type="button" className="fitup-nav-drawer-close" onClick={closeMenu} aria-label={t("nav.menuClose")}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="fitup-nav-drawer-links" aria-label="Primary">
          {NAV_LINKS.map(({ to, key }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={isNavActive(to) ? "is-active" : ""}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="fitup-nav-drawer-footer">
          <div className="fitup-nav-drawer-lang" role="group" aria-label="Language">
            <button
              type="button"
              className={`fitup-nav-lang-btn${locale === "en" ? " is-active" : ""}`}
              onClick={() => setLocale("en")}
              lang="en"
            >
              {t("nav.langEn")}
            </button>
            <button
              type="button"
              className={`fitup-nav-lang-btn${locale === "ar" ? " is-active" : ""}`}
              onClick={() => setLocale("ar")}
              lang="ar"
            >
              {t("nav.langAr")}
            </button>
          </div>
          <Link to="/partner" className="fitup-btn fitup-nav-drawer-partner" onClick={closeMenu}>
            {t("nav.partnerCta")}
          </Link>
        </div>
      </aside>
    </>
  );
}

export default FitupNav;
