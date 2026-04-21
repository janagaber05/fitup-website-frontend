import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";
import performanceImage from "../assets/performance.jpg";
import safetyImage from "../assets/safety.jpg";
import coachImage from "../assets/coach.jpg";
import "./SolutionDetailPage.css";

const SOLUTION_IDS = ["smart-management", "booking-system", "announcements", "progress-tracking", "ar-support", "real-time-analytics"];
const HERO_IMAGES = [performanceImage, safetyImage, coachImage, performanceImage, safetyImage, coachImage];

const ICONS = {
  "smart-management": "⚙",
  "booking-system": "📅",
  announcements: "⚡",
  "progress-tracking": "📈",
  "ar-support": "◉",
  "real-time-analytics": "⌁",
};

const SECTION_LABELS = ["Insights", "Execution", "Impact"];

function SolutionDetailPage() {
  const { cardId } = useParams();
  const { t } = useI18n();

  const idx = SOLUTION_IDS.indexOf(cardId);
  if (idx === -1) {
    return (
      <main className="solution-detail fitup-wrap">
        <article className="solution-detail-card">
          <h1>{t("common.featureNotFound")}</h1>
          <Link to="/" className="fitup-btn">{t("landing.solutionsBack")}</Link>
        </article>
      </main>
    );
  }

  const n = idx + 1;
  const heroImage = HERO_IMAGES[idx % HERO_IMAGES.length];
  const capabilityKeys = [
    `landing.solution${n}Cap1`,
    `landing.solution${n}Cap2`,
    `landing.solution${n}Cap3`,
  ];
  const capabilityLabels = [
    t("landing.solutionSectionInsights"),
    t("landing.solutionSectionExecution"),
    t("landing.solutionSectionImpact"),
  ];

  return (
    <main className="solution-detail fitup-wrap">
      <motion.article
        className="solution-detail-card"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="solution-hero">
          <motion.div
            className="solution-hero-media"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            style={{ backgroundImage: `linear-gradient(130deg, rgba(12,14,20,0.35) 0%, rgba(12,14,20,0.65) 100%), url(${heroImage})` }}
          >
            <motion.span
              className="solution-hero-icon"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {ICONS[cardId]}
            </motion.span>
          </motion.div>
          <div className="solution-hero-copy">
            <p className="solution-pill">{t("landing.solutionPill")}</p>
            <h1>{t(`landing.whyCard${n}Title`)}</h1>
            <p className="solution-body">{t(`landing.solution${n}Body`)}</p>
          </div>
        </section>

        <section className="solution-capabilities">
          <h2>{t("landing.solutionCapabilitiesTitle")}</h2>
          <div className="solution-cap-grid">
            {capabilityKeys.map((key, i) => (
              <motion.article
                key={key}
                className="solution-cap-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <span className="solution-cap-top">{capabilityLabels[i] || SECTION_LABELS[i]}</span>
                <p>{t(key)}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="solution-outcomes">
          <h2>{t("landing.solutionOutcomeTitle")}</h2>
          <ul>
            <li>{t("landing.solutionOutcome1")}</li>
            <li>{t("landing.solutionOutcome2")}</li>
            <li>{t("landing.solutionOutcome3")}</li>
          </ul>

          <div className="solution-actions">
            <Link to="/partner" className="fitup-btn solution-primary">{t("landing.solutionCta")}</Link>
            <Link to="/" className="solution-back">{t("landing.solutionsBack")}</Link>
          </div>
        </section>
      </motion.article>
    </main>
  );
}

export default SolutionDetailPage;
