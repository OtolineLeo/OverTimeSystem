import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("Digite seu email para receber o código de redefinição.");
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const passwordValid = useMemo(() => newPassword.length >= 8, [newPassword]);
  const passwordsMatch = newPassword && newPassword === confirmPassword;

  const sendCode = () => {
    if (!emailValid) {
      setMessage("Por favor, insira um endereço de email válido.");
      return;
    }

    setIsSending(true);
    setMessage("Enviando o código para seu email...");

    window.setTimeout(() => {
      setIsSending(false);
      setStep(2);
      setMessage(`Código enviado para ${email}. Use o código ${fakeCode} para continuar.`);
    }, 1200);
  };

  const verifyCode = () => {
    if (code.trim().length < 6) {
      setMessage("Por favor, insira o código completo de 6 dígitos.");
      return;
    }

    if (code !== fakeCode) {
      setMessage("Código incorreto. Por favor, tente novamente.");
      return;
    }

    setStep(3);
    setMessage("Código confirmado. Agora defina sua nova senha.");
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (!passwordValid) {
      setMessage("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (!passwordsMatch) {
      setMessage("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    setIsSaving(true);
    setMessage("Atualizando sua senha...");

    window.setTimeout(() => {
      setIsSaving(false);
      setMessage("Senha redefinida com sucesso! Você pode agora fazer login.");
      window.setTimeout(() => navigate("/login"), 1600);
    }, 1400);
  };

  return (
    <div className="resetpage-root">
      <div className="resetpage-card">
        <p className="resetpage-kicker">Resetar senha</p>
        <h1 className="resetpage-title">Recuperar acesso à sua conta</h1>
        <p className="resetpage-description">
          Enviamos um código de verificação para o endereço de email que você forneceu. Em seguida, escolha uma nova senha e confirme tudo em apenas alguns passos.
        </p>

        <div className="resetpage-progress" aria-label="Progresso do fluxo">
          {[1, 2, 3].map((item) => (
            <span
              key={item}
              className={`resetpage-step ${step >= item ? "active" : ""}`}
            >
              {item === 1 && "1. E-mail"}
              {item === 2 && "2. Verificação de codigo"}
              {item === 3 && "3. Nova senha"}
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
              {isSending ? "Enviando..." : "Enviar requisição"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="resetpage-form">
            <label className="resetpage-label" htmlFor="code">
              Codigo de verificação
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
                Confirmar código
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form className="resetpage-form" onSubmit={resetPassword}>
            <label className="resetpage-label" htmlFor="newPassword">
              Nova senha
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
              Confirmar nova senha
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
                Voltar
              </button>
              <button
                type="submit"
                className="resetpage-button primary"
                disabled={isSaving}
              >
                {isSaving ? "Atualizando..." : "Redefinir senha"}
              </button>
            </div>
          </form>
        )}

        <button
          type="button"
          className="resetpage-link"
          onClick={() => navigate("/login")}
        >
          Voltar para o login
        </button>
      </div>
    </div>
  );
}