import React from "react";
import { Composition, Folder } from "remotion";
import "./fuentes";
import { Cumple50Percy, DURACION_TOTAL } from "./Cumple50Percy";
import { Cierre } from "./escenas/Cierre";
import { Deseos } from "./escenas/Deseos";
import { Intro } from "./escenas/Intro";
import { Invitacion } from "./escenas/Invitacion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Cumple50Percy"
        component={Cumple50Percy}
        durationInFrames={DURACION_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Escenas">
        <Composition id="Intro" component={Intro} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="Deseos" component={Deseos} durationInFrames={210} fps={30} width={1080} height={1920} />
        <Composition id="Invitacion" component={Invitacion} durationInFrames={270} fps={30} width={1080} height={1920} />
        <Composition id="Cierre" component={Cierre} durationInFrames={240} fps={30} width={1080} height={1920} />
      </Folder>
    </>
  );
};
