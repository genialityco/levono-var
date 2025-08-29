import { useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import problems from "../data/problems.json";
import { IMAGES, VIDEOS } from "../constants/assets";
import FooterSponsors from "../components/FooterSponsors";
import HeaderLogo from "../components/HeaderLogo";

import "../styles/solucion.css";

export default function Solucion() {
  
  // mantenemos el mismo patrón que ya te funciona en DetalleProblema
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Buscar el problema por slug (igual que en DetalleProblema)
  const problem = useMemo(
    () => problems.find((p) => p.slug === slug),
    [slug]
  );

  // Si no existe, volvemos a selección
  useEffect(() => {
    if (!problem) navigate("/seleccion", { replace: true });
  }, [problem, navigate]);

  if (!problem) return null;

  //const handleBack = () => navigate("/seleccion");


  const handleEnded = () => {
    // ¿A dónde vas al terminar? Si tienes una pantalla intermedia, cámbialo aquí.
    // Por ejemplo: navigate("/gracias");
    navigate("/gracias");
  };

  return (
    <section
      
      className="solution"
      
    >
        <video
          className="home__bgVideo"
          src={VIDEOS.bg4video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={IMAGES.bg2}
        />

      {/*<HeaderLogo />*/}
      <div className="solution__bg" />
      <div className="solution__overlay" />

      <main className="solution__content">
        {/* Título (imagen) */}
        <img
          src={IMAGES.lenovoServiceDesk}   // <- imagen "Lenovo Service Desk"
          alt="Lenovo Service Desk"
          className="solution__titleImg"
          draggable={false}
        />

        {/* Panel blanco con el video dentro */}
        <div className="solution__videoWrap">
          <video
            ref={videoRef}
            className="solution__video"
            data-foreground-video 
            src={problem.solucionVideo}
            controls
            autoPlay
            onEnded={handleEnded}
          />
        </div>
      </main>

     {/*} <FooterSponsors />*/}
    </section>
  );
}
