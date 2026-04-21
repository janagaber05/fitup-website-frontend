import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import "./ProfilePage.css";

function buildGoogleAuthUrl() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  if (!clientId || typeof window === "undefined") return null;
  const redirectUri = `${window.location.origin}/profile`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

function buildFacebookAuthUrl() {
  const appId = process.env.REACT_APP_FACEBOOK_APP_ID;
  if (!appId || typeof window === "undefined") return null;
  const redirectUri = `${window.location.origin}/profile`;
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "email,public_profile",
    state: `fb_${Math.random().toString(36).slice(2, 12)}`,
  });
  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
}

function ProfilePage() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const oauthCode = searchParams.get("code");
  const oauthError = searchParams.get("error");

  const [mode, setMode] = useState("login");
  const [socialHint, setSocialHint] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signName, setSignName] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signConfirm, setSignConfirm] = useState("");

  const clearOauthParams = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const startGoogle = useCallback(() => {
    const url = buildGoogleAuthUrl();
    if (url) window.location.assign(url);
    else setSocialHint(true);
  }, []);

  const startFacebook = useCallback(() => {
    const url = buildFacebookAuthUrl();
    if (url) window.location.assign(url);
    else setSocialHint(true);
  }, []);

  return (
    <div className="profile-page">
      <section className="profile-shell fitup-wrap">
        <div className="profile-card">
          <h1 className="profile-title">{t("profile.title")}</h1>
          <p className="profile-lead">{t("profile.lead")}</p>

          {(oauthCode || oauthError) && (
            <div className="profile-oauth-banner" role="status">
              {oauthError ? (
                <p>{t("profile.oauthFail").replace("{error}", oauthError)}</p>
              ) : (
                <p>{t("profile.oauthOk")}</p>
              )}
              <button type="button" className="profile-banner-dismiss" onClick={clearOauthParams}>
                {t("profile.dismiss")}
              </button>
            </div>
          )}

          {socialHint && (
            <p className="profile-social-hint" role="note">
              {t("profile.socialHint").replace(
                "{uri}",
                typeof window !== "undefined" ? `${window.location.origin}/profile` : "/profile"
              )}
            </p>
          )}

          <div className="profile-tabs" role="tablist" aria-label="Account mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              className={`profile-tab${mode === "login" ? " is-active" : ""}`}
              onClick={() => {
                setMode("login");
                setSocialHint(false);
              }}
            >
              {t("profile.tabLogin")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              className={`profile-tab${mode === "signup" ? " is-active" : ""}`}
              onClick={() => {
                setMode("signup");
                setSocialHint(false);
              }}
            >
              {t("profile.tabSignup")}
            </button>
          </div>

          <div className="profile-social">
            <button type="button" className="profile-social-btn profile-social-btn--google" onClick={startGoogle}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t("profile.google")}
            </button>
            <button type="button" className="profile-social-btn profile-social-btn--facebook" onClick={startFacebook}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              {t("profile.facebook")}
            </button>
          </div>

          <p className="profile-divider">
            <span>{t("profile.or")}</span>
          </p>

          {mode === "login" ? (
            <form
              className="profile-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              aria-label="Log in with email"
            >
              <label className="profile-field">
                <span>{t("profile.email")}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={t("profile.phEmail")}
                  required
                />
              </label>
              <label className="profile-field">
                <span>{t("profile.password")}</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder={t("profile.phPassword")}
                  required
                />
              </label>
              <button type="submit" className="profile-submit">
                {t("profile.submitLogin")}
              </button>
            </form>
          ) : (
            <form
              className="profile-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              aria-label="Sign up with email"
            >
              <label className="profile-field">
                <span>{t("profile.fullName")}</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={signName}
                  onChange={(e) => setSignName(e.target.value)}
                  placeholder={t("profile.phName")}
                  required
                />
              </label>
              <label className="profile-field">
                <span>{t("profile.email")}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={signEmail}
                  onChange={(e) => setSignEmail(e.target.value)}
                  placeholder={t("profile.phEmail")}
                  required
                />
              </label>
              <label className="profile-field">
                <span>{t("profile.password")}</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={signPassword}
                  onChange={(e) => setSignPassword(e.target.value)}
                  placeholder={t("profile.phPasswordNew")}
                  minLength={8}
                  required
                />
              </label>
              <label className="profile-field">
                <span>{t("profile.confirmPassword")}</span>
                <input
                  type="password"
                  name="confirm"
                  autoComplete="new-password"
                  value={signConfirm}
                  onChange={(e) => setSignConfirm(e.target.value)}
                  placeholder={t("profile.phConfirm")}
                  minLength={8}
                  required
                />
              </label>
              <button type="submit" className="profile-submit">
                {t("profile.submitSignup")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
