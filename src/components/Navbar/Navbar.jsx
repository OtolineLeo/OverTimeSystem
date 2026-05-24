import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../public/images/Minecraft-Time-Tracking-Device-PNG-180x180.webp';
import { Button } from '../Button/Button';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="left">
        <img src={logo} alt="Logo" className="logo" />
        <button
          type="button"
          className="title-button"
          onClick={() => navigate('/')}
        >
          OverTime-FaceScan
        </button>
      </div>
      <div className="right">
        <Button onClick={() => navigate('/register')}>Sign In</Button>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    </nav>
  );
}