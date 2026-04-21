import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";
import "./AppExperiencePage.css";

function AppExperiencePage() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const r = Boolean(reduceMotion);
  const learnMore = t("common.learnMore");

  const features = useMemo(
    () => [
      { title: t("appExperience.f1t"), desc: t("appExperience.f1d"), icon: "dashboard" },
      { title: t("appExperience.f2t"), desc: t("appExperience.f2d"), icon: "booking" },
      { title: t("appExperience.f3t"), desc: t("appExperience.f3d"), icon: "progress" },
      { title: t("appExperience.f4t"), desc: t("appExperience.f4d"), icon: "coach" },
      { title: t("appExperience.f5t"), desc: t("appExperience.f5d"), icon: "ar" },
    ],
    [t]
  );

  const middleCards = useMemo(
    () => [
      { title: t("appExperience.mid1"), filled: false },
      { title: t("appExperience.mid2"), filled: true },
      { title: t("appExperience.mid3"), filled: false },
    ],
    [t]
  );

  const rightCards = useMemo(
    () => [
      { title: t("appExperience.right1"), filled: true },
      { title: t("appExperience.right2"), filled: false },
      { title: t("appExperience.right3"), filled: true },
    ],
    [t]
  );

  const coachCards = useMemo(
    () => [
      { num: "01", text: t("appExperience.c1") },
      { num: "02", text: t("appExperience.c2") },
      { num: "03", text: t("appExperience.c3") },
      { num: "04", text: t("appExperience.c4") },
    ],
    [t]
  );

  const journeyItems = useMemo(
    () => [
      {
        title: t("appExperience.j1t"),
        lines: [
          t("appExperience.j1l1"),
          t("appExperience.j1l2"),
          t("appExperience.j1l3"),
          t("appExperience.j1l4"),
          t("appExperience.j1l5"),
        ],
        icon: "calendar",
        iconOnLeft: false,
      },
      {
        title: t("appExperience.j2t"),
        lines: [
          t("appExperience.j2l1"),
          t("appExperience.j2l2"),
          t("appExperience.j2l3"),
          t("appExperience.j2l4"),
          t("appExperience.j2l5"),
        ],
        icon: "bolt",
        iconOnLeft: true,
      },
      {
        title: t("appExperience.j3t"),
        lines: [
          t("appExperience.j3l1"),
          t("appExperience.j3l2"),
          t("appExperience.j3l3"),
          t("appExperience.j3l4"),
          t("appExperience.j3l5"),
          t("appExperience.j3l6"),
        ],
        icon: "users",
        iconOnLeft: false,
      },
    ],
    [t]
  );

  const scrollBlock = {
    initial: { opacity: r ? 1 : 0, y: r ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
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
      transition: { duration: r ? 0 : 0.4, ease: "easeOut" },
    },
  };

  const heroTextGroup = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: r ? 0 : 0.12,
        delayChildren: r ? 0 : 0.25,
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
    <div className="axp-page">
      <section className="axp-hero">
        <motion.div
          className="axp-hero-imgcard"
          initial={{ opacity: r ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: r ? 0 : 0.85, ease: "easeOut" }}
        >
          <div className="axp-hero-overlay" />
        </motion.div>
        <motion.div
          className="axp-hero-phone"
          initial={{ opacity: r ? 1 : 0, x: r ? 0 : 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: r ? 0 : 0.7, delay: r ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="axp-hero-phone-inner"
            initial={{ opacity: r ? 1 : 0, y: r ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: r ? 0 : 0.55, delay: r ? 0 : 0.28, ease: "easeOut" }}
            whileHover={r ? undefined : { y: -6, transition: { duration: 0.35 } }}
          >
            <div className="axp-phone-bar" />
            <motion.div
              className="axp-phone-icon"
              animate={r ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="#ff6b46" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <circle cx="12" cy="18" r="1" fill="#ff6b46" />
              </svg>
            </motion.div>
            <div className="axp-phone-bar" />
          </motion.div>
        </motion.div>
        <motion.div
          className="axp-hero-text"
          variants={heroTextGroup}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={heroChild}>
            {t("appExperience.heroH1a")}
            <br />
            <span className="axp-hero-accent">{t("appExperience.heroAccent")}</span>
          </motion.h1>
          <motion.p className="axp-hero-sub" variants={heroChild}>
            {t("appExperience.heroSubLine1")}
            <br />
            {t("appExperience.heroSubLine2")}
          </motion.p>
          <motion.button
            type="button"
            className="axp-hero-btn"
            variants={heroChild}
            whileHover={r ? undefined : { scale: 1.03 }}
            whileTap={r ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {t("appExperience.downloadApp")}
          </motion.button>
        </motion.div>
      </section>

      <main className="axp-wrap">

        <motion.section className="axp-features" {...scrollBlock}>
          <div className="axp-features-top">
            <motion.article
              className="axp-fcard"
              initial={{ opacity: r ? 1 : 0, y: r ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: r ? 0 : 0.48 }}
              whileHover={cardHover}
            >
              <motion.div
                className="axp-fcard-icon"
                whileHover={r ? undefined : { scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <FeatureIcon type="dashboard" />
              </motion.div>
              <h3>{features[0].title}</h3>
              <p>{features[0].desc}</p>
              <motion.span
                className="axp-fcard-link"
                whileHover={r ? undefined : { x: 4, color: "#ff8a6a" }}
                transition={{ duration: 0.2 }}
              >
                {learnMore}
              </motion.span>
            </motion.article>
          </div>
          <motion.div
            className="axp-features-bottom"
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-7% 0px" }}
          >
            {features.slice(1).map((f) => (
              <motion.article
                key={f.title}
                className="axp-fcard"
                variants={fadeUp}
                whileHover={cardHover}
              >
                <motion.div
                  className="axp-fcard-icon"
                  whileHover={r ? undefined : { scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <FeatureIcon type={f.icon} />
                </motion.div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <motion.span
                  className="axp-fcard-link"
                  whileHover={r ? undefined : { x: 4, color: "#ff8a6a" }}
                  transition={{ duration: 0.2 }}
                >
                  {learnMore}
                </motion.span>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="axp-progress" {...scrollBlock}>
          <h2>{t("appExperience.progH2")}</h2>
          <p className="axp-progress-sub">{t("appExperience.progSub")}</p>
          <div className="axp-progress-layout">
            <motion.div
              className="axp-progress-phone"
              initial={{ opacity: r ? 1 : 0, x: r ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: r ? 0 : 0.55, ease: "easeOut" }}
            >
              <div className="axp-pmock">
                <div className="axp-pmock-top">
                  <span>≡</span>
                  <strong>{t("appExperience.mockBrand")}</strong>
                  <span className="axp-pmock-avatar" />
                </div>
                <div className="axp-pmock-activity">
                  <span className="axp-pmock-label">{t("appExperience.mockActivity")}</span>
                  <div className="axp-pmock-stat">
                    <span className="axp-pmock-pct">84%</span>
                    <span className="axp-pmock-change">+12%</span>
                  </div>
                  <div className="axp-pmock-bar"><div className="axp-pmock-bar-fill" /></div>
                </div>
                <div className="axp-pmock-actions">
                  <div className="axp-pmock-action">
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#ff6b46" strokeWidth={1.5}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <span>{t("appExperience.mockBookings")}</span>
                  </div>
                  <div className="axp-pmock-action axp-pmock-action--blue">
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#5b8def" strokeWidth={1.5}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <span>{t("appExperience.mockChat")}</span>
                  </div>
                </div>
                <div className="axp-pmock-class">
                  <div className="axp-pmock-class-top">
                    <span>{t("appExperience.mockUpcoming")}</span>
                    <span className="axp-pmock-time">{t("appExperience.mockTime")}</span>
                  </div>
                  <div className="axp-pmock-class-row">
                    <div className="axp-pmock-class-avatar" />
                    <div>
                      <strong>{t("appExperience.mockClass")}</strong>
                      <span className="axp-pmock-coach">{t("appExperience.mockCoach")}</span>
                    </div>
                  </div>
                </div>
                <div className="axp-pmock-nav">
                  <span className="axp-pmock-navIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 10.5 12 3l9 7.5" />
                      <path d="M5 10v10h14V10" />
                    </svg>
                  </span>
                  <span className="axp-pmock-navIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 17 8 12 13 16 21 8" />
                      <circle cx="8" cy="12" r="1.2" />
                      <circle cx="13" cy="16" r="1.2" />
                      <circle cx="21" cy="8" r="1.2" />
                    </svg>
                  </span>
                  <span className="axp-pmock-navIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                      <path d="M21 3v6h-6" />
                    </svg>
                  </span>
                  <span className="axp-pmock-navIcon axp-pmock-navIcon--active" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="3.2" />
                      <path d="M20 8v6" />
                      <path d="M23 11h-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="axp-progress-col"
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8% 0px" }}
            >
              {middleCards.map((c) => (
                <motion.div
                  key={c.title}
                  className={`axp-prog-card ${c.filled ? "axp-prog-card--filled" : ""}`}
                  variants={fadeUp}
                  whileHover={cardHover}
                >
                  <span>{c.title}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="axp-progress-col"
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8% 0px" }}
            >
              {rightCards.map((c) => (
                <motion.div
                  key={c.title}
                  className={`axp-prog-card ${c.filled ? "axp-prog-card--filled" : ""}`}
                  variants={fadeUp}
                  whileHover={cardHover}
                >
                  <span>{c.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.p
            className="axp-progress-quote"
            initial={{ opacity: r ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: r ? 0 : 0.45, delay: r ? 0 : 0.1 }}
          >
            {t("appExperience.progQuote")}
          </motion.p>
          <motion.div
            className="axp-progress-line"
            initial={{ scaleX: r ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: r ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left center" }}
          />
        </motion.section>

        <motion.section className="axp-journey" {...scrollBlock}>
          <h2>{t("appExperience.journeyH2")}</h2>
          <p className="axp-journey-subtitle">{t("appExperience.journeySub")}</p>
          <div className="axp-journey-line" aria-hidden="true" />

          {journeyItems.map((item, jIdx) => {
            const badgeOnLeft = item.iconOnLeft;
            const badge = (
              <motion.div
                className="axp-journey-badge"
                initial={{ opacity: r ? 1 : 0, scale: r ? 1 : 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: r ? 0 : 0.45, delay: r ? 0 : jIdx * 0.06 }}
                whileHover={r ? undefined : { scale: 1.04 }}
              >
                <JourneyIcon type={item.icon} />
              </motion.div>
            );
            const card = (
              <motion.div
                className="axp-journey-card"
                role="article"
                initial={{ opacity: r ? 1 : 0, y: r ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: r ? 0 : 0.48, delay: r ? 0 : jIdx * 0.06 }}
                whileHover={cardHover}
              >
                <h3>{item.title}</h3>
                <ul className="axp-journey-list">
                  {item.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </motion.div>
            );

            return (
              <article key={item.title} className="axp-journey-row">
                <div className="axp-journey-col axp-journey-col--left">
                  {badgeOnLeft ? badge : card}
                </div>
                <div className="axp-journey-col axp-journey-col--right">
                  {badgeOnLeft ? card : badge}
                </div>
              </article>
            );
          })}
        </motion.section>

        <motion.section className="axp-coach" {...scrollBlock}>
          <h2>{t("appExperience.coachH2")}</h2>
          <p className="axp-coach-sub">{t("appExperience.coachSub")}</p>
          <motion.div
            className="axp-coach-grid"
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8% 0px" }}
          >
            {coachCards.map((item) => (
              <motion.article
                key={item.num}
                className="axp-coach-card"
                variants={fadeUp}
                whileHover={cardHover}
              >
                <span className="axp-coach-dot" aria-hidden="true" />
                <div className="axp-coach-card-box">
                  <div className="axp-coach-num">{item.num}</div>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <motion.p
            className="axp-coach-foot"
            initial={{ opacity: r ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: r ? 0 : 0.4 }}
          >
            {t("appExperience.coachFoot")}
          </motion.p>
        </motion.section>

        <motion.section className="axp-ar" {...scrollBlock}>
          <div className="axp-ar-inner">
            <motion.div
              className="axp-ar-icon"
              aria-hidden="true"
              animate={r ? undefined : { y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" width={46} height={46} fill="none" stroke="#ff6b46" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3H6a3 3 0 0 0-3 3v3" />
                <path d="M15 3h3a3 3 0 0 1 3 3v3" />
                <path d="M9 21H6a3 3 0 0 1-3-3v-3" />
                <path d="M15 21h3a3 3 0 0 0 3-3v-3" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </motion.div>
            <h2>{t("appExperience.arH2")}</h2>
            <p>{t("appExperience.arP")}</p>
            <div className="axp-ar-actions">
              <motion.button
                type="button"
                className="axp-ar-btn axp-ar-btn--primary"
                whileHover={r ? undefined : { scale: 1.03, y: -2 }}
                whileTap={r ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {t("appExperience.arBtn1")}
              </motion.button>
              <motion.button
                type="button"
                className="axp-ar-btn axp-ar-btn--secondary"
                whileHover={r ? undefined : { scale: 1.03, y: -2 }}
                whileTap={r ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {t("appExperience.arBtn2")}
              </motion.button>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}

function FeatureIcon({ type }) {
  const c = { fill: "none", stroke: "#ff6b46", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "dashboard") return <svg viewBox="0 0 24 24" width={22} height={22}><rect x="3" y="3" width="7" height="9" rx="1" {...c} /><rect x="14" y="3" width="7" height="5" rx="1" {...c} /><rect x="14" y="12" width="7" height="9" rx="1" {...c} /><rect x="3" y="16" width="7" height="5" rx="1" {...c} /></svg>;
  if (type === "booking") return <svg viewBox="0 0 24 24" width={22} height={22}><rect x="3" y="4" width="18" height="18" rx="2" {...c} /><line x1="16" y1="2" x2="16" y2="6" {...c} /><line x1="8" y1="2" x2="8" y2="6" {...c} /><line x1="3" y1="10" x2="21" y2="10" {...c} /></svg>;
  if (type === "progress") return <svg viewBox="0 0 24 24" width={22} height={22}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" {...c} /></svg>;
  if (type === "coach") return <svg viewBox="0 0 24 24" width={22} height={22}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" {...c} /><circle cx="12" cy="7" r="4" {...c} /></svg>;
  if (type === "ar") return <svg viewBox="0 0 24 24" width={22} height={22}><path d="M2 8V6a2 2 0 0 1 2-2h2" {...c} /><path d="M18 4h2a2 2 0 0 1 2 2v2" {...c} /><path d="M22 16v2a2 2 0 0 1-2 2h-2" {...c} /><path d="M6 20H4a2 2 0 0 1-2-2v-2" {...c} /><circle cx="12" cy="12" r="3" {...c} /></svg>;
  return <svg viewBox="0 0 24 24" width={22} height={22}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" {...c} /><path d="M13.73 21a2 2 0 0 1-3.46 0" {...c} /></svg>;
}

function JourneyIcon({ type }) {
  const c = { fill: "none", stroke: "#ffffff", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" width={42} height={42} aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="3" {...c} />
        <line x1="16" y1="2" x2="16" y2="6" {...c} />
        <line x1="8" y1="2" x2="8" y2="6" {...c} />
        <line x1="3" y1="10" x2="21" y2="10" {...c} />
      </svg>
    );
  }
  if (type === "bolt") {
    return (
      <svg viewBox="0 0 24 24" width={42} height={42} aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...c} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={42} height={42} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" {...c} />
      <circle cx="9" cy="7" r="4" {...c} />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" {...c} />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" {...c} />
    </svg>
  );
}

export default AppExperiencePage;
