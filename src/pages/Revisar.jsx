// src/pages/Revisar.jsx
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../components/HeaderLogo";
import FooterSponsors from "../components/FooterSponsors";
import { IMAGES } from "../constants/assets";
import "../styles/revisar.css";

export default function Revisar() {
  const navigate = useNavigate();

  return (
    <section
      className="revisar"
      style={{ "--bg-url": `url(${IMAGES.fondoEncuesta})` }}
    >
      {/* Fondo */}
      <div className="revisar__bg" />
      <div className="revisar__overlay" />

      {/* Header fijo */}
      <HeaderLogo />

      <main className="revisar__content">
        <div className="revisar__stage">
          {/* Marco SVG con el texto grande */}
          <img
            src={IMAGES.marcoRevisar}
            alt=""
            className="revisar__frame"
            draggable={false}
          />

          {/* CTA central (botón morado/rojo que va dentro del marco) */}
          <button
            className="revisar__cta"
            onClick={() => navigate("/seleccion")}
          >
            ¡Toca aquí para volver al Lenovo PlayCheck Desk!
          </button>
        </div>
      </main>

      {/* Footer de sponsors */}
      <FooterSponsors />
    </section>
  );
}
