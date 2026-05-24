import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("Type your email to receive the reset code.");
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const passwordValid = useMemo(() => newPassword.length >= 8, [newPassword]);
  const passwordsMatch = newPassword && newPassword === confirmPassword;

  const sendCode = () => {
    if (!emailValid) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    setMessage("Sending the code to your email...");

    window.setTimeout(() => {
      setIsSending(false);
      setStep(2);
      setMessage(`Code sent to ${email}. Use the code ${fakeCode} to continue.`);
    }, 1200);
  };

  const verifyCode = () => {
    if (code.trim().length < 6) {
      setMessage("Please enter the complete 6-digit code.");
      return;
    }

    if (code !== fakeCode) {
      setMessage("Incorrect code. Please try again.");
      return;
    }

    setStep(3);
    setMessage("Code confirmed. Now define your new password.");
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (!passwordValid) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!passwordsMatch) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setIsSaving(true);
    setMessage("Updating your password...");

    window.setTimeout(() => {
      setIsSaving(false);
      setMessage("Password reset successfully! You can now log in.");
      window.setTimeout(() => navigate("/login"), 1600);
    }, 1400);
  };

  return (
    <div className="resetpage-root">
      <div className="resetpage-card">
        <p className="resetpage-kicker">Reset Password</p>
        <h1 className="resetpage-title">Recover Access to Your Account</h1>
        <p className="resetpage-description">
          We've sent a verification code to the email address you provided. Next, choose a new password and confirm everything in just a few steps.
        </p>

        <div className="resetpage-progress" aria-label="Progresso do fluxo">
          {[1, 2, 3].map((item) => (
            <span
              key={item}
              className={`resetpage-step ${step >= item ? "active" : ""}`}
            >
              {item === 1 && "1. E-mail"}
              {item === 2 && "2. Code verification"}
              {item === 3 && "3. New Password"}
            </span>
          ))}
        </div>

        <div className="resetpage-status" role="status">
          {message}
        </div>

        {step === 1 && (
          <div className="resetpage-form">
            <label className="resetpage-label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="resetpage-input"
              placeholder="youremail@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />

            <button
              type="button"
              className="resetpage-button primary"
              onClick={sendCode}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Code"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="resetpage-form">
            <label className="resetpage-label" htmlFor="code">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="resetpage-input"
              placeholder="Enter the 6-digit code"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            />

            <div className="resetpage-actions">
              <button
                type="button"
                className="resetpage-button secondary"
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
              <button
                type="button"
                className="resetpage-button primary"
                onClick={verifyCode}
              >
                Confirm Code
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form className="resetpage-form" onSubmit={resetPassword}>
            <label className="resetpage-label" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className="resetpage-input"
              placeholder="Minimum 8 characters"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
            />

            <label className="resetpage-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="resetpage-input"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
            />

            <div className="resetpage-actions">
              <button
                type="button"
                className="resetpage-button secondary"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                type="submit"
                className="resetpage-button primary"
                disabled={isSaving}
              >
                {isSaving ? "Updating..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}

        <button
          type="button"
          className="resetpage-link"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}