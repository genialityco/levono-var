import { useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import problems from "../data/problems.json";
import { IMAGES, VIDEOS } from "../constants/assets";
import MediaPlayer from "../components/MediaPlayer"; // ⬅️ igual que en DetalleProblema

import "../styles/solucion.css";

export default function Solucion() {
  const { id: slug } = useParams();
  const navigate = useNavigate();

  // Buscar el problema por slug (igual que en DetalleProblema)
  const problem = useMemo(() => problems.find((p) => p.slug === slug), [slug]);

  // Si no existe, volvemos a selección
  useEffect(() => {
    if (!problem) navigate("/seleccion", { replace: true });
  }, [problem, navigate]);

  if (!problem) return null;

  const handleEnded = () => {
    // Al terminar el video vamos a /gracias (ajusta si lo necesitas)
    navigate("/gracias");
  };

  return (
    <section className="solution">
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

      <div className="solution__bg" />
      <div className="solution__overlay" />

      <main className="solutionStage">
        {/* Marco PNG de solución */}
        <img
          className="solutionFrame"
          src={IMAGES.marcoVideo02} // usa el marco que definiste para Solución
          alt=""
          draggable={false}
        />

        {/* Video dentro del marco (usa MediaPlayer igual que en DetalleProblema) */}
        <MediaPlayer
          url={problem.solucionVideo}
          title={problem.title}
          onEnded={handleEnded}
          className="solutionVideo"  // respeta tu CSS / layout del marco
          autoPlay
          controls
          playsInline
          data-foreground-video
        />
      </main>
    </section>
  );
}
