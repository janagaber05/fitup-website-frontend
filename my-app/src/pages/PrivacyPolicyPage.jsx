import "./PrivacyPolicyPage.css";

const POLICY_SECTIONS = [
  {
    title: "1. Information We Collect",
    points: [
      "Account and contact details such as your name, email, and phone number when you register or contact us.",
      "Gym and usage data such as booking activity, app interactions, and operational analytics needed to provide the service.",
      "Technical data such as IP address, device/browser type, and diagnostic logs used for reliability and security.",
    ],
  },
  {
    title: "2. How We Use Information",
    points: [
      "To operate and improve the FITUP platform and deliver requested features.",
      "To communicate service updates, support replies, and important account notifications.",
      "To maintain platform security, prevent abuse, and comply with legal obligations.",
    ],
  },
  {
    title: "3. Data Sharing",
    points: [
      "We do not sell personal information.",
      "We may share data with trusted service providers (hosting, analytics, support tools) under confidentiality and data protection obligations.",
      "We may disclose information when required by law or to protect the rights, safety, and integrity of FITUP, our users, or the public.",
    ],
  },
  {
    title: "4. Data Retention",
    points: [
      "We retain personal data only as long as needed for service delivery, legal compliance, and legitimate business purposes.",
      "When data is no longer required, we delete or anonymize it in line with our retention standards.",
    ],
  },
  {
    title: "5. Your Privacy Rights",
    points: [
      "You may request access, correction, or deletion of your personal information, subject to applicable law.",
      "You may request restrictions on specific processing activities where permitted.",
      "You can contact us anytime at support@fitup.sa for privacy-related requests.",
    ],
  },
  {
    title: "6. Security",
    points: [
      "We use administrative, technical, and organizational safeguards to protect information against unauthorized access, loss, misuse, or disclosure.",
      "No internet service is 100% secure, but we continuously monitor and improve our protections.",
    ],
  },
  {
    title: "7. Updates to This Policy",
    points: [
      "We may update this Privacy Policy from time to time.",
      "When we make material updates, we will update the effective date on this page and provide notice where appropriate.",
    ],
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-page">
      <header className="privacy-policy-hero">
        <p className="privacy-policy-kicker">Privacy Policy</p>
        <h1>How FITUP Handles Your Data</h1>
        <p className="privacy-policy-intro">
          FITUP is committed to protecting your privacy and handling your personal information responsibly.
          This policy explains what data we collect, why we collect it, and how we protect it.
        </p>
        <p className="privacy-policy-meta">
          Effective date: May 1, 2026
        </p>
      </header>

      <section className="privacy-policy-content">
        {POLICY_SECTIONS.map((section) => (
          <article key={section.title} className="privacy-policy-section">
            <h2>{section.title}</h2>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
