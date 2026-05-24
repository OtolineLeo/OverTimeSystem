import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

export function HomePage() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [isLive, setIsLive] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Click the button to start the camera");
  const [statusTone, setStatusTone] = useState("neutral");

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

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
      setStatusMsg("Camera is live. Click the button to stop.");
      setStatusTone("success");
    } catch {
      setStatusMsg("Unable to access the camera. Please allow camera permissions and try again.");
      setStatusTone("error");
    }
  }

  function stopCamera() {
    if (!streamRef.current) return;

    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsLive(false);
    setStatusMsg("Camera stopped. Click the button to start.");
    setStatusTone("neutral");
  }

  function simulateRecognition() {
    setStatusMsg("Recognizing...");
    setStatusTone("neutral");

    setTimeout(() => {
      setStatusMsg("Face recognized! Welcome back!");
      setStatusTone("success");
      navigate("/registerconfirm", { state: { verified: true } });
    }, 1400);
  }

  return (
    <div className="camera-root">
      <div className="camera-card">

        <div className="card-header">
          <span className="card-title">FaceScan Confirmation</span>
          <span className={`status-pill${isLive ? " live" : ""}`}>
            <span className="status-dot" />
            {isLive ? "online" : "offline"}
          </span>
        </div>

        <div className="video-wrapper">
          <div className="corner-tl" />
          <div className="corner-br" />
          <div className={`scan-line${isLive ? " active" : ""}`} />
          <div className={`video-overlay${isLive ? " hidden" : ""}`}>
            <div className="overlay-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="#6b7280" fill="none" strokeWidth="1.5">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <span className="overlay-text">camera deactivated</span>
          </div>
          <video
            ref={videoRef}
            id="myVideo"
            className="camera-video"
            autoPlay
            muted
            playsInline
          />
        </div>

        <div
          className="recognition-status"
          id="recognitionStatus"
          data-tone={statusTone}
        >
          {statusMsg}
        </div>

        <div className="btn-row">
          <button
            id="startCameraBtn"
            className="btn btn-start"
            onClick={startCamera}
            disabled={isLive}
          >
            ▶ Iniciar
          </button>
          <button
            id="stopCameraBtn"
            className="btn btn-stop"
            onClick={stopCamera}
            disabled={!isLive}
          >
            ■ Parar
          </button>
          <button
            id="simulateRecognitionBtn"
            className="btn btn-recognize"
            onClick={simulateRecognition}
            disabled={!isLive}
          >
            ⬡ Verificar
          </button>
        </div>

      </div>
    </div>
  );
}