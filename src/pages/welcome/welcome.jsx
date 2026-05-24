import { useEffect, useState } from 'react';
import './welcome.css';

const imagens = ['/images/fotoUm.png', '/images/fotoDois.png'];

export function WelcomePage() {
  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagemAtual((anterior) => (anterior + 1) % imagens.length);
    }, 20000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="welcome-page">
      <div className="welcome-image-frame">
        <img
          src={imagens[imagemAtual]}
          alt={`Imagem ${imagemAtual + 1} do carrossel`}
          className="welcome-image"
        />
      </div>
    </section>
  );
}
