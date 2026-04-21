import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./PartnerPage.css";

function PartnerWhyIcon({ type }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "ops") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="1.5" {...s} />
        <rect x="13" y="4" width="7" height="7" rx="1.5" {...s} />
        <rect x="4" y="13" width="7" height="7" rx="1.5" {...s} />
        <rect x="13" y="13" width="7" height="7" rx="1.5" {...s} />
      </svg>
    );
  }
  if (type === "member") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" {...s} />
        <circle cx="9" cy="7" r="4" {...s} />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" {...s} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1z" {...s} />
      <path d="M4 22v-7" {...s} />
    </svg>
  );
}

function PartnerPage() {
  const { t } = useI18n();

  const whyCards = useMemo(
    () => [
      { id: "ops", title: t("partner.why1Title"), description: t("partner.why1Desc"), icon: "ops" },
      { id: "member", title: t("partner.why2Title"), description: t("partner.why2Desc"), icon: "member" },
      { id: "scale", title: t("partner.why3Title"), description: t("partner.why3Desc"), icon: "scale" },
    ],
    [t]
  );

  return (
    <div className="partner-page">
      <section className="partner-hero fitup-wrap">
        <span className="partner-pill">
          <svg className="partner-pill-icon" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t("partner.pill")}
        </span>
        <h1 className="partner-hero-title">
          <span className="partner-hero-line1">{t("partner.heroLine1")}</span>
          <span className="partner-hero-line2 partner-hero-accent">{t("partner.heroLine2")}</span>
        </h1>
        <p className="partner-hero-sub">{t("partner.heroSub")}</p>
        <div className="partner-hero-actions">
          <a href="#partnership-inquiry" className="partner-btn partner-btn--primary">
            {t("partner.heroPrimary")}
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#general-contact" className="partner-btn partner-btn--secondary partner-btn--glass">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
                d="M6.5 6h11c.83 0 1.5.67 1.5 1.5v4.5c0 .83-.67 1.5-1.5 1.5h-3.8L9.3 16.2V13.5H6.5A1.5 1.5 0 0 1 5 12V7.5C5 6.67 5.67 6 6.5 6z"
              />
            </svg>
            {t("partner.heroSecondary")}
          </a>
        </div>
      </section>

      <section className="partner-why" aria-labelledby="partner-why-heading">
        <div className="fitup-wrap partner-why-inner">
          <h2 id="partner-why-heading">
            {t("partner.whyHeading")} <span className="partner-hero-accent">FITUP</span>
          </h2>
          <div className="partner-why-grid">
            {whyCards.map((card) => (
              <article key={card.id} className="partner-why-card">
                <div className="partner-why-icon" aria-hidden="true">
                  <PartnerWhyIcon type={card.icon} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="partner-inquiry fitup-wrap" id="partnership-inquiry" aria-labelledby="partner-inquiry-heading">
        <div className="partner-inquiry-inner">
          <div className="partner-inquiry-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c2-4 5.5-6 7.5-6s5.5 2 7.5 6" />
              <path d="M12 11V3M9 6l3-3 3 3" />
            </svg>
          </div>
          <h2 id="partner-inquiry-heading">{t("partner.inquiryTitle")}</h2>
          <p>{t("partner.inquiryBody")}</p>
          <Link to="/contact" className="partner-btn partner-btn--outline">
            {t("partner.inquiryBtn")}
          </Link>
        </div>
      </section>

      <section className="partner-contact fitup-wrap" id="general-contact" aria-labelledby="partner-contact-heading">
        <h2 id="partner-contact-heading">{t("partner.generalTitle")}</h2>
        <p className="partner-contact-sub">{t("partner.generalSub")}</p>
        <form
          className="partner-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="partner-field">
            <span>{t("partner.fieldName")}</span>
            <input type="text" name="name" autoComplete="name" placeholder={t("partner.phName")} />
          </label>
          <label className="partner-field">
            <span>{t("partner.fieldEmail")}</span>
            <input type="email" name="email" autoComplete="email" placeholder={t("partner.phEmail")} />
          </label>
          <label className="partner-field">
            <span>{t("partner.fieldMessage")}</span>
            <textarea name="message" rows={5} placeholder={t("partner.phMessage")} />
          </label>
          <button type="submit" className="partner-btn partner-btn--submit">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("partner.sendMessage")}
          </button>
        </form>
        <div className="partner-form-notes">
          <p>
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("partner.noteReview")}
          </p>
          <p>
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 11V8a4 4 0 1 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {t("partner.noteSecure")}
          </p>
        </div>
      </section>
    </div>
  );
}

export default PartnerPage;
