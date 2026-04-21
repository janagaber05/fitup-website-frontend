import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./SecurityPage.css";

const SECURITY_SCROLL_IDS = ["security-lock", "security-payment", "security-privacy", "security-cta"];

function initialSecurityRevealed() {
  const allTrue = {
    "security-hero": true,
    "security-lock": true,
    "security-payment": true,
    "security-privacy": true,
    "security-cta": true,
  };
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return allTrue;
  }
  return {
    "security-hero": true,
    "security-lock": false,
    "security-payment": false,
    "security-privacy": false,
    "security-cta": false,
  };
}

function SecurityIcon({ type }) {
  if (type === "lock") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.5-2.7 7.8-7 10-4.3-2.2-7-5.5-7-10V6z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="1.8" />
      <rect x="3" y="14" width="18" height="6" rx="1.8" />
    </svg>
  );
}

function SecurityPage() {
  const { t } = useI18n();
  const [revealed, setRevealed] = useState(initialSecurityRevealed);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const observers = [];
    for (const id of SECURITY_SCROLL_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const ob = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          setRevealed((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          ob.unobserve(el);
        },
        { threshold: 0.11, rootMargin: "0px 0px -7% 0px" }
      );
      ob.observe(el);
      observers.push(ob);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const vis = (id) => (revealed[id] ? " is-visible" : "");

  const securityCards = useMemo(
    () => [
      { title: t("security.cardSsl"), icon: "lock" },
      { title: t("security.cardTransit"), icon: "shield" },
      { title: t("security.cardCloud"), icon: "server" },
    ],
    [t]
  );

  const paymentCards = useMemo(
    () => [
      {
        title: t("security.payGateway"),
        text: t("security.payGatewayText"),
        icon: "server",
      },
      {
        title: t("security.payNoCard"),
        text: t("security.payNoCardText"),
        icon: "shield",
      },
      {
        title: t("security.payFraud"),
        text: t("security.payFraudText"),
        icon: "shield",
      },
    ],
    [t]
  );

  return (
    <div className="security-page">
      <section id="security-hero" className={`security-hero${vis("security-hero")}`}>
        <div className="security-hero-trust-ring" aria-hidden="true" />
        <span className="security-pill">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 1 1 8 0v3" />
          </svg>
          {t("security.pill")}
        </span>
        <h1>
          {t("security.h1a")}
          <span>{t("security.h1b")}</span>
        </h1>
        <p>{t("security.heroP")}</p>
        <div className="security-badges">
          <span className="security-badge-item">
            <svg className="security-badge-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle className="security-badge-circle" cx="12" cy="12" r="9" pathLength="1" />
              <path className="security-badge-checkpath" d="M8.4 12.3l2.5 2.5 4.8-5" pathLength="1" />
            </svg>
            {t("security.badgeGdpr")}
          </span>
          <span className="security-badge-item">
            <svg className="security-badge-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle className="security-badge-circle" cx="12" cy="12" r="9" pathLength="1" />
              <path className="security-badge-checkpath" d="M8.4 12.3l2.5 2.5 4.8-5" pathLength="1" />
            </svg>
            {t("security.badgeBank")}
          </span>
          <span className="security-badge-item security-badge-link">
            <svg className="security-badge-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle className="security-badge-circle" cx="12" cy="12" r="9" pathLength="1" />
              <path className="security-badge-checkpath" d="M8.4 12.3l2.5 2.5 4.8-5" pathLength="1" />
            </svg>
            {t("security.badgeUptime")}
          </span>
        </div>
      </section>

      <section id="security-lock" className={`security-lock${vis("security-lock")}`}>
        <h2>
          {t("security.lockH2")}
          <span>{t("security.lockH2Span")}</span>
          {t("security.lockH2End")}
        </h2>
        <p>{t("security.lockP")}</p>
        <div className="security-lock-grid">
          {securityCards.map((item) => (
            <article key={item.title} className="security-lock-card">
              <span className="security-lock-icon"><SecurityIcon type={item.icon} /></span>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="security-payment" className={`security-payment${vis("security-payment")}`}>
        <h2>{t("security.payH2")}</h2>
        <p>{t("security.payP")}</p>
        <div className="security-payment-grid">
          {paymentCards.map((item) => (
            <article key={item.title} className="security-payment-card">
              <span className="security-payment-icon"><SecurityIcon type={item.icon} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="security-note">
          {t("security.payNote")}
          <span>{t("security.payNoteSpan")}</span>
        </div>
      </section>

      <section id="security-privacy" className={`security-privacy${vis("security-privacy")}`}>
        <h2>
          {t("security.privH2")}
          <span>{t("security.privH2Span")}</span>
        </h2>
        <p>{t("security.privP")}</p>
        <div className="security-privacy-tags">
          <span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M8.4 12.3l2.5 2.5 4.8-5" />
            </svg>
            {t("security.privTag1")}
          </span>
          <span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M8.4 12.3l2.5 2.5 4.8-5" />
            </svg>
            {t("security.privTag2")}
          </span>
          <span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M8.4 12.3l2.5 2.5 4.8-5" />
            </svg>
            {t("security.privTag3")}
          </span>
        </div>
        <div className="security-privacy-note">{t("security.privFoot")}</div>
      </section>

      <section id="security-cta" className={`security-cta${vis("security-cta")}`}>
        <h2>
          {t("security.ctaH2Line1")}
          <span>{t("security.ctaH2Span")}</span>
        </h2>
        <div className="security-cta-actions">
          <Link to="/partner" className="security-btn security-btn--primary">
            {t("security.partnerBtn")}
          </Link>
          <button type="button" className="security-btn security-btn--ghost">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3h7l4 4v14H8z" />
              <path d="M15 3v5h4" />
              <path d="M11 13h5" />
              <path d="M11 17h5" />
            </svg>
            {t("security.privacyBtn")}
          </button>
        </div>
        <div className="security-cta-note">
          <span className="security-cta-dot" aria-hidden />
          {t("security.ctaNote")}
        </div>
      </section>
    </div>
  );
}

export default SecurityPage;
