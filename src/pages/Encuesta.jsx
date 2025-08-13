{/*import { Button, Container, Group, Stack, Title } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'

export default function Encuesta() {
  const navigate = useNavigate()
  const { id } = useParams()

  const answer = (val) => {
    // aquí podrías enviar analytics/API si hace falta
    navigate('/intersticial', { state: { id, result: val } })
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <Title order={3}>¿Esta solución te permitió avanzar?</Title>
        <Group>
          <Button onClick={() => answer('si')}>Sí</Button>
          <Button variant="outline" onClick={() => answer('no')}>No</Button>
        </Group>
      </Stack>
    </Container>
  )
}
*/}
// src/pages/Encuesta.jsx
// Encuesta.jsx
import { useNavigate, useParams } from "react-router-dom";
import HeaderLogo from "../components/HeaderLogo";
import FooterSponsors from "../components/FooterSponsors";
import { IMAGES, VIDEOS } from "../constants/assets";
import "../styles/Encuesta.css";

export default function Encuesta() {
  const navigate = useNavigate();
  const { id: slug } = useParams(); // ← usar id igual que en DetalleProblema y Solucion

  const goToSolucion = () => {
    navigate(`/problema/${slug}/solucion`); // ← manteniendo el id para no romper lo demás
  };

  return (
    <div
      className="encuesta-container"
      style={{ backgroundImage: `url(${IMAGES.fondoEncuesta})` }}
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
      <HeaderLogo />

      <main className="encuesta-content">
        <div className="marco-container">
          <img
            src={IMAGES.marcoEncuesta}
            alt="Marco de Encuesta"
            className="marco-img"
          />
          <button className="btn-encuesta" onClick={goToSolucion}>
            Sí
          </button>
        </div>
      </main>

      <FooterSponsors />
    </div>
  );
}
