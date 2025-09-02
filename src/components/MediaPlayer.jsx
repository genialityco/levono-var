import React, { useEffect, useMemo, useRef } from "react";

export default function MediaPlayer({
  url,
  title,
  onEnded,
  className = "detail__video",
  autoPlay = true,
  controls = true,
  playsInline = true,
}) {
  const iframeRef = useRef(null);

  const isYouTube = useMemo(
    () => !!url && (url.includes("youtube.com") || url.includes("youtu.be")),
    [url]
  );

  // Construir URL de embed con JS API habilitada
  const embedUrl = useMemo(() => {
    if (!isYouTube) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
    if (!match) return null;
    const id = match[1];
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      controls: controls ? "1" : "0",
      autoplay: autoPlay ? "1" : "0",
      playsinline: "1",
      enablejsapi: "1",
      origin: window.location.origin,
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }, [isYouTube, url, controls, autoPlay]);

  // === YouTube: wire de eventos para detectar "ended" ===
  useEffect(() => {
    if (!isYouTube || !iframeRef.current) return;

    const frameWin = () => iframeRef.current?.contentWindow;

    // 1) handler de mensajes desde YT
    const handleMessage = (e) => {
      if (!e?.data) return;

      let data = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      // Formato nuevo: {event:'onStateChange', info: 0}
      if (data?.event === "onStateChange" && (data?.info === 0 || data?.data === 0)) {
        onEnded?.();
        return;
      }

      // Formato alterno: {event:'infoDelivery', info:{playerState:0}}
      if (data?.event === "infoDelivery" && data?.info?.playerState === 0) {
        onEnded?.();
        return;
      }

      // Cuando está listo, volvemos a registrar el listener por si faltó
      if (data?.event === "onReady") {
        try {
          frameWin()?.postMessage(
            JSON.stringify({
              event: "command",
              func: "addEventListener",
              args: ["onStateChange"],
            }),
            "*"
          );
        } catch {}
      }
    };

    window.addEventListener("message", handleMessage);

    // 2) Suscribirse a eventos del player (varias veces por si tarda)
    const ping = () => {
      try {
        const w = frameWin();
        if (!w) return;

        // Avisar que estamos "escuchando"
        w.postMessage(JSON.stringify({ event: "listening", id: "lenovo-player" }), "*");

        // Agregar el listener de stateChange (clave para detectar ended)
        w.postMessage(
          JSON.stringify({
            event: "command",
            func: "addEventListener",
            args: ["onStateChange"],
          }),
          "*"
        );
      } catch {}
    };

    const i1 = setInterval(ping, 500);
    const t1 = setTimeout(() => clearInterval(i1), 5000); // reintenta 5s

    return () => {
      clearInterval(i1);
      clearTimeout(t1);
      window.removeEventListener("message", handleMessage);
    };
  }, [isYouTube, onEnded]);

  if (!url) return null;

  // YouTube -> iframe dentro del mismo contenedor/clase
  if (isYouTube && embedUrl) {
    return (
      <div className={className}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title || "Media"}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          // sandbox ayuda en Electron/embeds sin romper la API
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    );
  }

  // Archivo local -> <video> nativo
  return (
    <video
      className={className}
      src={url}
      title={title}
      autoPlay={autoPlay}
      controls={controls}
      playsInline={playsInline}
      onEnded={onEnded}
    />
  );
}
