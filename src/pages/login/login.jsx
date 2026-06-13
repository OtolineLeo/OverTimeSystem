import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      navigate('/homepage');
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.welcomeText}>Olá! Digite suas credenciais</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.textbox}${email ? ` ${styles.filled}` : ''}`}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className={`${styles.textbox}${password ? ` ${styles.filled}` : ''}`}>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <label htmlFor="password">Senha</label>
        </div>

        <button type="submit">Login</button>
      </form>

      <p className={styles.helperText}>
        <button type="button" className={styles.linkButton} onClick={() => navigate('/resetpassword')}>
          Resetar senha
        </button>
      </p>
    </div>
  );
}
