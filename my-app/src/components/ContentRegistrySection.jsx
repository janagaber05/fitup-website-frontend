import { useI18n } from "../i18n/I18nContext";
import { usePublishedContentRegistry } from "../hooks/usePublishedContentRegistry";
import "./ContentRegistrySection.css";

/**
 * Example: load published content_registry rows for the current site locale.
 * Drop into any page, or remove once you wire data into real sections.
 */
export default function ContentRegistrySection() {
  const { locale } = useI18n();
  const { rows, loading, error } = usePublishedContentRegistry(locale);

  if (!process.env.REACT_APP_SUPABASE_URL) {
    return null;
  }

  return (
    <section className="fitup-crs fitup-wrap" aria-label="CMS preview">
      {loading && <p className="fitup-crs-muted">Loading content…</p>}
      {error && (
        <p className="fitup-crs-error" role="alert">
          {error.message}
        </p>
      )}
      {!loading && !error && rows.length === 0 && (
        <p className="fitup-crs-muted">No published rows for this locale.</p>
      )}
      {!loading && !error && rows.length > 0 && (
        <ul className="fitup-crs-list">
          {rows.map((row) => (
            <li key={row.id} className="fitup-crs-item">
              <span className="fitup-crs-slug">{row.slug}</span>
              {row.title != null && <strong className="fitup-crs-title">{row.title}</strong>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
