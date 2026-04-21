import { Link, useParams } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./FitupLanding.css";

const FEATURE_IDS = ["adaptive-plans", "coach-dashboard", "faster-decisions"];

function FeatureDetail() {
  const { featureId } = useParams();
  const { t } = useI18n();
  const title = t(`features.${featureId}.title`);
  const description = t(`features.${featureId}.description`);
  const valid = FEATURE_IDS.includes(featureId);

  if (!valid) {
    return (
      <main className="fitup-page fitup-center">
        <h2>{t("common.featureNotFound")}</h2>
        <Link to="/" className="fitup-btn">
          {t("common.backHome")}
        </Link>
      </main>
    );
  }

  return (
    <main className="fitup-page fitup-center">
      <article className="fitup-detail-card">
        <p className="fitup-detail-label">{t("common.featureLabel")}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <Link to="/" className="fitup-btn">
          {t("common.backHome")}
        </Link>
      </article>
    </main>
  );
}

export default FeatureDetail;
