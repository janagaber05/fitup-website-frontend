import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./FitupFooter.css";

function FitupFooter() {
  const { t } = useI18n();

  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-left">
            <h3 className="site-footer-logo">FITUP</h3>
            <p className="site-footer-tagline">{t("footer.tagline")}</p>
            <p className="site-footer-about">{t("footer.about")}</p>

            <ul className="site-footer-contact">
              <li>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.57-1.05a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92Z" />
                </svg>
                <div>
                  <strong>{t("footer.callTitle")}</strong>
                  <span>+966 55 088 8229</span>
                </div>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <div><strong>{t("footer.location")}</strong></div>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 7L2 7" />
                </svg>
                <div><strong>support@fitup.sa</strong></div>
              </li>
            </ul>
          </div>

          <div className="site-footer-mid">
            <h4>{t("footer.quickLinks")}</h4>
            <ul className="site-footer-links">
              <li><Link to="/">{t("nav.home")}</Link></li>
              <li><Link to="/app-experience">{t("nav.appExperience")}</Link></li>
              <li><Link to="/how-it-works">{t("nav.howItWorks")}</Link></li>
              <li><Link to="/for-gyms">{t("nav.forGyms")}</Link></li>
              <li><Link to="/partner">{t("nav.partnerCta")}</Link></li>
              <li><Link to="/about">{t("nav.about")}</Link></li>
              <li><Link to="/contact">{t("nav.contact")}</Link></li>
              <li><Link to="/privacy-policy">{t("footer.privacyPolicy")}</Link></li>
            </ul>
            <p className="site-footer-terms">
              <span>{t("footer.terms")}</span>
              <Link to="/privacy-policy">{t("footer.privacyPolicy")}</Link>
            </p>
          </div>

          <div className="site-footer-right">
            <h4>{t("footer.newsletter")}</h4>
            <p className="site-footer-copy">{t("footer.newsletterCopy")}</p>
            <div className="site-footer-form">
              <input type="email" placeholder={t("footer.emailPlaceholder")} />
              <button type="button">{t("footer.subscribe")}</button>
            </div>
            <p className="site-footer-safe">{t("footer.safe")}</p>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

export default FitupFooter;
