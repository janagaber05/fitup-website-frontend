import { useCallback, useEffect, useMemo, useState } from "react";
import heroBackgroundLeft from "../assets/home page/Image (Background).png";
import heroBackgroundRight from "../assets/home page/Image (App Screen).png";
import heroPhone from "../assets/home page/home page phone.png";
import gymOwnerImage from "../assets/home page/Image (Gym Owner).png";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./FitupLanding.css";

const LANDING_SCROLL_SECTION_IDS = ["engine", "app", "platform", "works", "gym"];

function FitupLanding() {
  const { t } = useI18n();
  const [sectionVisible, setSectionVisible] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return { hero: true, engine: true, app: true, platform: true, works: true, gym: true };
    }
    return { hero: true };
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const observers = [];
    for (const id of LANDING_SCROLL_SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const ob = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          setSectionVisible((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          ob.unobserve(el);
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      ob.observe(el);
      observers.push(ob);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const sectionClass = useCallback(
    (id, base) => `${base} fitup-section-enter${sectionVisible[id] ? " is-visible" : ""}`,
    [sectionVisible]
  );

  const whyCards = useMemo(
    () => [
      { id: "smart-management", title: t("landing.whyCard1Title"), description: t("landing.whyCard1Desc") },
      { id: "booking-system", title: t("landing.whyCard2Title"), description: t("landing.whyCard2Desc") },
      { id: "announcements", title: t("landing.whyCard3Title"), description: t("landing.whyCard3Desc") },
      { id: "progress-tracking", title: t("landing.whyCard4Title"), description: t("landing.whyCard4Desc") },
      { id: "ar-support", title: t("landing.whyCard5Title"), description: t("landing.whyCard5Desc") },
      { id: "real-time-analytics", title: t("landing.whyCard6Title"), description: t("landing.whyCard6Desc") },
    ],
    [t]
  );

  const howSteps = useMemo(
    () => [
      { n: "01", title: t("landing.how1Title"), desc: t("landing.how1Desc") },
      { n: "02", title: t("landing.how2Title"), desc: t("landing.how2Desc") },
      { n: "03", title: t("landing.how3Title"), desc: t("landing.how3Desc") },
      { n: "04", title: t("landing.how4Title"), desc: t("landing.how4Desc") },
    ],
    [t]
  );

  return (
    <div className="fitup-page">
      <main>
        <section className={sectionClass("hero", "fitup-hero fitup-wrap")} id="hero">
          <div className="fitup-hero-bg fitup-hero-bg-left" aria-hidden>
            <img
              src={heroBackgroundLeft}
              alt=""
              className="fitup-hero-photo fitup-hero-photo--left"
            />
          </div>
          <div className="fitup-hero-bg fitup-hero-bg-right" aria-hidden>
            <img
              src={heroBackgroundRight}
              alt=""
              className="fitup-hero-photo fitup-hero-photo--right"
            />
          </div>
          <div className="fitup-hero-inner">
            <div className="fitup-hero-left">
              <span className="fitup-pill">{t("landing.heroPill")}</span>
              <h1>
                {t("landing.heroTitle1")} <br />
                {t("landing.heroTitle2")} <span>{t("landing.heroTitleAccent")}</span>
              </h1>
              <Link to="/app-experience" className="fitup-inline-link">
                {t("landing.heroCta")}
              </Link>
            </div>
          </div>
          <div className="fitup-hero-phone-float">
            <img
              src={heroPhone}
              alt={t("landing.phoneAlt")}
              className="fitup-hero-phone-img"
            />
          </div>
        </section>

        <section className={sectionClass("engine", "fitup-wrap fitup-engine")} id="engine">
          <h2>
            {t("landing.engineTitle")} <span>{t("landing.engineTitleAccent")}</span>
          </h2>
          <p className="fitup-engine-subtitle">{t("landing.engineSubtitle")}</p>
          <div className="fitup-engine-layout">
            <div className="fitup-engine-left">
              <article className="fitup-message-card">
                <h4>{t("landing.msgName")}</h4>
                <p>{t("landing.msg1")}</p>
                <span>{t("landing.msg2")}</span>
              </article>
              <article className="fitup-progress-card">
                <h4>{t("landing.progTitle")}</h4>
                <p>{t("landing.progMeta")}</p>
                <div className="fitup-progress-track">
                  <i></i>
                </div>
              </article>
            </div>
            <div className="fitup-engine-right">
              <article className="fitup-engine-item">
                <span className="fitup-engine-icon fitup-engine-icon-calendar" />
                <div>
                  <h3>{t("landing.feat1Title")}</h3>
                  <p>{t("landing.feat1Desc")}</p>
                </div>
              </article>
              <article className="fitup-engine-item">
                <span className="fitup-engine-icon fitup-engine-icon-chat" />
                <div>
                  <h3>{t("landing.feat2Title")}</h3>
                  <p>{t("landing.feat2Desc")}</p>
                </div>
              </article>
              <article className="fitup-engine-item">
                <span className="fitup-engine-icon fitup-engine-icon-bolt" />
                <div>
                  <h3>{t("landing.feat3Title")}</h3>
                  <p>{t("landing.feat3Desc")}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={sectionClass("app", "fitup-ar")} id="app">
          <div className="fitup-wrap fitup-ar-inner">
            <span className="fitup-ar-tag">{t("landing.arTag")}</span>
            <h2>
              {t("landing.arTitle1")} <br />
              {t("landing.arTitle2")} <span>{t("landing.arTitleAccent")}</span>
            </h2>
            <p>{t("landing.arBody")}</p>
            <Link to="/app-experience" className="fitup-ar-btn">
              {t("landing.arCta")}
            </Link>
          </div>
        </section>

        <section className={sectionClass("platform", "fitup-wrap fitup-why")} id="platform">
          <h2>
            {t("landing.whyTitle")} <span>{t("landing.whyTitleAccent")}</span>
          </h2>
          <p className="fitup-why-subtitle">{t("landing.whySubtitle")}</p>

          <div className="fitup-why-grid">
            {whyCards.map((card, idx) => (
              <article key={card.id} className="fitup-why-card">
                <div className="fitup-why-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 20.25C15.6 18.55 13.95 17.25 12 17.25C10.05 17.25 8.4 18.55 7.5 20.25"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 12.75C13.933 12.75 15.5 11.183 15.5 9.25C15.5 7.317 13.933 5.75 12 5.75C10.067 5.75 8.5 7.317 8.5 9.25C8.5 11.183 10.067 12.75 12 12.75Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </div>

                <h3 className="fitup-why-title">{card.title}</h3>
                <p className="fitup-why-desc">{card.description}</p>
                <Link to={`/solution/${card.id}`} className="fitup-why-link">
                  {t("landing.learnMore")}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={sectionClass("works", "fitup-wrap fitup-how")} id="works">
          <h2>{t("landing.howTitle")}</h2>
          <div className="fitup-how-grid">
            {howSteps.map((step) => (
              <article
                key={step.n}
                className={`fitup-how-card fitup-how-card-${step.n}`}
              >
                <div className="fitup-how-dot" aria-hidden="true" />
                <div className="fitup-how-num" aria-hidden="true">
                  {step.n}
                </div>
                <h3 className="fitup-how-title">{step.title}</h3>
                <p className="fitup-how-desc">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={sectionClass("gym", "fitup-wrap fitup-cta")} id="gym">
          <div
            className="fitup-cta-top"
          >
            <img
              src={gymOwnerImage}
              alt=""
              aria-hidden="true"
              className="fitup-cta-bg-image"
            />
            <div className="fitup-cta-top-inner">
              <h2>
                {t("landing.ctaTopTitle1")}
                <br />
                {t("landing.ctaTopTitle2")}
              </h2>
              <p>{t("landing.ctaTopBody")}</p>
              <Link to="/partner" className="fitup-cta-outline">
                {t("landing.ctaTopBtn")}
              </Link>
            </div>
          </div>

          <div className="fitup-cta-bottom">
            <h2>
              {t("landing.ctaBottomTitle1")} <br />
              <span>{t("landing.ctaBottomAccent")}</span>
            </h2>
            <div className="fitup-cta-actions">
              <Link to="/partner" className="fitup-btn fitup-cta-primary">
                {t("landing.becomePartner")}
              </Link>
              <button type="button" className="fitup-cta-secondary">
                {t("landing.downloadApp")}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FitupLanding;
