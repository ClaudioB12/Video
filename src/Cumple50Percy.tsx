import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Audio } from "@remotion/media";
import { interpolate, staticFile, useVideoConfig } from "remotion";
import "./fuentes";
import { Cierre } from "./escenas/Cierre";
import { Deseos } from "./escenas/Deseos";
import { EscenaFoto } from "./escenas/EscenaFoto";
import { Intro } from "./escenas/Intro";
import { Invitacion } from "./escenas/Invitacion";

// Duración de cada transición (en frames). Si la cambias, ajusta DURACION_TOTAL.
const T = 20;
const transicion = linearTiming({ durationInFrames: T });

export const Cumple50Percy: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <>
      {/* Música original (scripts/componer_musica.py), con fundido de entrada y salida */}
      <Audio
        name="Música"
        src={staticFile("musica/musica-sentimental.mp3")}
        volume={(f) =>
          interpolate(f, [0, fps, durationInFrames - 2 * fps, durationInFrames], [0, 0.9, 0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Intro" durationInFrames={6 * fps} premountFor={fps}>
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transicion} />

        <TransitionSeries.Sequence name="Mucho más que un cumpleaños" durationInFrames={7 * fps} premountFor={fps}>
          <EscenaFoto
            foto="fotos/foto1.jpg"
            posicion="50% 25%"
            titulo="Hoy celebramos mucho más que un cumpleaños"
            texto="Celebramos la vida de un hombre que ha demostrado fortaleza, valentía y perseverancia."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={transicion} />

        <TransitionSeries.Sequence name="Hijo, hermano, esposo, padre" durationInFrames={7 * fps} premountFor={fps}>
          <EscenaFoto
            foto="fotos/foto4.jpg"
            posicion="50% 35%"
            giro={2}
            titulo="Hijo, hermano mayor, esposo, padre y abuelo ejemplar"
            texto="Ha sabido salir adelante con esfuerzo y dedicación, por el bienestar de quienes ama."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transicion} />

        <TransitionSeries.Sequence name="Fortaleza" durationInFrames={7 * fps} premountFor={fps}>
          <EscenaFoto
            foto="fotos/foto3.jpg"
            anchoFoto={900}
            altoFoto={820}
            topFoto={200}
            giro={-2}
            titulo="Más fuerte que las dificultades"
            texto="Encontró la fuerza para superar los obstáculos y ser un gran apoyo para sus hermanos: estar presente, orientar y tender la mano."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={transicion} />

        <TransitionSeries.Sequence name="Su familia" durationInFrames={7 * fps} premountFor={fps}>
          <EscenaFoto
            foto="fotos/foto2.jpg"
            posicion="50% 15%"
            giro={2}
            titulo="Su familia, su mayor motor"
            texto="Su esposa, sus tres hijos y sus hermanos son las razones que lo impulsan a seguir adelante."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transicion} />

        <TransitionSeries.Sequence name="Cinco décadas" durationInFrames={7 * fps} premountFor={fps}>
          <EscenaFoto
            foto="fotos/foto5.jpg"
            posicion="50% 30%"
            titulo="Este 7 de noviembre cumple 50 años"
            texto="Cinco décadas de experiencias, enseñanzas y recuerdos. Gracias a Dios por su vida."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transicion} />

        <TransitionSeries.Sequence name="Deseos" durationInFrames={7 * fps} premountFor={fps}>
          <Deseos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={transicion} />

        <TransitionSeries.Sequence name="Invitación" durationInFrames={9 * fps} premountFor={fps}>
          <Invitacion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transicion} />

        <TransitionSeries.Sequence name="Cierre" durationInFrames={8 * fps} premountFor={fps}>
          <Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

// 65 s de escenas menos 8 transiciones de 20 frames, a 30 fps.
export const DURACION_TOTAL = 65 * 30 - 8 * T;
