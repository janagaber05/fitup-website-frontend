import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabaseClient";

/**
 * Fetches published rows for the marketing site from content_registry.
 *
 * Adjust column names to match your migration (e.g. `006_fitup_control_plane_anon_read.sql`):
 * - Assumes: channel, locale, is_published (boolean) OR change filters below.
 */
export function usePublishedContentRegistry(locale) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      setError(new Error("Supabase env missing: set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY"));
      setRows([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      const { data, error: qError } = await supabase
        .from("content_registry")
        .select("id, slug, title, body, locale, channel, updated_at")
        .eq("channel", "website")
        .eq("locale", locale)
        .eq("is_published", true)
        .order("updated_at", { ascending: false });

      if (cancelled) return;
      if (qError) {
        setError(qError);
        setRows([]);
      } else {
        setRows(data ?? []);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { rows, loading, error };
}
