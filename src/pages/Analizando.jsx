import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGES, VIDEOS } from "../constants/assets";
import "../styles/analizando.css";

export default function Analizando() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // destino al terminar
  const target = state?.next || "/seleccion";

  // 🔹 Slides de marca (imágenes con texto)
  // Asegúrate de tener estas claves en constants/assets:
  // IMAGES.texto_marca_1, IMAGES.texto_marca_2  (las dos frases)
  const slides = useMemo(
    () => [IMAGES.texto_marca_1, IMAGES.texto_marca_2].filter(Boolean),
    []
  );

  const SLIDE_MS = 3500;     // duración de cada slide
  const [idx, setIdx] = useState(0);

  // Avance del carrusel
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [slides.length]);

  // Tiempo total = todos los slides + un respiro
  useEffect(() => {
    const totalMs = slides.length * SLIDE_MS + 1200;
    const id = setTimeout(() => {
      navigate(target, { replace: true });
    }, Math.max(totalMs, 2200)); // nunca menos de tu 2200 original
    return () => clearTimeout(id);
  }, [navigate, target, slides.length]);

  return (
    <section className="loadingScreen" aria-label="Analizando la jugada">
      {/* BG video */}
      <video
        className="home__bgVideo"
        src={VIDEOS.bg2video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={IMAGES.bg2}
      />

      <div className="loadingScreen__bg" />
      <div className="loadingScreen__overlay" />

      {/* Cancha + loader */}
      <main className="loadingScreen__content">
        <div className="loadingStage">
          <img
            src={IMAGES.canchaloading}
            alt="Cancha de análisis"
            className="loadingField"
            draggable={false}
          />

          <div className="loadingSpinner" aria-live="polite" aria-busy="true">
            <div className="loadingRing" aria-hidden="true" />
            <div className="loadingLabel">
              Analizando
              <br />
              la jugada
            </div>
          </div>
        </div>
      </main>

      {/* 🔹 Carrusel de mensajes de marca (sin footer) */}
      {slides.length > 0 && (
        <div className="brandCarousel">
          {/* key fuerza la reanimación cada cambio de idx */}
          <div key={idx} className="brandSlide">
            <img
              src={slides[idx]}
              alt=""
              className="brandSlide__img"
              draggable={false}
            />
          </div>
        </div>
      )}
    </section>
  );
}
