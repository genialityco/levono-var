import { useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import problems from "../data/problems.json";
import { IMAGES, VIDEOS } from "../constants/assets";
import MediaPlayer from "../components/MediaPlayer"; // ⬅️ usamos el componente ya creado

import "../styles/detalleproblema.css";

export default function DetalleProblema() {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  //const videoRef = useRef(null); para el import useRef,

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

        {/* Video dentro del marco (ahora con MediaPlayer) */}
        <MediaPlayer
          url={problem.videoUrl}
          title={problem.title}
          onEnded={handleEnded}
          className="detail__video"      // ⬅️ mantiene el mismo CSS
          autoPlay                        // ⬅️ respeta tu comportamiento
          controls                        // ⬅️ respeta tu comportamiento
          playsInline                     // ⬅️ respeta tu comportamiento
          data-foreground-video
        />
      </main>
    </section>
  );
}
