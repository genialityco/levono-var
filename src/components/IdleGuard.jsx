import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Vigila inactividad y redirige a "/".
 * - Cuenta inactividad real (sin mover mouse/teclas/touch/wheel).
 * - Se re-inicia al cambiar de ruta.
 * - Si hay un <video> reproduciéndose, NO redirige.
 * - Redirige aunque la pestaña esté en segundo plano.
 */
export default function IdleGuard({ timeoutMs = 60000, tickMs = 1000 }) {
  const navigate = useNavigate()
  const location = useLocation()

  const lastActiveAt = useRef(Date.now())
  const intervalRef = useRef(null)

  const isAnyVideoPlaying = () => {
    const videos = document.querySelectorAll('video')
    for (const v of videos) {
      if (v && !v.paused && !v.ended && v.readyState > 2) return true
    }
    return false
  }

  const markActive = () => { lastActiveAt.current = Date.now() }

  useEffect(() => {
    // 1) al entrar / cambiar de ruta, lo consideramos actividad
    markActive()

    // 2) listeners de interacción del usuario
    const events = ['pointermove','mousedown','keydown','touchstart','wheel']
    events.forEach(e => window.addEventListener(e, markActive, { passive: true }))

    // 3) chequeo periódico del tiempo inactivo
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (isAnyVideoPlaying()) return // no contamos inactividad si hay video en play

      const idleFor = Date.now() - lastActiveAt.current
      if (idleFor >= timeoutMs) {
        if (location.pathname !== '/') {
          navigate('/', { replace: true })
        }
        // tras redirigir, reseteamos el contador para seguir vigilando
        markActive()
      }
    }, tickMs)

    // 4) limpieza
    return () => {
      events.forEach(e => window.removeEventListener(e, markActive))
      clearInterval(intervalRef.current)
    }
  }, [location.pathname, timeoutMs, tickMs, navigate])

  return null
}
