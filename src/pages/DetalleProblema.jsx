import { useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import problems from "../data/problems.json";
import { IMAGES, ICONS, VIDEOS } from "../constants/assets";
import FooterSponsors from "../components/FooterSponsors";

import "../styles/detalleproblema.css";

export default function DetalleProblema() {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Buscar el problema por slug
  const problem = useMemo(
    () => problems.find((p) => p.slug === slug),
    [slug]
  );

  // Si no existe, volvemos a selección
  useEffect(() => {
    if (!problem) navigate("/seleccion", { replace: true });
  }, [problem, navigate]);

  if (!problem) return null;

  const handleBack = () => navigate("/seleccion");

  const handleEnded = () => {
    // Siguiente pantalla cuando finaliza el video
    navigate(`/problema/${slug}/encuesta`);
    // Si prefieres otro paso: navigate("/intersticial")
  };

  return (
    <section className="detail">

      <video
        className="home__bgVideo"
        src={VIDEOS.bg3video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
         poster={IMAGES.bg2}
      />
      {/* Fondo */}
      <div className="detail__bg" />
      <div className="detail__overlay" />

      {/* Regresar */}
      <button className="detail__back" onClick={handleBack}>
        ← Regresar
      </button>

      <main className="detail__stage">
        {/* Marco del video */}
        <img
          className="detail__frame"
          src={IMAGES.marcoVideo01}
          alt=""
          draggable={false}
        />

        {/* Título en la franja roja */}
        <div className="detail__title">
          <img
            className="detail__titleIcon"
            src={ICONS[problem.iconKey]}
            alt=""
            draggable={false}
          />
          <span className="detail__titleText">{problem.title}</span>
        </div>

        {/* Video dentro del marco */}
        <video
          ref={videoRef}
          className="detail__video"
          src={problem.videoUrl}
          controls
          autoPlay
          onEnded={handleEnded}
        />

      </main>

      {/* Sponsors */}
      <FooterSponsors />
    </section>
  );
}
