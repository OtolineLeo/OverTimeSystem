import { Link, useLocation } from "react-router-dom";
import "./registerconfirmation.css";

export function RegisterConfirmationPage() {
  const location = useLocation();
  const verified = location.state?.verified ?? true;

  return (
    <div className="confirmation-root">
      <div className="confirmation-card">
        <div className="confirmation-emoji" aria-hidden="true">
          👍
        </div>

        <p className="confirmation-kicker">Verification finished!</p>
        <h1 className="confirmation-title">
          {verified ? "Photo registered!" : "Confirmation completed"}
        </h1>
        <p className="confirmation-description">
          Your photo has been successfully verified and registered in the system. Thank you for completing the face scan process.
        </p>

        <div className="confirmation-badges">
          <span className="confirmation-badge">✅ Verificated</span>
          <span className="confirmation-badge">📷 Photo registered</span>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="confirmation-link">
            Back to Main Page
          </Link>
        </div>
      </div>
    </div>
  );
}
