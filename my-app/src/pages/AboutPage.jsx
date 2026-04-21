import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./AboutPage.css";

function PainIcon({ type }) {
  const stroke = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  if (type === "alert") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="9" {...stroke} />
        <path d="M12 8v5M12 16h.01" {...stroke} />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" {...stroke} />
        <path d="M8 3v4M16 3v4M4 10h16" {...stroke} />
      </svg>
    );
  }
  if (type === "trend") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M5 8l4 3 3-4 4 5 4-6" {...stroke} />
      </svg>
    );
  }
  if (type === "people") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="9" cy="8" r="2.5" {...stroke} />
        <path d="M4 18c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" {...stroke} />
        <circle cx="17" cy="9" r="2" {...stroke} />
        <path d="M14 18c.3-1.8 1.5-3 3.5-3 2 0 3.2 1.2 3.5 3" {...stroke} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" {...stroke} />
      <path d="M9 9h.01M15 9h.01" {...stroke} />
    </svg>
  );
}

function RoadmapIcon({ type }) {
  const s = { stroke: "currentColor", strokeWidth: 1.85, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  if (type === "now") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="12" r="5.5" stroke="#fff" strokeWidth="1.75" fill="none" />
      </svg>
    );
  }
  if (type === "star") {
    return (
      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        <path d="M12 5.5v5M12 13.5v5M5.5 12h5M13.5 12h5" {...s} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <path d="M4.5 16.5c2-4 5.5-6 7.5-6s5.5 2 7.5 6" {...s} />
      <path d="M12 11V3M9 6l3-3 3 3" {...s} />
    </svg>
  );
}

function VisionStatementTypewriter({ text }) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !text) return;
    if (reduceMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    const chars = Array.from(text);
    let i = 0;
    const ms = 26;
    const id = setInterval(() => {
      i += 1;
      if (i >= chars.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(id);
        return;
      }
      setDisplayed(chars.slice(0, i).join(""));
    }, ms);
    return () => clearInterval(id);
  }, [inView, text, reduceMotion]);

  return (
    <p ref={containerRef} className="about-vision-statement">
      <span className="about-typewriter-visual" aria-hidden="true">
        {displayed}
        {!done && <span className="about-typewriter-cursor" />}
      </span>
      <span className="about-sr-only">{text}</span>
    </p>
  );
}

function useSectionReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return [ref, visible];
}

function AboutPage() {
  const { t } = useI18n();
  const visionStatement = useMemo(() => t("about.visionStatement"), [t]);
  const [painRef, painVisible] = useSectionReveal();
  const [visionRef, visionVisible] = useSectionReveal();
  const [roadmapRef, roadmapVisible] = useSectionReveal();
  const [ctaRef, ctaVisible] = useSectionReveal();

  const painCards = useMemo(
    () => [
      { id: 1, text: t("about.pain1"), icon: "alert" },
      { id: 2, text: t("about.pain2"), icon: "calendar" },
      { id: 3, text: t("about.pain3"), icon: "trend" },
      { id: 4, text: t("about.pain4"), icon: "people" },
      { id: 5, text: t("about.pain5"), icon: "sad" },
    ],
    [t]
  );

  const roadmap = useMemo(
    () => [
      {
        title: t("about.now"),
        icon: "now",
        active: true,
        points: [t("about.now1"), t("about.now2"), t("about.now3")],
      },
      {
        title: t("about.y2026"),
        icon: "star",
        points: [t("about.r261"), t("about.r262"), t("about.r263")],
      },
      {
        title: t("about.beyond"),
        icon: "rocket",
        points: [t("about.b1"), t("about.b2"), t("about.b3")],
      },
    ],
    [t]
  );

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-skeletons" aria-hidden="true">
          <div className="about-skeleton about-skeleton--left">
            <span className="about-skeleton-line" style={{ width: "85%" }} />
            <span className="about-skeleton-line" style={{ width: "60%" }} />
          </div>
          <div className="about-skeleton about-skeleton--right">
            <span className="about-skeleton-line" style={{ width: "78%" }} />
            <span className="about-skeleton-line" style={{ width: "55%" }} />
          </div>
          <div className="about-skeleton about-skeleton--lower-left">
            <span className="about-skeleton-line" style={{ width: "70%" }} />
            <span className="about-skeleton-line" style={{ width: "45%" }} />
          </div>
          <div className="about-skeleton about-skeleton--lower-right">
            <span className="about-skeleton-line" style={{ width: "72%" }} />
            <span className="about-skeleton-line" style={{ width: "50%" }} />
          </div>
          <div className="about-skeleton about-skeleton--bottom">
            <span className="about-skeleton-line" style={{ width: "65%" }} />
            <span className="about-skeleton-line" style={{ width: "40%" }} />
          </div>
        </div>
        <div className="about-hero-content">
          <span className="about-mission-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
            </svg>
            {t("about.pill")}
          </span>
          <h1>
            {t("about.h1a")}
            <span>{t("about.h1b")}</span>
          </h1>
          <p className="about-hero-sub about-hero-sub--muted">{t("about.heroMuted")}</p>
          <p className="about-hero-sub about-hero-sub--light">{t("about.heroLight")}</p>
        </div>
      </section>

      <section ref={painRef} className={`about-pain${painVisible ? " is-visible" : ""}`}>
        <h2>
          {t("about.painH2a")}
          <span>{t("about.painH2b")}</span>
        </h2>
        <div className="about-pain-grid">
          {painCards.map((item) => (
            <article key={item.id} className="about-pain-card">
              <span className="about-pain-icon" aria-hidden="true">
                <PainIcon type={item.icon} />
              </span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="about-pain-foot">{t("about.painFoot")}</p>
      </section>

      <section ref={visionRef} className={`about-vision-wrap${visionVisible ? " is-visible" : ""}`}>
        <div className="about-vision-card">
          <h2>
            {t("about.visionH2a")}
            <span>{t("about.visionH2b")}</span>
          </h2>
          <p className="about-vision-lead">{t("about.visionLead")}</p>
          <p className="about-vision-belief">{t("about.visionBelief")}</p>
        </div>
        <div className="about-vision-white">
          <h3 className="about-vision-title">{t("about.visionTitle")}</h3>
          <VisionStatementTypewriter text={visionStatement} />
          <p className="about-vision-tagline">{t("about.visionTagline")}</p>
        </div>
      </section>

      <section ref={roadmapRef} className={`about-roadmap${roadmapVisible ? " is-visible" : ""}`}>
        <h2>{t("about.roadmapTitle")}</h2>
        <p className="about-roadmap-sub">{t("about.roadmapSub")}</p>

        <div className="about-roadmap-timeline">
          <div className="about-roadmap-nodes">
            {roadmap.map((stage) => (
              <div key={stage.title} className="about-roadmap-node-col">
                <div className={`about-roadmap-circle${stage.active ? " is-active" : ""}`}>
                  <span className="about-roadmap-circle-inner">
                    <RoadmapIcon type={stage.icon} />
                  </span>
                </div>
                <span className={`about-roadmap-node-label${stage.active ? " is-active" : ""}`}>{stage.title}</span>
              </div>
            ))}
          </div>
          <div className="about-roadmap-line" aria-hidden="true" />
        </div>

        <div className="about-roadmap-cards">
          {roadmap.map((stage) => (
            <article key={stage.title} className={`about-roadmap-card${stage.active ? " is-active" : ""}`}>
              <ul>
                {stage.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section ref={ctaRef} className={`about-cta${ctaVisible ? " is-visible" : ""}`}>
        <h2>
          {t("about.ctaH2a")}
          <span>{t("about.ctaH2b")}</span>
        </h2>
        <div className="about-cta-actions">
          <Link to="/partner" className="about-btn about-btn--primary">
            {t("about.partnerBtn")}
          </Link>
          <button type="button" className="about-btn about-btn--ghost">{t("about.exploreBtn")}</button>
        </div>
        <small>{t("about.ctaSmall")}</small>
      </section>
    </div>
  );
}

export default AboutPage;
