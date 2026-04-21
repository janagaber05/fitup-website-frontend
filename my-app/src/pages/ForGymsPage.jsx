import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";
import forGymsHeroImage from "../assets/for-gyms-hero-app-screen.png";
import "./ForGymsPage.css";

const benefitStroke = "#ff6347";
const growthAccent = "#ff6b46";

/** Numeric targets for animated counters (labels stay in i18n). */
const GROWTH_STATS_NUMERIC = [
  { icon: "trend", target: 35, duration: 1800, delayMs: 0 },
  { icon: "award", target: 42, duration: 1900, delayMs: 100 },
  { icon: "clock", target: -60, duration: 2100, delayMs: 200 },
  { icon: "members", target: 28, duration: 1750, delayMs: 300 },
];

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function formatGrowthPercent(n) {
  const v = Math.round(n);
  if (v > 0) return `+${v}%`;
  if (v < 0) return `${v}%`;
  return "0%";
}

function GrowthStatCounter({ target, duration, delayMs, started, reduceMotion }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!started) return undefined;
    if (reduceMotion) {
      setV(target);
      return undefined;
    }
    let rafId = 0;
    let startTs = null;
    const delayTimer = window.setTimeout(() => {
      const tick = (ts) => {
        if (startTs === null) startTs = ts;
        const p = Math.min(1, (ts - startTs) / duration);
        setV(target * easeOutCubic(p));
        if (p < 1) rafId = requestAnimationFrame(tick);
        else setV(target);
      };
      rafId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(rafId);
    };
  }, [started, target, duration, delayMs, reduceMotion]);

  return formatGrowthPercent(v);
}

function OperationalBenefitIcon({ type }) {
  const c = {
    fill: "none",
    stroke: benefitStroke,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "shield") {
    return (
      <svg className="fg-benefit-svg" viewBox="0 0 24 24" width={40} height={40} aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...c} />
      </svg>
    );
  }
  if (type === "bolt") {
    return (
      <svg className="fg-benefit-svg" viewBox="0 0 24 24" width={40} height={40} aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...c} />
      </svg>
    );
  }
  return (
    <svg className="fg-benefit-svg" viewBox="0 0 24 24" width={40} height={40} aria-hidden>
      <line x1="5" y1="20" x2="19" y2="20" {...c} />
      <line x1="7" y1="20" x2="7" y2="14" {...c} />
      <line x1="12" y1="20" x2="12" y2="9" {...c} />
      <line x1="17" y1="20" x2="17" y2="5" {...c} />
    </svg>
  );
}

function GrowthStatIcon({ type }) {
  const c = {
    fill: "none",
    stroke: growthAccent,
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "trend") {
    return (
      <svg className="fg-growth-svg" viewBox="0 0 24 24" width={36} height={36} aria-hidden>
        <polyline points="3 17 9 11 13 15 21 7" {...c} />
        <polyline points="15 7 21 7 21 13" {...c} />
      </svg>
    );
  }
  if (type === "award") {
    return (
      <svg className="fg-growth-svg" viewBox="0 0 24 24" width={36} height={36} aria-hidden>
        <circle cx="12" cy="9" r="5.5" {...c} />
        <path d="M8.2 13.5L7 21l5-2.5L17 21l-1.2-7.5" {...c} />
      </svg>
    );
  }
  if (type === "clock") {
    return (
      <svg className="fg-growth-svg" viewBox="0 0 24 24" width={36} height={36} aria-hidden>
        <circle cx="12" cy="12" r="9.5" {...c} />
        <path d="M12 7v5l3.5 2" {...c} />
      </svg>
    );
  }
  return (
    <svg className="fg-growth-svg" viewBox="0 0 24 24" width={36} height={36} aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" {...c} />
      <circle cx="9" cy="7" r="3.5" {...c} />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" {...c} />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" {...c} />
    </svg>
  );
}

function ForGymsPage() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const r = Boolean(reduceMotion);
  const growthSectionRef = useRef(null);
  const [growthCountStarted, setGrowthCountStarted] = useState(false);

  const challenges = useMemo(
    () => [
      { title: t("forGyms.ch1t"), subtitle: t("forGyms.ch1s") },
      { title: t("forGyms.ch2t"), subtitle: t("forGyms.ch2s") },
      { title: t("forGyms.ch3t"), subtitle: t("forGyms.ch3s") },
    ],
    [t]
  );

  const solutions = useMemo(
    () => [
      { title: t("forGyms.sol1t"), subtitle: t("forGyms.sol1s"), icon: "users" },
      { title: t("forGyms.sol2t"), subtitle: t("forGyms.sol2s"), icon: "calendar" },
      { title: t("forGyms.sol3t"), subtitle: t("forGyms.sol3s"), icon: "coach" },
      { title: t("forGyms.sol4t"), subtitle: t("forGyms.sol4s"), icon: "announce" },
      { title: t("forGyms.sol5t"), subtitle: t("forGyms.sol5s"), icon: "pulse" },
      { title: t("forGyms.sol6t"), subtitle: t("forGyms.sol6s"), icon: "eye" },
    ],
    [t]
  );

  const benefits = useMemo(
    () => [
      { title: t("forGyms.ben1t"), description: t("forGyms.ben1d"), icon: "shield" },
      { title: t("forGyms.ben2t"), description: t("forGyms.ben2d"), icon: "bolt" },
      { title: t("forGyms.ben3t"), description: t("forGyms.ben3d"), icon: "chart" },
    ],
    [t]
  );

  const growthStats = useMemo(
    () =>
      GROWTH_STATS_NUMERIC.map((row, i) => ({
        ...row,
        label: t(`forGyms.g${i + 1}l`),
      })),
    [t]
  );

  useEffect(() => {
    if (r) {
      setGrowthCountStarted(true);
      return undefined;
    }
    const el = growthSectionRef.current;
    if (!el) return undefined;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setGrowthCountStarted(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [r]);

  const scrollBlock = {
    initial: { opacity: r ? 1 : 0, y: r ? 0 : 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-9% 0px" },
    transition: { duration: r ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] },
  };

  const staggerWrap = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: r ? 0 : 0.08,
        delayChildren: r ? 0 : 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: r ? 1 : 0, y: r ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: r ? 0 : 0.42, ease: "easeOut" },
    },
  };

  const heroGroup = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: r ? 0 : 0.11,
        delayChildren: r ? 0 : 0.15,
      },
    },
  };

  const heroChild = {
    hidden: { opacity: r ? 1 : 0, y: r ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: r ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardHover = r
    ? {}
    : {
        y: -5,
        transition: { duration: 0.22, ease: "easeOut" },
      };

  return (
    <div className="for-gyms-page">
      <main className="fg-page-main">
        <section className="fg-hero" id="for-gyms">
          <motion.div
            className="fg-hero-img-cover"
            initial={{ opacity: r ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: r ? 0 : 0.9, ease: "easeOut" }}
          >
            <img
              className="fg-hero-bg-img"
              src={forGymsHeroImage}
              alt=""
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          </motion.div>
          <div className="fg-hero-gradient" aria-hidden />
          <div className="fg-hero-shell">
            <motion.div
              className="fg-hero-overlay"
              variants={heroGroup}
              initial="hidden"
              animate="show"
            >
              <motion.h1 variants={heroChild}>
                {t("forGyms.hero1")}
                <br />
                <span>{t("forGyms.hero2")}</span>
              </motion.h1>
              <motion.p variants={heroChild}>{t("forGyms.heroSub")}</motion.p>
              <motion.button
                type="button"
                variants={heroChild}
                whileHover={r ? undefined : { scale: 1.03 }}
                whileTap={r ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {t("forGyms.becomePartner")}
              </motion.button>
            </motion.div>
          </div>
        </section>

        <div className="for-wrap">
          <motion.section className="fg-section fg-challenges-shell" {...scrollBlock}>
            <h2>{t("forGyms.challengesH2")}</h2>
            <motion.div
              className="fg-grid fg-grid-3 fg-challenges-grid"
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-7% 0px" }}
            >
              {challenges.map((item) => (
                <motion.article
                  key={item.title}
                  className="fg-card fg-challenge-card"
                  variants={fadeUp}
                  whileHover={cardHover}
                >
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          <motion.section className="fg-section fg-solutions-section" {...scrollBlock}>
            <h2>{t("forGyms.solutionsH2")}</h2>
            <motion.div
              className="fg-grid fg-grid-2 fg-solutions-grid"
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-7% 0px" }}
            >
              {solutions.map((item) => (
                <motion.article
                  key={item.title}
                  className="fg-card fg-solution-card"
                  variants={fadeUp}
                  whileHover={cardHover}
                >
                  <motion.span
                    className={`fg-solution-icon fg-solution-icon--${item.icon}`}
                    aria-hidden="true"
                    whileHover={r ? undefined : { scale: 1.08, rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 0.35 }}
                  />
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>
        </div>

        <motion.section
          className="fg-benefits-full"
          aria-labelledby="fg-benefits-heading"
          {...scrollBlock}
        >
          <div className="fg-benefits-inner">
            <h2 id="fg-benefits-heading" className="fg-benefits-title">
              {t("forGyms.benefitsH2")}
            </h2>
            <motion.div
              className="fg-benefits-grid"
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-7% 0px" }}
            >
              {benefits.map((item) => (
                <motion.article
                  key={item.title}
                  className="fg-benefit-card"
                  variants={fadeUp}
                  whileHover={cardHover}
                >
                  <motion.div
                    className="fg-benefit-icon-wrap"
                    whileHover={r ? undefined : { scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    <OperationalBenefitIcon type={item.icon} />
                  </motion.div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <div className="for-wrap">
          <motion.section
            ref={growthSectionRef}
            className="fg-growth-section"
            id="revenue-growth"
            aria-labelledby="fg-growth-heading"
            {...scrollBlock}
          >
            <h2 id="fg-growth-heading">{t("forGyms.growthH2")}</h2>
            <motion.div
              className="fg-grid fg-grid-4 fg-growth-grid"
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-7% 0px" }}
            >
              {growthStats.map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="fg-growth-card"
                  role="article"
                  variants={fadeUp}
                  whileHover={cardHover}
                >
                  <motion.div
                    className="fg-growth-icon-wrap"
                    animate={
                      r
                        ? undefined
                        : {
                            y: [0, -3, 0],
                          }
                    }
                    transition={{
                      duration: 2.8 + idx * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.12,
                    }}
                  >
                    <GrowthStatIcon type={item.icon} />
                  </motion.div>
                  <div className="fg-growth-value">
                    <GrowthStatCounter
                      target={item.target}
                      duration={item.duration}
                      delayMs={item.delayMs}
                      started={growthCountStarted}
                      reduceMotion={r}
                    />
                  </div>
                  <p className="fg-growth-label">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section className="fg-cta" {...scrollBlock}>
            <h2>{t("forGyms.ctaH2")}</h2>
            <p>
              {t("forGyms.ctaP1")}
              <br />
              {t("forGyms.ctaP2")}
            </p>
            <motion.button
              type="button"
              className="fg-cta-btn"
              whileHover={r ? undefined : { scale: 1.03, y: -2 }}
              whileTap={r ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="fg-cta-icon-wrap"
                aria-hidden="true"
                animate={r ? undefined : { x: [0, 3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </motion.span>
              {t("forGyms.ctaBtn")}
            </motion.button>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

export default ForGymsPage;
