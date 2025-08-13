{/*import { Center, Loader, Stack, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Analizando() {
  const [params] = useSearchParams()
  const id = params.get('id')
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      if (id) navigate(`/problema/${id}`)
      else navigate('/seleccion')
    }, 1200)
    return () => clearTimeout(t)
  }, [id, navigate])

  return (
    <Center mih="70vh">
      <Stack align="center">
        <Loader />
        <Text>Analizando la jugada…</Text>
      </Stack>
    </Center>
  )
}*/}

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGES, VIDEOS } from "../constants/assets";
import FooterSponsors from "../components/FooterSponsors";
import "../styles/analizando.css";

export default function Analizando() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // A dónde vamos cuando termina la animación
  const target = state?.next || "/seleccion";

  useEffect(() => {
    const id = setTimeout(() => {
      navigate(target, { replace: true });
    }, 2200); // duración del “análisis”
    return () => clearTimeout(id);
  }, [navigate, target]);

  return (
    <section className="loadingScreen"    >
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

      <main className="loadingScreen__content">
        <div className="loadingStage">
          <img
            src={IMAGES.canchaloading} // Asegúrate de tener esta clave en IMAGES
            alt="Cancha de análisis"
            className="loadingField"
            draggable={false}
          />

          {/* Spinner + texto, centrados sobre la cancha */}
          <div className="loadingSpinner" aria-live="polite">
            <div className="loadingRing" aria-hidden="true" />
            <div className="loadingLabel">
              Analizando
              <br />
              la jugada
            </div>
          </div>
        </div>
      </main>

      <FooterSponsors />
    </section>
  );
}

