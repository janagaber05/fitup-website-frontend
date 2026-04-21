import { Link } from "react-router-dom";

function FeatureCard({ id, title, description }) {
  return (
    <article className="fitup-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/feature/${id}`} className="fitup-link">
        View details
      </Link>
    </article>
  );
}

export default FeatureCard;
