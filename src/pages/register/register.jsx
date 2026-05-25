import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const AllowedDomains = ['outlook.com', 'yahoo.com', 'gmail.com', 'icloud.com', 'hotmail.com'];

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailDomain = email.split('@')[1]?.toLowerCase();
    if(!AllowedDomains.includes(emailDomain)) {
      alert(`Email must be from: ${AllowedDomains.join(', ')}`);
      return;
    }

    if(!address.toLowerCase().includes('street')) {
      alert('Address must contain a street (e.g. "123 Main Street").');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (name && email && address && password) {
      navigate('/login');
    }
  }

    return (
      <div className={styles.container}>
        <h3 className={styles.welcomeText}>Welcome.. Register now</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>
    )
}
