import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./JoinUsPage.css";

const JOIN_SCROLL_IDS = [
  "join-booking",
  "join-user-view",
  "join-control",
  "join-gym-dashboard",
  "join-gym-features",
  "join-automation",
];

function initialJoinRevealed() {
  const all = {
    "join-hero": true,
    "join-booking": true,
    "join-user-view": true,
    "join-control": true,
    "join-gym-dashboard": true,
    "join-gym-features": true,
    "join-automation": true,
  };
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return all;
  }
  return {
    "join-hero": true,
    "join-booking": false,
    "join-user-view": false,
    "join-control": false,
    "join-gym-dashboard": false,
    "join-gym-features": false,
    "join-automation": false,
  };
}

function BookingIcon({ stepId }) {
  if (stepId === 1) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 1 1 13 0c0 4.6-6.5 10-6.5 10z" />
        <circle cx="12" cy="11" r="2.2" />
      </svg>
    );
  }
  if (stepId === 2) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8l3-3 5 5-3 3" />
        <path d="M5 11l3-3 5 5-3 3" />
        <path d="M11 19l3-3 5 5-3 3" transform="translate(-2 -6)" />
      </svg>
    );
  }
  if (stepId === 3) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v4.5l3 2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.2l2.3 2.3 5-5.1" />
    </svg>
  );
}

function GymFeatureIcon({ type }) {
  if (type === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="6" height="6" rx="1.2" />
        <rect x="14" y="4" width="6" height="6" rx="1.2" />
        <rect x="4" y="14" width="6" height="6" rx="1.2" />
        <rect x="14" y="14" width="6" height="6" rx="1.2" />
      </svg>
    );
  }

  if (type === "progress") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 15l4-4 3 3 7-7" />
        <path d="M14 7h5v5" />
      </svg>
    );
  }

  if (type === "smart") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8.5" r="2.5" />
        <path d="M4.5 16.5c.5-2.2 2.3-3.6 4.5-3.6s4 1.4 4.5 3.6" />
        <path d="M16 7h4" />
        <path d="M18 5v4" />
      </svg>
    );
  }

  if (type === "eye") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 14a2 2 0 0 1-2 2H7l-4 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function JoinHeroTypewriter({ text }) {
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
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
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
    const ms = 28;
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
    <p ref={containerRef} className="join-hero-typewriter">
      <span className="join-typewriter-visual" aria-hidden="true">
        {displayed}
        {!done && <span className="join-typewriter-cursor" />}
      </span>
      <span className="join-sr-only">{text}</span>
    </p>
  );
}

function JoinUsPage() {
  const { t } = useI18n();
  const [revealed, setRevealed] = useState(initialJoinRevealed);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const observers = [];
    for (const id of JOIN_SCROLL_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const ob = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          setRevealed((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          ob.unobserve(el);
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      ob.observe(el);
      observers.push(ob);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const vis = (id) => (revealed[id] ? " is-visible" : "");

  const bookingSteps = useMemo(
    () => [
      { id: 1, title: t("join.b1t"), text: t("join.b1x") },
      { id: 2, title: t("join.b2t"), text: t("join.b2x") },
      { id: 3, title: t("join.b3t"), text: t("join.b3x") },
      { id: 4, title: t("join.b4t"), text: t("join.b4x") },
    ],
    [t]
  );

  const gymFeatureColumns = useMemo(
    () => [
      [
        { id: "left-1", icon: "dashboard", title: t("join.gf1t"), note: t("join.gf1n") },
        { id: "left-2", icon: "smart", title: t("join.gf2t"), note: t("join.gf2n") },
        { id: "left-3", icon: "chat", title: t("join.gf3t"), note: t("join.gf3n") },
      ],
      [
        { id: "right-1", icon: "progress", title: t("join.gf4t"), note: t("join.gf4n") },
        { id: "right-2", icon: "eye", title: t("join.gf5t"), note: t("join.gf5n") },
      ],
    ],
    [t]
  );

  const slotTimes = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];
  const heroTypeText = useMemo(() => t("join.heroP"), [t]);

  return (
    <div className="join-page">
      <section id="join-hero" className={`join-hero${vis("join-hero")}`}>
        <div className="join-hero-symbol" aria-hidden="true">
          <span className="join-hero-orbit join-hero-orbit--a" />
          <span className="join-hero-orbit join-hero-orbit--b" />
          <span className="join-hero-hub" />
        </div>
        <div className="join-hero-tags">
          <span className="join-hero-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="8" cy="8" r="3" />
              <circle cx="16.5" cy="9.5" r="2.5" />
              <path d="M3.5 17c0-2.4 2-4.2 4.5-4.2S12.5 14.6 12.5 17" />
              <path d="M13.2 17c.2-1.6 1.5-2.8 3.2-2.8 1.8 0 3.1 1.2 3.3 2.8" />
            </svg>
            {t("join.tagClient")}
          </span>
          <span className="join-hero-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
              <path d="M8 3.5v4" />
              <path d="M16 3.5v4" />
              <path d="M4 10h16" />
            </svg>
            {t("join.tagGym")}
          </span>
        </div>
        <h1>
          <span>{t("join.hero1")}</span>
          <span className="join-hero-accent">{t("join.hero2")}</span>
        </h1>
        <JoinHeroTypewriter text={heroTypeText} />
        <div className="join-hero-actions">
          <button type="button" className="join-btn join-btn--primary">{t("join.heroPrimary")}</button>
          <Link to="/partner" className="join-btn join-btn--ghost">
            {t("join.heroPartner")}
          </Link>
        </div>
      </section>

      <section id="join-booking" className={`join-booking${vis("join-booking")}`}>
        <h2>{t("join.bookH2")}</h2>
        <p className="join-booking-sub">{t("join.bookSub")}</p>
        <div className="join-booking-grid">
          {bookingSteps.map((item) => (
            <article key={item.id} className="join-booking-card">
              <span className="join-booking-num">{item.id}</span>
              <span className="join-booking-icon" aria-hidden="true">
                <BookingIcon stepId={item.id} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="join-user-view" className={`join-user-view${vis("join-user-view")}`}>
        <h2>{t("join.uvH2")}</h2>
        <p className="join-uv-sub">{t("join.uvSub")}</p>
        <div className="join-phone-wrap">
          <article className="join-phone">
            <span className="join-phone-label">{t("join.phoneLabel")}</span>
            <h3>{t("join.phoneTitle")}</h3>
            <p className="join-phone-coach">{t("join.phoneCoach")}</p>

            <div className="join-phone-cal">
              <div className="join-phone-cal-head">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              {[...Array(5)].map((_, row) => (
                <div key={row} className="join-phone-cal-row">
                  {[...Array(7)].map((_, col) => {
                    const day = row * 7 + col + 1;
                    return (
                      <span
                        key={col}
                        className={`join-phone-day${day === 16 ? " is-active" : ""}`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <p className="join-phone-slots-title">{t("join.slotsTitle")}</p>
            <div className="join-phone-slots">
              {slotTimes.map((time) => (
                <span key={time} className={`join-phone-slot${time === "10:30 AM" ? " is-active" : ""}`}>{time}</span>
              ))}
            </div>

            <div className="join-phone-price">
              <span>{t("join.sessionPrice")}</span>
              <strong>$45</strong>
            </div>

            <button type="button" className="join-phone-confirm">{t("join.confirm")}</button>
          </article>
        </div>
        <div className="join-pills">
          <span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {t("join.pillLive")}
          </span>
          <span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {t("join.pillInstant")}
          </span>
          <span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
            {t("join.pillReschedule")}
          </span>
        </div>

        <div className="join-stats-bar">
          <div className="join-stat">
            <strong>0s</strong>
            <span>{t("join.statWait")}</span>
          </div>
          <div className="join-stats-divider" />
          <div className="join-stat">
            <strong>100%</strong>
            <span>{t("join.statAcc")}</span>
          </div>
        </div>
      </section>

      <section id="join-control" className={`join-control${vis("join-control")}`}>
        <div className="join-control-card">
          <svg className="join-control-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l1.09 3.26L16 6l-2.18 1.74L14.54 11 12 9.27 9.46 11l.63-3.26L8 6l2.91-.74z" />
            <path d="M5 18l.7-2.11L8 15l-1.73-1.38L6.9 11 5 12.45 3.1 11l.63 2.62L2 15l2.3.89z" />
            <path d="M19 18l.7-2.11L22 15l-1.73-1.38L20.9 11 19 12.45 17.1 11l.63 2.62L16 15l2.3.89z" />
          </svg>
          <h2>{t("join.controlH2")}</h2>
          <p className="join-control-sub">{t("join.controlSub")}</p>
          <div className="join-control-pills">
            <span>{t("join.cp1")}</span>
            <span>{t("join.cp2")}</span>
            <span>{t("join.cp3")}</span>
          </div>
        </div>
      </section>

      <section id="join-gym-dashboard" className={`join-gym-dashboard${vis("join-gym-dashboard")}`}>
        <div className="join-gym-dashboard-shell">
          <header className="join-gym-dashboard-header">
            <div>
              <h2>{t("join.dashH2")}</h2>
              <p>{t("join.dashSub")}</p>
            </div>
            <div className="join-gym-dashboard-live">
              <span className="join-gym-dashboard-live-dot" aria-hidden />
              {t("join.live")}
            </div>
          </header>

          <div className="join-gym-dashboard-grid">
            <article className="join-gym-dashboard-card">
              <p className="join-gym-dashboard-label">{t("join.lblSchedule")}</p>
              <div className="join-gym-dashboard-value">42</div>
              <p className="join-gym-dashboard-foot">{t("join.footBookings")}</p>
            </article>
            <article className="join-gym-dashboard-card">
              <p className="join-gym-dashboard-label">{t("join.lblCapacity")}</p>
              <div className="join-gym-dashboard-value">78%</div>
              <p className="join-gym-dashboard-foot">{t("join.footCap")}</p>
            </article>
            <article className="join-gym-dashboard-card">
              <p className="join-gym-dashboard-label">{t("join.lblCoaches")}</p>
              <div className="join-gym-dashboard-value">8/12</div>
              <p className="join-gym-dashboard-foot">{t("join.footCoaches")}</p>
            </article>
          </div>

          <div className="join-gym-dashboard-activity">
            <h3>{t("join.recentH3")}</h3>
            <ul>
              <li>
                <span className="join-gym-dashboard-dot join-gym-dashboard-dot--green" aria-hidden />
                <span className="join-gym-dashboard-activity-text">{t("join.act1")}</span>
                <span className="join-gym-dashboard-activity-time">{t("join.t2min")}</span>
              </li>
              <li>
                <span className="join-gym-dashboard-dot join-gym-dashboard-dot--green" aria-hidden />
                <span className="join-gym-dashboard-activity-text">{t("join.act2")}</span>
                <span className="join-gym-dashboard-activity-time">{t("join.t5min")}</span>
              </li>
              <li>
                <span className="join-gym-dashboard-dot join-gym-dashboard-dot--orange" aria-hidden />
                <span className="join-gym-dashboard-activity-text">{t("join.act3")}</span>
                <span className="join-gym-dashboard-activity-time">{t("join.t12min")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="join-gym-features" className={`join-gym-features${vis("join-gym-features")}`}>
        <div className="join-gym-features-grid">
          {gymFeatureColumns.map((column, colIndex) => (
            <div key={colIndex} className="join-gym-features-col">
              {column.map((item) => (
                <article key={item.id} className="join-gym-feature-card">
                  <span className="join-gym-feature-icon">
                    <GymFeatureIcon type={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="join-automation" className={`join-automation${vis("join-automation")}`}>
        <div className="join-automation-shell">
          <h2>{t("join.autoH2")}</h2>
          <p className="join-automation-sub">{t("join.autoSub")}</p>

          <div className="join-automation-flow">
            <div className="join-automation-step step-red">
              <span className="join-automation-circle">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="3" />
                  <path d="M6.5 18c.7-2.7 2.8-4.3 5.5-4.3s4.8 1.6 5.5 4.3" />
                </svg>
              </span>
              <span className="join-automation-chip">{t("join.flow1")}</span>
            </div>
            <span className="join-automation-arrow">→</span>
            <div className="join-automation-step step-green">
              <span className="join-automation-circle">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="6.5" rx="6.2" ry="2.8" />
                  <path d="M5.8 6.5v6.8c0 1.5 2.8 2.8 6.2 2.8s6.2-1.3 6.2-2.8V6.5" />
                  <path d="M5.8 10c0 1.5 2.8 2.8 6.2 2.8s6.2-1.3 6.2-2.8" />
                </svg>
              </span>
              <span className="join-automation-chip">{t("join.flow2")}</span>
            </div>
            <span className="join-automation-arrow">→</span>
            <div className="join-automation-step step-blue">
              <span className="join-automation-circle">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8.5" r="2.5" />
                  <path d="M4.5 16.5c.5-2.2 2.3-3.6 4.5-3.6s4 1.4 4.5 3.6" />
                  <path d="M16 7h4" />
                  <path d="M18 5v4" />
                </svg>
              </span>
              <span className="join-automation-chip">{t("join.flow3")}</span>
            </div>
            <span className="join-automation-arrow">→</span>
            <div className="join-automation-step step-purple">
              <span className="join-automation-circle">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="5" width="16" height="14" rx="2.3" />
                  <path d="M8 3.5v3" />
                  <path d="M16 3.5v3" />
                  <path d="M4 10h16" />
                </svg>
              </span>
              <span className="join-automation-chip">{t("join.flow4")}</span>
            </div>
            <span className="join-automation-arrow">→</span>
            <div className="join-automation-step step-red">
              <span className="join-automation-circle">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.2 18.2a3.3 3.3 0 0 0 5.6 0" />
                  <path d="M6.8 14.5h10.4l-1.4-1.8V10a3.8 3.8 0 1 0-7.6 0v2.7z" />
                </svg>
              </span>
              <span className="join-automation-chip">{t("join.flow5")}</span>
            </div>
          </div>

          <div className="join-automation-metrics">
            <article>
              <strong className="metric-red">{t("join.m1v")}</strong>
              <p>{t("join.m1l")}</p>
            </article>
            <article>
              <strong className="metric-green">{t("join.m2v")}</strong>
              <p>{t("join.m2l")}</p>
            </article>
            <article>
              <strong className="metric-blue">{t("join.m3v")}</strong>
              <p>{t("join.m3l")}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JoinUsPage;
