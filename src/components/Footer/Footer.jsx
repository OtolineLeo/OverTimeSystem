import './Footer.css';
import { Button } from '../Button/Button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <p className="footer-title">OverTime-FaceScan</p>
      </div>

      <div className="footer-support">
        <div className="footer-support-line">
          <span className="footer-alert">🚨</span>
          <span className="footer-emergency">Emergência: 192 Samu / 193 Bomberos / 190 Policia</span>
        </div>
        <Button onClick={() => alert('Suporte solicitado!')}>Ajuda</Button>
      </div>

      <p className="footer-copy">
        © {currentYear} OverTime-FaceScan. Todos os direitos reservados.
      </p>
    </footer>
  );
}
