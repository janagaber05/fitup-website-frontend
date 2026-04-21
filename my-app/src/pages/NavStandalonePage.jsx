import "./NavStandalonePage.css";

function NavStandalonePage({ title, subtitle, points }) {
  return (
    <div className="nav-page">
      <main className="nav-page-wrap">
        <section className="nav-page-hero">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </section>

        <section className="nav-page-grid">
          {points.map((point) => (
            <article key={point} className="nav-page-card">
              {point}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default NavStandalonePage;
