import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SANS, SERIF, SCRIPT } from "./fuentes";
import { COLORES, DEGRADADO_DORADO } from "./tema";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Fondo cálido con luces doradas (bokeh) que suben lentamente.
export const Fondo: React.FC<{ semilla?: string }> = ({ semilla = "fondo" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const luces = new Array(34).fill(0).map((_, i) => {
    const x = random(`${semilla}-x-${i}`) * width;
    const y0 = random(`${semilla}-y-${i}`) * height;
    const tam = 8 + random(`${semilla}-t-${i}`) * 46;
    const vel = 0.4 + random(`${semilla}-v-${i}`) * 1.4;
    const y = ((y0 - frame * vel) % (height + 200) + height + 200) % (height + 200) - 100;
    const brillo = 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(frame / 18 + i));
    return { x, y, tam, brillo, i };
  });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #5a1f33 0%, ${COLORES.fondo1} 45%, ${COLORES.fondo2} 100%)`,
      }}
    >
      {luces.map((l) => (
        <div
          key={l.i}
          style={{
            position: "absolute",
            left: l.x,
            top: l.y,
            width: l.tam,
            height: l.tam,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORES.doradoClaro} 0%, rgba(232,195,116,0.5) 40%, rgba(232,195,116,0) 70%)`,
            opacity: l.brillo,
            filter: l.tam > 35 ? "blur(3px)" : undefined,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Fondo hecho con la misma foto, desenfocada y oscurecida.
export const FondoFoto: React.FC<{ foto: string }> = ({ foto }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Img
        src={staticFile(foto)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(40px) brightness(0.45) saturate(1.2)",
          scale: String(1.25 + frame * 0.0006),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(42,15,28,0.35) 0%, rgba(42,15,28,0.2) 45%, rgba(18,10,24,0.92) 75%, rgba(18,10,24,0.98) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Foto con marco blanco, entrada con resorte y zoom lento (Ken Burns).
export const FotoMarco: React.FC<{
  foto: string;
  ancho: number;
  alto: number;
  top: number;
  giro?: number;
  posicion?: string;
}> = ({ foto, ancho, alto, top, giro = -2, posicion = "50% 30%" }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: (width - ancho) / 2,
        width: ancho,
        height: alto,
        padding: 18,
        paddingBottom: 18,
        background: "#fffaf0",
        borderRadius: 10,
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 3px rgba(232,195,116,0.6)",
        scale: String(interpolate(entrada, [0, 1], [0.85, 1])),
        opacity: interpolate(frame, [0, 12], [0, 1], clamp),
        rotate: `${interpolate(entrada, [0, 1], [giro * 3, giro])}deg`,
        translate: `0px ${interpolate(entrada, [0, 1], [80, 0])}px`,
      }}
    >
      <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 4 }}>
        <Img
          src={staticFile(foto)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: posicion,
            scale: String(interpolate(frame, [0, 240], [1.02, 1.14], clamp)),
          }}
        />
      </div>
    </div>
  );
};

// Bloque de texto que aparece desde abajo con un pequeño retraso.
export const Aparece: React.FC<{
  retraso: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ retraso, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - retraso, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: interpolate(frame, [retraso, retraso + 15], [0, 1], clamp),
        translate: `0px ${interpolate(p, [0, 1], [40, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Script: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = 110,
  style,
}) => (
  <div
    style={{
      fontFamily: SCRIPT,
      fontSize: size,
      color: COLORES.dorado,
      lineHeight: 1.1,
      textShadow: "0 4px 20px rgba(0,0,0,0.5)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Titulo: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = 84,
  style,
}) => (
  <div
    style={{
      fontFamily: SERIF,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.15,
      backgroundImage: DEGRADADO_DORADO,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.55))",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Parrafo: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = 48,
  style,
}) => (
  <div
    style={{
      fontFamily: SANS,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.4,
      color: COLORES.crema,
      textShadow: "0 3px 12px rgba(0,0,0,0.7)",
      ...style,
    }}
  >
    {children}
  </div>
);

// Línea decorativa dorada con un rombo al centro.
export const Separador: React.FC<{ retraso?: number }> = ({ retraso = 0 }) => {
  const frame = useCurrentFrame();
  const ancho = interpolate(frame, [retraso, retraso + 25], [0, 260], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, margin: "24px 0" }}>
      <div style={{ width: ancho, height: 2, background: `linear-gradient(90deg, transparent, ${COLORES.dorado})` }} />
      <div
        style={{
          width: 16,
          height: 16,
          background: COLORES.dorado,
          rotate: "45deg",
          opacity: interpolate(frame, [retraso + 10, retraso + 25], [0, 1], clamp),
        }}
      />
      <div style={{ width: ancho, height: 2, background: `linear-gradient(270deg, transparent, ${COLORES.dorado})` }} />
    </div>
  );
};

export const Corazon: React.FC<{ size: number; color?: string; style?: React.CSSProperties }> = ({
  size,
  color = "#e0455c",
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path
      fill={color}
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

// Confeti dorado y de colores que cae (para la invitación y el cierre).
export const Confeti: React.FC<{ semilla?: string; cantidad?: number }> = ({ semilla = "confeti", cantidad = 70 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const colores = [COLORES.dorado, COLORES.doradoClaro, "#e0455c", "#ffffff", "#f29e4c", "#7fc8f8"];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(cantidad).fill(0).map((_, i) => {
        const x0 = random(`${semilla}-x-${i}`) * width;
        const vel = 3 + random(`${semilla}-v-${i}`) * 5;
        const inicio = random(`${semilla}-s-${i}`) * 90;
        const y = -60 + (frame - inicio) * vel;
        const x = x0 + Math.sin((frame + i * 10) / 15) * 30;
        if (y < -60 || y > height + 60) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 14,
              height: 24,
              borderRadius: 3,
              background: colores[i % colores.length],
              rotate: `${frame * (4 + (i % 5)) + i * 37}deg`,
              opacity: 0.9,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
