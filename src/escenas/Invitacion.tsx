import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Aparece, Confeti, Fondo, Parrafo, Script, Separador, Titulo } from "../componentes";
import { SANS, SERIF } from "../fuentes";
import { COLORES } from "../tema";

export const Invitacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tarjeta = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const latido = 1 + 0.03 * Math.sin(frame / 6);
  return (
    <AbsoluteFill>
      <Fondo semilla="invitacion" />
      <Confeti semilla="invitacion" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 90px" }}>
        <Aparece retraso={0}>
          <Titulo size={96}>¡Estás cordialmente invitado!</Titulo>
        </Aparece>
        <Separador retraso={12} />
        <Aparece retraso={20}>
          <Parrafo size={46}>
            Con mucha alegría y gratitud a Dios, te invitamos a celebrar los
          </Parrafo>
        </Aparece>
        <Aparece retraso={30}>
          <Script size={120} style={{ margin: "10px 0" }}>
            50 años de Percy
          </Script>
        </Aparece>
        <div
          style={{
            marginTop: 40,
            padding: "40px 70px",
            border: `3px solid ${COLORES.dorado}`,
            borderRadius: 30,
            background: "rgba(255,246,230,0.08)",
            boxShadow: "0 0 60px rgba(232,195,116,0.25)",
            scale: String(interpolate(tarjeta, [0, 1], [0, 1]) * latido),
          }}
        >
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 40, letterSpacing: 8, color: COLORES.doradoClaro }}>
            FECHA
          </div>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 130, color: COLORES.crema, lineHeight: 1.05 }}>
            7 de
            <br />
            noviembre
          </div>
        </div>
        <Aparece retraso={75} style={{ marginTop: 50 }}>
          <Parrafo size={44}>
            Será una ocasión llena de cariño, unión y alegría. ¡Nos sentiremos muy felices de compartir contigo esta
            celebración tan especial!
          </Parrafo>
        </Aparece>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
