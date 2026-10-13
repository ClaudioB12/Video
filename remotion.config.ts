import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// En entornos sin internet hacia remotion.media, apunta a un Chrome ya instalado:
// REMOTION_CHROME=/ruta/a/headless_shell npm run render
if (process.env.REMOTION_CHROME) {
  Config.setBrowserExecutable(process.env.REMOTION_CHROME);
}
