import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./FitupProcessPage.css";

const UX_ICON_STROKE = 1.65;

function UxJourneyIcon({ type }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: UX_ICON_STROKE,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "reg") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </svg>
    );
  }
  if (type === "book") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M9 17l2 2 4-4" />
      </svg>
    );
  }
  if (type === "prog") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M3 3v18h18" />
        <path d="M7 15V9M12 15v-6M17 15v-3" />
      </svg>
    );
  }
  if (type === "coach") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    );
  }
  return null;
}

const AUTO_ICON_STROKE = 1.65;

function AutomationIcon({ type }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: AUTO_ICON_STROKE,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "renew") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M21 12a9 9 0 0 0-15-6.7L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 15 6.7L21 16" />
        <path d="M21 21v-5h-5" />
      </svg>
    );
  }
  if (type === "brain") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M12 5a3 3 0 1 0-5.4 1.8A3 3 0 1 0 12 18a3 3 0 1 0 5.4-1.8A3 3 0 1 0 12 5z" />
        <path d="M12 5v13" />
        <path d="M15.6 7.2a4 4 0 0 1 1.2 2.8" />
        <path d="M7.2 14a4 4 0 0 1-1.2-2.8" />
      </svg>
    );
  }
  if (type === "bell") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    );
  }
  if (type === "bars") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M4 20V10" />
        <path d="M12 20V4" />
        <path d="M20 20v-7" />
      </svg>
    );
  }
  if (type === "trend") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </svg>
    );
  }
  if (type === "wallet") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
        <path d="M3 10h18v8H3z" />
        <path d="M16 14h.01" />
      </svg>
    );
  }
  return null;
}

const ONBOARD_ICON_STROKE = 1.65;

function OnboardingIcon({ type }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: ONBOARD_ICON_STROKE,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "partnership") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }
  if (type === "config") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M6 4v16" />
        <path d="M6 10h4" />
        <path d="M12 4v16" />
        <path d="M12 7h4" />
        <path d="M18 4v16" />
        <path d="M18 14h4" />
      </svg>
    );
  }
  if (type === "training") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3.33 1.67 6.67 1.67 10 0v-5" />
      </svg>
    );
  }
  if (type === "launch") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    );
  }
  return null;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function formatWhyStatValue(n, decimals, suffix) {
  if (suffix === "K+") return `${Math.floor(n)}K+`;
  const base = decimals > 0 ? Number(n).toFixed(decimals) : String(Math.floor(n));
  return `${base}${suffix}`;
}

function WhyStatCounter({ target, decimals, suffix, duration, started, reduceMotion }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!started) return;
    if (reduceMotion) {
      setV(target);
      return;
    }
    let startTs = null;
    let rafId = 0;
    const tick = (ts) => {
      if (startTs === null) startTs = ts;
      const p = Math.min(1, (ts - startTs) / duration);
      setV(target * easeOutCubic(p));
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setV(target);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration, reduceMotion]);

  return formatWhyStatValue(v, decimals, suffix);
}

const WHY_STATS_DEF = [
  { icon: "○", target: 99.9, decimals: 1, suffix: "%", duration: 2000, labelKey: "process.statUptime" },
  { icon: "◎", target: 500, decimals: 0, suffix: "+", duration: 1900, labelKey: "process.statPartners" },
  { icon: "⟲", target: 50, decimals: 0, suffix: "K+", duration: 2100, labelKey: "process.statUsers" },
  { icon: "$", target: 35, decimals: 0, suffix: "%", duration: 1700, labelKey: "process.statRevenue" },
];

function FitupProcessPage() {
  const { t } = useI18n();
  const timelineRef = useRef(null);
  const maxStepRef = useRef(0);
  const [lineFill, setLineFill] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const whyGridRef = useRef(null);
  const [whyStatsStarted, setWhyStatsStarted] = useState(false);

  const learnMore = t("common.learnMore");

  const timelineItems = useMemo(
    () => [
      { step: t("process.step1"), title: t("process.timeline1Title"), body: t("process.timeline1Body") },
      { step: t("process.step2"), title: t("process.timeline2Title"), body: t("process.timeline2Body") },
      { step: t("process.step3"), title: t("process.timeline3Title"), body: t("process.timeline3Body") },
      { step: t("process.step4"), title: t("process.timeline4Title"), body: t("process.timeline4Body") },
    ],
    [t]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setWhyStatsStarted(true);
      return;
    }
    const el = whyGridRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setWhyStatsStarted(true);
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const rows = [...root.querySelectorAll(".timeline-row")];

    if (reduceMotion) {
      setLineFill(1);
      rows.forEach((row) => row.classList.add("is-row-visible"));
      return () => {
        rows.forEach((row) => row.classList.remove("is-row-visible"));
      };
    }

    maxStepRef.current = 0;
    setLineFill(0);
    rows.forEach((row) => row.classList.remove("is-row-visible"));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const row = e.target;
          row.classList.add("is-row-visible");
          const idx = rows.indexOf(row);
          if (idx >= 0 && idx + 1 > maxStepRef.current) {
            maxStepRef.current = idx + 1;
            setLineFill(maxStepRef.current / rows.length);
          }
        });
      },
      { threshold: [0, 0.22], rootMargin: "0px 0px -14% 0px" }
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, [reduceMotion, timelineItems]);

  const dualCards = useMemo(
    () => [
      {
        sectionId: "onboarding",
        title: t("process.blockOnboardTitle"),
        subtitle: t("process.blockOnboardSub"),
        cards: [
          {
            onboardIcon: "partnership",
            title: t("process.onboardPartnershipTitle"),
            body: t("process.onboardPartnershipBody"),
          },
          {
            onboardIcon: "config",
            title: t("process.onboardConfigTitle"),
            body: t("process.onboardConfigBody"),
          },
          {
            onboardIcon: "training",
            title: t("process.onboardTrainingTitle"),
            body: t("process.onboardTrainingBody"),
          },
          {
            onboardIcon: "launch",
            title: t("process.onboardLaunchTitle"),
            body: t("process.onboardLaunchBody"),
          },
        ],
      },
      {
        sectionId: "journey",
        title: t("process.blockUxTitle"),
        subtitle: t("process.blockUxSub"),
        cards: [
          { icon: "reg", title: t("process.uxRegTitle"), body: t("process.uxRegBody") },
          { icon: "book", title: t("process.uxBookTitle"), body: t("process.uxBookBody") },
          { icon: "prog", title: t("process.uxProgTitle"), body: t("process.uxProgBody") },
          { icon: "coach", title: t("process.uxCoachTitle"), body: t("process.uxCoachBody") },
        ],
      },
      {
        sectionId: "automation",
        title: t("process.blockAutoTitle"),
        subtitle: t("process.blockAutoSub"),
        cards: [
          { autoIcon: "renew", title: t("process.autoRenewTitle"), body: t("process.autoRenewBody") },
          { autoIcon: "brain", title: t("process.autoScheduleTitle"), body: t("process.autoScheduleBody") },
          { autoIcon: "bell", title: t("process.autoNotifyTitle"), body: t("process.autoNotifyBody") },
          { autoIcon: "bars", title: t("process.autoCapacityTitle"), body: t("process.autoCapacityBody") },
          { autoIcon: "trend", title: t("process.autoAnalyticsTitle"), body: t("process.autoAnalyticsBody") },
          {
            autoIcon: "wallet",
            title: t("process.autoPayTitle"),
            body: t("process.autoPayBody"),
            featured: true,
          },
        ],
      },
    ],
    [t]
  );

  const arCards = useMemo(
    () =>
      Array(4).fill(null).map(() => ({
        title: t("process.arCardTitle"),
        body: t("process.arCardBody"),
      })),
    [t]
  );

  return (
    <div className="process-page">
      <main className="wrap">
        <section className="process-hero">
          <span className="process-pill">{t("process.pill")}</span>
          <h1>{t("process.heroH1")}</h1>
          <p>{t("process.heroP")}</p>
          <span className="process-scroll-dot" aria-hidden="true" />
        </section>

        <section ref={timelineRef} className="process-timeline">
          <h2>{t("process.journeyH2")}</h2>
          <p className="timeline-subtitle">{t("process.journeySub")}</p>
          <div
            className="process-line"
            aria-hidden="true"
            style={{ "--fill": reduceMotion ? 1 : lineFill }}
          >
            <div className="process-line-track" />
            <div className="process-line-fill-wrap">
              <div className="process-line-fill-core" />
              <div className="process-line-head" />
            </div>
          </div>
          {timelineItems.map((item, idx) => (
            <article
              key={`${item.step}-${idx}`}
              className={`timeline-row ${idx % 2 === 0 ? "badge-left" : "badge-right"}`}
            >
              <div className="timeline-col left">
                {idx % 2 === 0 ? (
                  <div className="timeline-badge">{item.step}</div>
                ) : (
                  <div className="timeline-card">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <Link className="process-text-cta" to="/contact">
                      {learnMore}
                    </Link>
                  </div>
                )}
              </div>

              <div className="timeline-col right">
                {idx % 2 === 0 ? (
                  <div className="timeline-card">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <Link className="process-text-cta" to="/contact">
                      {learnMore}
                    </Link>
                  </div>
                ) : (
                  <div className="timeline-badge">{item.step}</div>
                )}
              </div>
            </article>
          ))}
        </section>

        {dualCards.map((block) => (
          <section
            key={block.sectionId}
            className="process-block"
            id={block.sectionId}
          >
            <h2>{block.title}</h2>
            <p className="process-block-subtitle">{block.subtitle}</p>
            {block.sectionId === "automation" && (
              <span className="automation-underline" aria-hidden="true" />
            )}
            <div
              className={`two-col ${block.sectionId === "automation" ? "automation-grid" : ""} ${block.sectionId === "onboarding" || block.sectionId === "journey" ? "process-blob-cards" : ""} ${block.sectionId === "journey" ? "journey-grid" : ""}`}
            >
              {block.cards.map((card, idx) => (
                <div
                  key={`${block.sectionId}-${idx}`}
                  className={`mini-card${card.featured ? " mini-card--automation-featured" : ""}`}
                >
                  <div
                    className={`mini-icon${
                      card.icon
                        ? ` mini-icon--ux mini-icon--ux-${card.icon}`
                        : card.autoIcon
                          ? ` mini-icon--auto mini-icon--auto-${card.autoIcon}`
                          : card.onboardIcon
                            ? ` mini-icon--onboard mini-icon--onboard-${card.onboardIcon}`
                            : ""
                    }`}
                    aria-hidden="true"
                  >
                    {card.icon ? (
                      <UxJourneyIcon type={card.icon} />
                    ) : card.autoIcon ? (
                      <AutomationIcon type={card.autoIcon} />
                    ) : card.onboardIcon ? (
                      <OnboardingIcon type={card.onboardIcon} />
                    ) : (
                      "✓"
                    )}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <Link className="process-text-cta" to="/contact">
                    {learnMore}
                  </Link>
                </div>
              ))}
            </div>

            {block.sectionId === "automation" && (
              <article className="automation-callout">
                <div className="automation-callout-icon" aria-hidden="true">✣</div>
                <h3>{t("process.autoCalloutH3")}</h3>
                <p>{t("process.autoCalloutP")}</p>
              </article>
            )}
          </section>
        ))}

        <section className="process-block" id="ar">
          <h2>{t("process.arH2")}</h2>
          <p className="process-block-subtitle">{t("process.arSub")}</p>
          <span className="ar-underline" aria-hidden="true" />
          <div className="ar-grid">
            {arCards.map((card) => (
              <article key={card.title + card.body} className="ar-card">
                <div className="mini-icon" aria-hidden="true">✓</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <div className="ar-highlight">
            <div className="ar-highlight-icon" aria-hidden="true">✧</div>
            <h3>{t("process.arHighlightH3")}</h3>
            <p>{t("process.arHighlightP")}</p>
            <Link className="process-cta-pill" to="/app-experience">
              {t("process.arBtn")}
            </Link>
          </div>

          <div className="ar-grid ar-grid-mobile">
            {arCards.map((card, idx) => (
              <article key={card.title + idx} className="ar-card">
                <div className="mini-icon" aria-hidden="true">✓</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <div className="ar-footer">{t("process.arFooter")}</div>
        </section>

        <section className="process-why">
          <h2>{t("process.whyH2")}</h2>
          <p className="process-block-subtitle">{t("process.whySub")}</p>
          <span className="ar-underline" aria-hidden="true" />
          <div ref={whyGridRef} className="why-top-grid">
            {WHY_STATS_DEF.map((s) => (
              <article key={s.labelKey} className="why-stat">
                <div className="mini-icon" aria-hidden="true">
                  {s.icon}
                </div>
                <h3>
                  <WhyStatCounter
                    target={s.target}
                    decimals={s.decimals}
                    suffix={s.suffix}
                    duration={s.duration}
                    started={whyStatsStarted}
                    reduceMotion={reduceMotion}
                  />
                </h3>
                <p>{t(s.labelKey)}</p>
              </article>
            ))}
          </div>

          <div className="why-grid">
            <div>{t("process.whyPill1")}</div>
            <div>{t("process.whyPill2")}</div>
            <div>{t("process.whyPill3")}</div>
          </div>
        </section>

        <section className="process-final-cta">
          <div className="ar-highlight-icon" aria-hidden="true">⚡</div>
          <h2>{t("process.finalH2")}</h2>
          <p>{t("process.finalP")}</p>
          <div className="cta-actions">
            <Link className="primary" to="/partner">
              {t("process.ctaPartner")}
            </Link>
            <Link className="secondary" to="/contact">
              {t("process.ctaDemo")}
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}

export default FitupProcessPage;
