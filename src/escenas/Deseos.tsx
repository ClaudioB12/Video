import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparece, Fondo, Parrafo, Script, Separador, Titulo } from "../componentes";

const Polaroid: React.FC<{ foto: string; x: number; y: number; giro: number; retraso: number; posicion?: string }> = ({
  foto,
  x,
  y,
  giro,
  retraso,
  posicion = "50% 30%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - retraso, fps, config: { damping: 12 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 380,
        height: 470,
        padding: "16px 16px 50px",
        background: "#fffaf0",
        borderRadius: 6,
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        rotate: `${giro}deg`,
        scale: String(interpolate(p, [0, 1], [1.6, 1])),
        opacity: interpolate(frame, [retraso, retraso + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}
    >
      <Img src={staticFile(foto)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: posicion }} />
    </div>
  );
};

export const Deseos: React.FC = () => {
  return (
    <AbsoluteFill>
      <Fondo semilla="deseos" />
      <Polaroid foto="fotos/foto2.jpg" x={70} y={150} giro={-8} retraso={0} posicion="50% 20%" />
      <Polaroid foto="fotos/foto4.jpg" x={630} y={130} giro={7} retraso={8} />
      <Polaroid foto="fotos/foto3.jpg" x={350} y={430} giro={-2} retraso={16} posicion="40% 30%" />
      <AbsoluteFill
        style={{ top: 1000, height: "auto", padding: "0 90px 100px", alignItems: "center", justifyContent: "center", textAlign: "center" }}
      >
        <Aparece retraso={25}>
          <Script size={100}>Que esta nueva etapa</Script>
        </Aparece>
        <Aparece retraso={35}>
          <Titulo size={72}>esté llena de salud, paz, felicidad y muchas bendiciones</Titulo>
        </Aparece>
        <Separador retraso={50} />
        <Aparece retraso={60}>
          <Parrafo size={44}>
            Que nunca le falten el amor de su esposa, el cariño de sus hijos y la compañía de sus hermanos.
          </Parrafo>
        </Aparece>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
