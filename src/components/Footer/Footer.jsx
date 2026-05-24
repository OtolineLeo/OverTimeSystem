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
          <span className="footer-emergency">Emergency: 911</span>
        </div>
        <Button onClick={() => alert('Support triggered!')}>Help</Button>
      </div>

      <p className="footer-copy">
        © {currentYear} OverTime-FaceScan. All rights reserved.
      </p>
    </footer>
  );
}
