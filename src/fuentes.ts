import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const SCRIPT = "Great Vibes";
export const SERIF = "Playfair Display";
export const SANS = "Montserrat";

loadFont({ family: SCRIPT, url: staticFile("fonts/great-vibes-latin-400-normal.woff2"), weight: "400" });
loadFont({ family: SERIF, url: staticFile("fonts/playfair-display-latin-700-normal.woff2"), weight: "700" });
loadFont({ family: SERIF, url: staticFile("fonts/playfair-display-latin-400-italic.woff2"), weight: "400", style: "italic" });
loadFont({ family: SANS, url: staticFile("fonts/montserrat-latin-400-normal.woff2"), weight: "400" });
loadFont({ family: SANS, url: staticFile("fonts/montserrat-latin-600-normal.woff2"), weight: "600" });
