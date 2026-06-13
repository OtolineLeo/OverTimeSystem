import { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [capturedDescriptor, setCapturedDescriptor] = useState(null);

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Complete seus dados.');
  const [isSaving, setIsSaving] = useState(false);

  const AllowedDomains = ['outlook.com', 'yahoo.com', 'gmail.com', 'icloud.com', 'hotmail.com'];

  const navigate = useNavigate();

  // Validações

  const emailDomain = email.split("@")[1]?.toLowerCase();
  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && AllowedDomains.includes(emailDomain),
    [email, emailDomain]
  );

  const addressValid = useMemo(() => address.toLowerCase().includes("rua"), [address]);
  const passwordValid = useMemo(() => password.length >= 8, [password]);
  const passwordsMatch = password && password === confirmPassword;

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Step 1 and 2

  function goToCamera(e){
    e.preventDefault();

    if(!emailValid){
      setMessage(`Email deve ser de um dos seguintes domínios: ${ALLOWED_DOMAINS.join(", ")}`);
      return;
    }

    if(!addressValid){
      setMessage("Endereço deve conter 'Rua' (e.x. '123 Rua Principal').");
      return;
    }

    if (!passwordValid) {
      setMessage("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (!passwordsMatch) {
      setMessage("As senhas não coincidem. Por favor, confirme sua senha.");
      return;
    }

    setStep(2);
    setMessage("Agora, vamos capturar uma foto do seu rosto para reconhecimento facial. Clique no botão para abrir a câmera.");
  }

  // Camera Helpers

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsLive(true);
      setMessage("Câmera ativada. Clique no botão para capturar sua foto.");
    } catch {
      setMessage("Não foi possível acessar a câmera. Por favor, permita o acesso à câmera e tente novamente.");
    }
  }

  function stopCamera() {
    if (!streamRef.current) return;
    streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsLive(false);
  }

  async function capturePhoto() {
    if(!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.vudeoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const photoBase64 = canvas.toDataURL("image/jpeg");
    
    setCapturedDescriptor(photoBase64);
    setPhotoTaken(true);
    stopCamera();
    setMessage("Foto capturada! Clique em 'Próximo' para concluir o registro.");
  }

  // Step 3

  function handleFinalSubmit(){
    setIsSaving(true);
    setMessage("Salvando seus dados...");

    setTimeout(() => {
      setIsSaving(false);
      setMessage("Conta criada com sucesso! Redirecionando para o login...");
      setTimeout(() => navigate("/login"), 1600);
    }, 1400);
  }


    return (
    <div className={styles.container}>
      <p className={styles.kicker}>Criar Conta</p>
      <h1 className={styles.welcomeText}>Bem-vindo.. Cadastre-se agora</h1>

      {/* Progress steps */}
      <div className={styles.progress}>
        {["1. Seus Dados", "2. Foto do Rosto", "3. Confirmar"].map((label, i) => (
          <span
            key={i}
            className={`${styles.stepLabel} ${step >= i + 1 ? styles.activeStep : ""}`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className={styles.statusMessage} role="status">
        {message}
      </div>

      {step === 1 && (
        <form onSubmit={goToCamera} className={styles.form}>
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
            <label htmlFor="password" className={styles.label}>Senha</label>
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
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
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
            Próximo →
          </button>
        </form>
      )}

      {step === 2 && (
        <div className={styles.form}>
          <div className={styles.videoWrapper}>
            {!isLive && !photoTaken && (
              <div className={styles.videoPlaceholder}>
                <span>📷 Câmera não iniciada</span>
              </div>
            )}
            {photoTaken && !isLive && (
              <div className={styles.videoPlaceholder}>
                <span>✅ Foto capturada</span>
              </div>
            )}
            <video
              ref={videoRef}
              className={styles.video}
              autoPlay
              muted
              playsInline
              style={{ display: isLive ? "block" : "none" }}
            />
          </div>
            
          <div className={styles.btnRow}>
            <button
              type="button"
              className={styles.button}
              onClick={startCamera}
              disabled={isLive || photoTaken}
            >
              ▶ Iniciar Câmera
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={capturePhoto}
              disabled={!isLive}
            >
              📸 Capturar Foto
            </button>
          </div>

          {photoTaken && (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                setPhotoTaken(false);
                setCapturedDescriptor(null);
                setMessage("Câmera reiniciada. Abra a câmera e tente novamente.");
              }}
            >
              ↺ Tirar outra foto
            </button>
          )}

          <div className={styles.btnRow}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => { stopCamera(); setStep(1); setMessage("Preencha seus dados para começar."); }}
            >
              ← Voltar
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => { setStep(3); setMessage("Revise seus dados e confirme o registro."); }}
              disabled={!photoTaken}
            >
              Próximo →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.form}>
          <div className={styles.confirmRow}><span>Nome</span><strong>{name}</strong></div>
          <div className={styles.confirmRow}><span>Email</span><strong>{email}</strong></div>
          <div className={styles.confirmRow}><span>Endereço</span><strong>{address}</strong></div>
          <div className={styles.confirmRow}><span>Foto</span><strong>✅ Capturada</strong></div>

          <div className={styles.btnRow}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => { setStep(2); setMessage("Você pode tirar outra foto se quiser."); }}
            >
              ← Voltar
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={handleFinalSubmit}
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "✓ Confirmar Registro"}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.linkButton}
        onClick={() => navigate("/login")}
      >
        Já tem uma conta? Entrar
      </button>
    </div>
  );
}
