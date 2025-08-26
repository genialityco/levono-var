import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AUDIOS } from '../constants/assets';

/**
 * Reproduce una pista de ambiente en loop.
 * - Arranca sólo después del primer gesto del usuario (para evitar bloqueos).
 * - Aplica "ducking" (baja de volumen suave) cuando:
 *   a) la ruta es de video protagonista (ej. /solucion, /encuesta)
 *   b) o detecta un <video data-foreground-video> reproduciéndose.
 */
export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const { pathname } = useLocation();

  const BASE_VOL = 0.35;   // volumen normal
  const DUCK_VOL = 0.06;   // volumen bajado
  const RAMP_MS  = 400;    // ms para el fade

  // Fade suave de volumen
  const rampVolume = (target) => {
    const el = audioRef.current;
    if (!el) return;
    const start = el.volume ?? 0;
    const delta = target - start;
    if (Math.abs(delta) < 0.005) { el.volume = target; return; }

    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / RAMP_MS);
      el.volume = start + delta * p;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Arranca tras primer gesto del usuario (click/tap/tecla)
  useEffect(() => {
    const start = () => {
      const el = audioRef.current;
      if (!el) return;
      el.muted = false;
      el.volume = BASE_VOL;
      el.play().catch(() => {/* si falla, el siguiente gesto lo desbloquea */});
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  // “Ducking” por ruta (simplísimo)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    // Rutas donde hay video protagonista
    const routeHasForegroundVideo =
      pathname.startsWith('/solucion') ||
      pathname.startsWith('/encuesta');

    rampVolume(routeHasForegroundVideo ? DUCK_VOL : BASE_VOL);
  }, [pathname]);

  // “Ducking” cuando detecta un <video data-foreground-video> en play
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

   // let currentPlaying = 0;

    const selector = 'video[data-foreground-video]';
    const handleState = () => {
      // si hay al menos un foreground en play → duck
      const anyPlaying = [...document.querySelectorAll(selector)]
        .some(v => !v.paused && !v.ended);
      rampVolume(anyPlaying ? DUCK_VOL : BASE_VOL);
    };

    const attach = (video) => {
      video.addEventListener('play', handleState);
      video.addEventListener('pause', handleState);
      video.addEventListener('ended', handleState);
    };
    const detach = (video) => {
      video.removeEventListener('play', handleState);
      video.removeEventListener('pause', handleState);
      video.removeEventListener('ended', handleState);
    };

    // Adjunta a los actuales
    const initial = document.querySelectorAll(selector);
    initial.forEach(attach);
    //currentPlaying = initial.length;

    // Observa el DOM por si se montan/desmontan videos protagonistas
    const mo = new MutationObserver(() => {
      const vids = document.querySelectorAll(selector);
      // para simpleza, desata y reata a todos (son muy pocos)
      initial.forEach(detach);
      vids.forEach(attach);
      //currentPlaying = vids.length;
      handleState();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Chequeo inicial
    handleState();

    return () => {
      mo.disconnect();
      document.querySelectorAll(selector).forEach(detach);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={AUDIOS.backgroundaudio}   // ← define esta clave en assets.js
      loop
      preload="auto"
      muted      // se desmuta tras el primer gesto
      style={{ display: 'none' }}
    />
  );
}
