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

        <p className="confirmation-kicker">Verificação concluída!</p>
        <h1 className="confirmation-title">
          {verified ? "Foto registrada!" : "Confirmação concluída"}
        </h1>
        <p className="confirmation-description">
          Sua foto foi verificada e registrada com sucesso no sistema. Obrigado por concluir o processo de digitalização facial.
        </p>

        <div className="confirmation-badges">
          <span className="confirmation-badge">✅ Verificada</span>
          <span className="confirmation-badge">📷 Foto registrada</span>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="confirmation-link">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
