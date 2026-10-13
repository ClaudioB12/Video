import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparece, Fondo, Parrafo, Script, Separador, Titulo } from "../componentes";
import { SERIF } from "../fuentes";
import { DEGRADADO_DORADO } from "../tema";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 15, fps, config: { damping: 9, mass: 1.1 } });
  const brillo = interpolate(frame, [40, 100], [-120, 220], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Fondo semilla="intro" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 90px" }}>
        <Aparece retraso={0}>
          <Script size={120}>Celebrando los</Script>
        </Aparece>
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 520,
            lineHeight: 1,
            margin: "10px 0 0",
            backgroundImage: `linear-gradient(110deg, rgba(255,255,255,0) ${brillo - 20}%, rgba(255,255,255,0.9) ${brillo}%, rgba(255,255,255,0) ${brillo + 20}%), ${DEGRADADO_DORADO}`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.6))",
            scale: String(interpolate(pop, [0, 1], [0.2, 1])),
            opacity: interpolate(frame, [15, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          50
        </div>
        <Aparece retraso={35}>
          <Titulo size={110}>años de Percy</Titulo>
        </Aparece>
        <Separador retraso={50} />
        <Aparece retraso={60}>
          <Parrafo size={50}>
            50 años de vida, esfuerzo, fortaleza
            <br />y amor por la familia.
          </Parrafo>
        </Aparece>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
