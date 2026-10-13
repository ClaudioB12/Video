import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparece, Confeti, Corazon, FondoFoto, FotoMarco, Parrafo, Script, Titulo } from "../componentes";

export const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 70, fps, config: { damping: 8 } });
  const latido = 1 + 0.08 * Math.max(0, Math.sin(frame / 5));
  return (
    <AbsoluteFill>
      <FondoFoto foto="fotos/foto1.jpg" />
      <FotoMarco foto="fotos/foto1.jpg" ancho={640} alto={820} top={120} giro={2} posicion="50% 20%" />
      <Confeti semilla="cierre" cantidad={60} />
      <AbsoluteFill style={{ top: 1000, height: "auto", padding: "0 80px 100px", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <Aparece retraso={15}>
          <Script size={130}>¡Felices 50 años,</Script>
        </Aparece>
        <Aparece retraso={28}>
          <Titulo size={150}>Percy!</Titulo>
        </Aparece>
        <Aparece retraso={45} style={{ marginTop: 20 }}>
          <Parrafo size={46}>
            Que Dios bendiga siempre tu vida y te permita seguir disfrutando del amor de tu hermosa familia.
          </Parrafo>
        </Aparece>
        <div style={{ marginTop: 30, scale: String(interpolate(pop, [0, 1], [0, 1]) * latido) }}>
          <Corazon size={120} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
