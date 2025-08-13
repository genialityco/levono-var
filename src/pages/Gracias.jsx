{/*import { Button, Center, Container, Stack, Text, Title } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Gracias() {
  const navigate = useNavigate()
  const { state } = useLocation() // { id, result }
  const wasOk = state?.result === 'si'

  return (
    <Center mih="70vh">
      <Container size="sm">
        <Stack align="center" gap="md">
          <Title order={2}>{wasOk ? '¡Genial!' : 'Gracias por tu respuesta'}</Title>
          <Text ta="center">
            {wasOk
              ? 'Nos alegra que la solución te haya servido.'
              : 'Gracias por contarnos. Seguiremos mejorando las jugadas.'}
          </Text>
          <Button onClick={() => navigate('/seleccion')}>Revisar otra jugada</Button>
        </Stack>
      </Container>
    </Center>
  )
}*/}
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../components/HeaderLogo";
import FooterSponsors from "../components/FooterSponsors";
import { IMAGES } from "../constants/assets";
import "../styles/gracias.css";

export default function Gracias() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // opcional: limpiamos el slug recordado
    sessionStorage.removeItem("currentSlug");
    navigate("/Revisar");
  };

  return (
    <section
      className="thanks"
      style={{ "--bg-url": `url(${IMAGES.fondoGracias})` }}
    >
      {/* Fondo */}
      <div className="thanks__bg" />
      <div className="thanks__overlay" />

      {/* Header (logo arriba a la izquierda) */}
      <HeaderLogo />

      {/* Contenido */}
      <main className="thanks__content">
        {/* Marco/escudo + texto “¡Problema Solucionado!” */}
        <img
          src={IMAGES.problemaSolucionado}
          alt="¡Problema solucionado!"
          className="thanks__hero"
          draggable={false}
        />

        <button className="thanks__cta" onClick={handleContinue}>
          Continuar
        </button>
      </main>

      {/* Sponsors */}
      <FooterSponsors />
    </section>
  );
}
