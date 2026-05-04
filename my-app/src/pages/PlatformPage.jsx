import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";
import platformHeroVideo from "../assets/platform/motion2Fast_Create_a_cinematic_futuristic_fitness_app_advertis_0.mp4";
import recThumbCoach from "../assets/coach.jpg";
import recThumbCoachInsights from "../assets/ar/coach aprovment.png";
import recThumbRecovery from "../assets/safety.jpg";
import recThumbPerformance from "../assets/performance.jpg";
import "./PlatformPage.css";

const gymCatalog = [
  { id: 1, name: "FITUP Downtown", location: "Cairo", price: "Premium", ladiesOnly: false },
  { id: 2, name: "FITUP Ladies Center", location: "Alexandria", price: "Standard", ladiesOnly: true },
  { id: 3, name: "Power House", location: "Giza", price: "Budget", ladiesOnly: false },
  { id: 4, name: "Core Motion", location: "Cairo", price: "Standard", ladiesOnly: false },
  { id: 5, name: "HerFit Arena", location: "Mansoura", price: "Premium", ladiesOnly: true },
  { id: 6, name: "Athlete Hub", location: "New Cairo", price: "Budget", ladiesOnly: false },
];

const recommendedCards = [
  { id: 1, thumbImage: recThumbCoach },
  { id: 2, thumbImage: recThumbCoachInsights },
  { id: 3, thumbImage: recThumbRecovery },
  { id: 4, thumbImage: recThumbPerformance },
];

const newsCards = [
  { id: 1, className: "platform-news-card--1", bgImage: "" },
  { id: 2, className: "platform-news-card--2", bgImage: "" },
  { id: 3, className: "platform-news-card--3", bgImage: "" },
];

function priceTierLabel(t, tier) {
  if (tier === "Budget") return t("platform.priceBudget");
  if (tier === "Standard") return t("platform.priceStandard");
  if (tier === "Premium") return t("platform.pricePremium");
  return tier;
}

function PlatformPage() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const r = Boolean(reduceMotion);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ladiesOnly, setLadiesOnly] = useState(false);

  const locationValues = useMemo(
    () => [...new Set(gymCatalog.map((item) => item.location))],
    []
  );

  const nameValues = useMemo(
    () => [...new Set(gymCatalog.map((item) => item.name))],
    []
  );

  const priceValues = useMemo(() => ["Budget", "Standard", "Premium"], []);

  const filteredGyms = useMemo(() => {
    return gymCatalog.filter((gym) => {
      const matchesSearch =
        searchTerm.trim().length === 0 ||
        gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !locationFilter || gym.location === locationFilter;
      const matchesName = !nameFilter || gym.name === nameFilter;
      const matchesPrice = !priceFilter || gym.price === priceFilter;
      const matchesLadiesOnly = !ladiesOnly || gym.ladiesOnly;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesName &&
        matchesPrice &&
        matchesLadiesOnly
      );
    });
  }, [searchTerm, locationFilter, nameFilter, priceFilter, ladiesOnly]);

  const resultsLabel =
    filteredGyms.length === 1
      ? t("platform.oneGymFound")
      : t("platform.nGymsFound", { n: filteredGyms.length });

  useEffect(() => {
    document.body.classList.add("platform-hero-mode");
    return () => {
      document.body.classList.remove("platform-hero-mode");
    };
  }, []);

  const scrollSection = {
    initial: { opacity: r ? 1 : 0, y: r ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: r ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
  };

  const listStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: r ? 0 : 0.06,
        delayChildren: r ? 0 : 0.05,
      },
    },
  };

  const listItem = {
    hidden: { opacity: r ? 1 : 0, y: r ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: r ? 0 : 0.38, ease: "easeOut" },
    },
  };

  return (
    <div className="platform-page">
      <main className="platform-wrap">
        <section className="platform-hero">
          {/* Opacity-only on a wrapper — never transform the <video> itself (Safari/Chromium often render black). */}
          <motion.div
            className="platform-hero-video-shell"
            initial={{ opacity: r ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: r ? 0 : 0.65, ease: "easeOut" }}
          >
            <video
              className="platform-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={platformHeroVideo} type="video/mp4" />
            </video>
          </motion.div>
          <div className="platform-filter-area">
            <motion.section
              className="platform-filter-area-inner"
              initial={{ opacity: r ? 1 : 0, y: r ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: r ? 0 : 0.5,
                delay: r ? 0 : 0.2,
                ease: "easeOut",
              }}
            >
            <div className="platform-filter-toolbar">
              <button
                type="button"
                className={`platform-ladies-only ${ladiesOnly ? "is-active" : ""}`}
                onClick={() => setLadiesOnly((prev) => !prev)}
                aria-pressed={ladiesOnly}
              >
                {ladiesOnly ? t("platform.ladiesOn") : t("platform.ladiesOff")}
              </button>
            </div>
            <div className="platform-filter-shell">
              <label className="platform-filter platform-filter-search" htmlFor="platform-gym-search">
                <span aria-hidden="true">🔍</span>
                <input
                  id="platform-gym-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t("platform.searchPh")}
                  className="platform-filter-input"
                />
              </label>
              <div className="platform-filter-group">
                <label className="platform-filter">
                  <select
                    value={locationFilter}
                    onChange={(event) => setLocationFilter(event.target.value)}
                    className="platform-filter-select"
                  >
                    <option value="">{t("platform.allLocations")}</option>
                    {locationValues.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="platform-filter">
                  <select
                    value={nameFilter}
                    onChange={(event) => setNameFilter(event.target.value)}
                    className="platform-filter-select"
                  >
                    <option value="">{t("platform.allGyms")}</option>
                    {nameValues.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="platform-filter">
                  <select
                    value={priceFilter}
                    onChange={(event) => setPriceFilter(event.target.value)}
                    className="platform-filter-select"
                  >
                    <option value="">{t("platform.allPrices")}</option>
                    {priceValues.map((tier) => (
                      <option key={tier} value={tier}>
                        {priceTierLabel(t, tier)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            </motion.section>
          </div>
        </section>

        <motion.section className="platform-results" {...scrollSection}>
          <motion.h2
            initial={{ opacity: r ? 1 : 0, y: r ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: r ? 0 : 0.45 }}
          >
            {t("platform.filteredH2")}
          </motion.h2>
          <motion.p
            className="platform-results-count"
            initial={{ opacity: r ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: r ? 0 : 0.4, delay: r ? 0 : 0.05 }}
          >
            {resultsLabel}
          </motion.p>
          {filteredGyms.length === 0 ? (
            <motion.p
              className="platform-no-results"
              initial={{ opacity: r ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: r ? 0 : 0.35 }}
            >
              {t("platform.noResults")}
            </motion.p>
          ) : (
            <div className="platform-results-grid">
              <AnimatePresence mode="popLayout">
                {filteredGyms.map((gym) => (
                  <motion.article
                    key={gym.id}
                    layout={!r}
                    className="platform-result-card"
                    initial={{ opacity: r ? 1 : 0, scale: r ? 1 : 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: r ? 1 : 0.96 }}
                    transition={{ duration: r ? 0 : 0.28, ease: "easeOut" }}
                    whileHover={
                      r
                        ? undefined
                        : { y: -3, transition: { duration: 0.2 } }
                    }
                  >
                    <h3>{gym.name}</h3>
                    <p>{gym.location}</p>
                    <div className="platform-result-meta">
                      <span>{priceTierLabel(t, gym.price)}</span>
                      {gym.ladiesOnly && <span>{t("platform.resultLadies")}</span>}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>

        <motion.section className="platform-news" {...scrollSection}>
          <h2>{t("platform.latestNews")}</h2>
          <motion.div
            className="platform-news-stack"
            variants={listStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-5% 0px" }}
          >
            {newsCards.map((card) => (
              <motion.article
                key={card.id}
                className={`platform-news-card ${card.className}`}
                style={card.bgImage ? { "--news-bg-image": `url(${card.bgImage})` } : undefined}
                variants={listItem}
                whileHover={
                  r
                    ? undefined
                    : { y: -5, transition: { duration: 0.22 } }
                }
              >
                <h3>{t(`platform.news${card.id}Title`)}</h3>
                <p>{t(`platform.news${card.id}Text`)}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="platform-recommended" {...scrollSection}>
          <h2>{t("platform.recommendedH2")}</h2>
          <motion.div
            className="platform-rec-grid"
            variants={listStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-5% 0px" }}
          >
            {recommendedCards.map((card) => (
              <motion.article
                key={card.id}
                className="platform-rec-card"
                variants={listItem}
                whileHover={
                  r
                    ? undefined
                    : { y: -5, transition: { duration: 0.22 } }
                }
              >
                <div className="platform-rec-thumb">
                  {card.thumbImage ? (
                    <img
                      src={card.thumbImage}
                      alt={t(`platform.rec${card.id}Title`)}
                      className="platform-rec-thumb-img"
                    />
                  ) : null}
                </div>
                <h3>{t(`platform.rec${card.id}Title`)}</h3>
                <p>{t(`platform.rec${card.id}Excerpt`)}</p>
                <button type="button" className="platform-rec-btn">{t("platform.readMore")}</button>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="platform-coming"
          {...scrollSection}
        >
          <motion.span
            className="platform-coming-icon"
            aria-hidden="true"
            animate={
              r
                ? undefined
                : { y: [0, -6, 0], opacity: [0.85, 1, 0.85] }
            }
            transition={
              r
                ? undefined
                : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
            }
          >
            ✧
          </motion.span>
          <h3>{t("platform.comingH3")}</h3>
          <p>{t("platform.comingP")}</p>
          <motion.button
            type="button"
            whileHover={r ? undefined : { scale: 1.03 }}
            whileTap={r ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {t("platform.downloadApp")}
          </motion.button>
        </motion.section>
      </main>
    </div>
  );
}

export default PlatformPage;
