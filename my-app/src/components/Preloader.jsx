import "./Preloader.css";
import brandMark from "../assets/logo/Asset 10 1.png";

function Preloader() {
  return (
    <div className="fitup-preloader" role="status" aria-live="polite" aria-label="Loading">
      <div className="fitup-preloader-brand" aria-hidden="true">
        <img src={brandMark} alt="" className="fitup-preloader-logo" width={170} height={50} />
        <div className="fitup-preloader-wordmark">FITUP</div>
      </div>
      <div className="fitup-preloader-progress" aria-hidden="true">
        <span className="fitup-preloader-progress-fill" />
      </div>
      <p className="fitup-preloader-text">Powering your gym experience...</p>
    </div>
  );
}

export default Preloader;
