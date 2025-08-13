import { Button, Container, Stack, Title, Text, Center } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../constants/assets';   // ⬅️ IMPORTANTE
import '../styles/home.css'

export default function Home() {
    const navigate = useNavigate()


    return (
        <section
      className="home" style={{ '--bg-url': `url(${IMAGES.bgHome})` }}
    >
      <div className="home__bg" />
      <div className="home__overlay" />
      <div className="home__vignette" />

      <div className="home__content">
        <div className="home__inner">
          <img
            src={IMAGES.logoPlayCheck}
            alt="Lenovo PlayCheck Desk"
            className="home__logo"
          />

          {/* Texto como imagen, pegado al logo */}
          <img
            src={IMAGES.texthome}
            alt="¡Bienvenido al PlayCheck Desk! Aquí ningún problema tecnológico queda sin revisión."
            className="home__texto"
          />

          <button
            className="home__cta-img"
            onClick={() => navigate('/seleccion')}
            aria-label="Comenzar"
            >
            <img src={IMAGES.btnComenzar} alt="Comenzar" />
          </button>
        </div>
      </div>

      <div className="home__sponsors">
        <img src={IMAGES.logosfooter} alt="Logos Sponsor" />
      </div>
    </section>
    )
   
}