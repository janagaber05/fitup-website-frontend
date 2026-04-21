import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import "./ContactPage.css";

function StepIcon({ stepId }) {
  if (stepId === 1) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    );
  }

  if (stepId === 2) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.2 12.2l2 2 3.9-4.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l4.7-1.3 8.9-8.9a2.2 2.2 0 0 0-3.1-3.1L5.6 15.6 4 20z" />
      <path d="M12.8 6.9l4.3 4.3" />
      <path d="M10 14l-1 3" />
    </svg>
  );
}

function ContactPage() {
  const { t } = useI18n();
  const successRef = useRef(null);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const steps = useMemo(
    () => [
      { id: 1, title: t("contact.step1"), subtitle: t("contact.step1Sub"), active: true },
      { id: 2, title: t("contact.step2"), subtitle: t("contact.step2Sub") },
      { id: 3, title: t("contact.step3"), subtitle: t("contact.step3Sub") },
    ],
    [t]
  );

  useEffect(() => {
    if (submitStatus === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [submitStatus]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitStatus("success");
    form.reset();
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>{t("contact.heroTitle")}</h1>
        <p>{t("contact.heroSub")}</p>
      </section>

      <section className="contact-steps" aria-label={t("contact.stepsAria")}>
        {steps.map((step) => (
          <article key={step.id} className={`contact-step ${step.active ? "is-active" : ""}`}>
            <div className={`contact-step-icon ${step.active ? "is-active" : ""}`} aria-hidden="true">
              <StepIcon stepId={step.id} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.subtitle}</p>
          </article>
        ))}
      </section>

      <form
        className="contact-form"
        id="contact-partner-form"
        name="partnerApplication"
        method="post"
        action="#contact-partner-form"
        onSubmit={handleSubmit}
        aria-label={t("contact.formAriaLabel")}
      >
        <div className="contact-form-shell">
          <fieldset className="contact-fieldset">
            <legend className="contact-fieldset__legend">{t("contact.companyInfo")}</legend>
            <div className="contact-fields contact-fields--single">
              <label htmlFor="contact-company-name">
                {t("contact.companyName")}
                <input
                  id="contact-company-name"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  enterKeyHint="next"
                  required
                  maxLength={200}
                  placeholder={t("contact.companyNamePh")}
                />
              </label>
              <label htmlFor="contact-company-size">
                {t("contact.companySize")}
                <select id="contact-company-size" name="companySize" required defaultValue="">
                  <option value="" disabled hidden>
                    {t("contact.companySizePh")}
                  </option>
                  <option value="1-10">{t("contact.size1")}</option>
                  <option value="11-50">{t("contact.size2")}</option>
                  <option value="51-200">{t("contact.size3")}</option>
                  <option value="200+">{t("contact.size4")}</option>
                </select>
              </label>
              <label htmlFor="contact-website">
                {t("contact.website")}
                <input
                  id="contact-website"
                  name="website"
                  type="url"
                  autoComplete="url"
                  inputMode="url"
                  enterKeyHint="next"
                  required
                  maxLength={500}
                  placeholder={t("contact.websitePh")}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="contact-fieldset">
            <legend className="contact-fieldset__legend">{t("contact.contactInfo")}</legend>
            <div className="contact-fields contact-fields--two">
              <label htmlFor="contact-full-name">
                {t("contact.fullName")}
                <input
                  id="contact-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  enterKeyHint="next"
                  required
                  maxLength={120}
                  placeholder={t("contact.fullNamePh")}
                />
              </label>
              <label htmlFor="contact-job-title">
                {t("contact.jobTitle")}
                <input
                  id="contact-job-title"
                  name="jobTitle"
                  type="text"
                  autoComplete="organization-title"
                  enterKeyHint="next"
                  required
                  maxLength={120}
                  placeholder={t("contact.jobTitlePh")}
                />
              </label>
              <label htmlFor="contact-email">
                {t("contact.emailAddr")}
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  enterKeyHint="next"
                  required
                  maxLength={254}
                  placeholder={t("contact.emailPh")}
                />
              </label>
              <label htmlFor="contact-phone">
                {t("contact.phone")}
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  enterKeyHint="next"
                  required
                  maxLength={40}
                  placeholder={t("contact.phonePh")}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="contact-fieldset">
            <legend className="contact-fieldset__legend">{t("contact.partnershipDetails")}</legend>
            <div className="contact-fields contact-fields--single">
              <label htmlFor="contact-partnership-message">
                {t("contact.partnershipLong")}
                <textarea
                  id="contact-partnership-message"
                  name="partnershipMessage"
                  required
                  rows={6}
                  maxLength={4000}
                  placeholder={t("contact.partnershipLongPh")}
                />
              </label>
              <label htmlFor="contact-expected-value">
                {t("contact.expectedValue")}
                <input
                  id="contact-expected-value"
                  name="expectedValue"
                  type="text"
                  autoComplete="off"
                  enterKeyHint="done"
                  maxLength={500}
                  placeholder={t("contact.expectedValuePh")}
                />
              </label>
            </div>
          </fieldset>
        </div>

        <section className="contact-note" aria-labelledby="contact-qual-heading">
          <h3 id="contact-qual-heading">{t("contact.qualTitle")}</h3>
          <p>{t("contact.qualBody")}</p>
        </section>

        <div className="contact-submit">
          {submitStatus === "success" ? (
            <p ref={successRef} className="contact-form-success" tabIndex={-1} role="status">
              {t("contact.submitSuccess")}
            </p>
          ) : null}
          <button type="submit" aria-describedby="contact-form-terms-hint">
            {t("contact.submitApp")}
          </button>
          <p id="contact-form-terms-hint" className="contact-submit-terms">
            {t("contact.termsNote")}
          </p>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
