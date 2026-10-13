import React from "react";
import { AbsoluteFill } from "remotion";
import { Aparece, FondoFoto, FotoMarco, Parrafo, Separador, Titulo } from "../componentes";

export type EscenaFotoProps = {
  foto: string;
  titulo: string;
  texto: string;
  // Medidas del marco de la foto (la foto 3 es horizontal).
  anchoFoto?: number;
  altoFoto?: number;
  topFoto?: number;
  giro?: number;
  posicion?: string;
};

export const EscenaFoto: React.FC<EscenaFotoProps> = ({
  foto,
  titulo,
  texto,
  anchoFoto = 800,
  altoFoto = 1020,
  topFoto = 130,
  giro = -2,
  posicion,
}) => {
  const topTexto = topFoto + altoFoto + 70;
  return (
    <AbsoluteFill>
      <FondoFoto foto={foto} />
      <FotoMarco foto={foto} ancho={anchoFoto} alto={altoFoto} top={topFoto} giro={giro} posicion={posicion} />
      <div
        style={{
          position: "absolute",
          top: topTexto,
          left: 80,
          right: 80,
          bottom: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Aparece retraso={18}>
          <Titulo size={76}>{titulo}</Titulo>
        </Aparece>
        <Separador retraso={30} />
        <Aparece retraso={38}>
          <Parrafo size={46}>{texto}</Parrafo>
        </Aparece>
      </div>
    </AbsoluteFill>
  );
};
