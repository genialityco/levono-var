import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import problems from "../data/problems.json";
import { ICONS, POPUPS, IMAGES } from "../constants/assets";

import HeaderLogo from "../components/HeaderLogo";
import FooterSponsors from "../components/FooterSponsors";

import "../styles/seleccion.css";

// Limita un número entre min y max
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export default function Seleccion() {
  const navigate = useNavigate();

  // Estado del problema activo (objeto del JSON) o null
  const [active, setActive] = useState(null);

  // Refs reales
  const stageRef = useRef(null); // contenedor de la cancha
  const popupRef = useRef(null); // popup activo
  const pinRefs = useRef({}); // { [id]: HTMLButtonElement }

  // Posición del popup (en %) relativa a la cancha
  const popupPos = useMemo(() => {
    if (!active) return null;

    const dx = active.popup?.dx ?? 0; // desplazamiento horizontal en %
    const dy = active.popup?.dy ?? -12; // desplazamiento vertical en %
    const x = clamp((active.x ?? 50) + dx, -10, 110);
    const y = clamp((active.y ?? 50) + dy, -10, 110);

    return { x, y };
  }, [active]);

  // Línea conectora (en px) entre pin y borde del popup
  const connector = useMemo(() => {
    if (!active || !popupPos || !stageRef.current) return null;

    const stageRect = stageRef.current.getBoundingClientRect();
    const pinEl = pinRefs.current[active.id];
    const popupEl = popupRef.current;

    if (!pinEl || !popupEl) return null;

    const pinRect = pinEl.getBoundingClientRect();
    const popupRect = popupEl.getBoundingClientRect();

    // Punto inicial: centro del pin
    const x1 = pinRect.left + pinRect.width / 2 - stageRect.left;
    const y1 = pinRect.top + pinRect.height / 2 - stageRect.top;

    // Punto final: borde del popup según anchorSide
    const side = active.popup?.anchorSide === "right" ? "right" : "left";
    const x2 =
      (side === "right" ? popupRect.right : popupRect.left) - stageRect.left;
    const y2 = popupRect.top + popupRect.height / 2 - stageRect.top;

    return { x1, y1, x2, y2, viewW: stageRect.width, viewH: stageRect.height };
  }, [active, popupPos]);

  // Nueva función para manejar Play
  const handlePlay = (p) => {
    if (!p) return;
    const next = `/problema/${p.slug}`; // ruta de detalle
    sessionStorage.setItem("nextRoute", next); // respaldo
    navigate(`/analizando?next=${encodeURIComponent(next)}`, {
      state: { next, problem: p },
    });
  };

  return (
    <section className="screen2" style={{ "--bg-url": `url(${IMAGES.bg2})` }}>
      {/* Fondo */}
      <div className="screen2__bg" />
      <div className="screen2__overlay" />

      {/* Logo fijo en la izquierda */}
      <HeaderLogo />

      {/* Título como imagen */}
      <img
        src={IMAGES.texto_problemas}
        alt="Selecciona tu jugada polémica IT para revisarla en el VAR."
        className="screen2__headingImg"
      />

      {/* CONTENIDO */}
      <main className="screen2__content">
        <div ref={stageRef} className="screen2__stage">
          {/* Cancha */}
          <img
            src={IMAGES.canchaMenu}
            alt="Cancha"
            className="screen2__field"
            draggable={false}
          />

          {/* Pines */}
          <div className="fieldPins">
            {problems.map((p) => (
              <button
                key={p.id}
                ref={(el) => {
                  if (el) pinRefs.current[p.id] = el;
                }}
                className="fieldPin"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => setActive(p)}
                aria-label={p.title}
                data-pin-id={p.id}
              >
                <img src={ICONS[p.iconKey]} alt="" draggable={false} />
              </button>
            ))}
          </div>

          {/* Línea conectora (pendiente dibujar más adelante) */}
          {/* {connector && (
            <svg
              className="popupLine"
              width="100%"
              height="100%"
              viewBox={`0 0 ${connector.viewW} ${connector.viewH}`}
            >
              <line
                x1={connector.x1}
                y1={connector.y1}
                x2={connector.x2}
                y2={connector.y2}
                stroke="rgba(255,255,255,.9)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )} */}

          {/* Popup */}
          {active && popupPos && (
            <div
              ref={popupRef}
              className="problemPopup"
              style={{
                left: `${popupPos.x}%`,
                top: `${popupPos.y}%`,
                transform: "translate(0, -50%)",
              }}
            >
              <img
                src={POPUPS[active.popupKey] ?? POPUPS.P01}
                alt={active.title}
                className="problemPopup__imgOnly"
                draggable={false}
              />

              {/* Botón Play */}
              <button
                className="problemPopup__play"
                onClick={() => handlePlay(active)}
                aria-label="Play"
              >
                ▶
              </button>

              {/* Cerrar */}
              <button
                className="problemPopup__close"
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                title="Cerrar"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Sponsors */}
      <FooterSponsors />
    </section>
  );
}
