# Video: 50 años de Percy

Video de cumpleaños/invitación hecho con [Remotion](https://www.remotion.dev) (React → MP4), vertical 1080×1920, ~60 s.

## Estructura

- `src/Cumple50Percy.tsx`: la línea de tiempo (escenas, duraciones y transiciones).
- `src/escenas/`: cada escena (Intro, EscenaFoto, Deseos, Invitación, Cierre). Aquí se cambian los textos.
- `src/componentes.tsx`: fondo con luces, marcos de foto, confeti, animaciones de texto.
- `src/tema.ts`: colores.
- `public/fotos/`: fotos usadas (la 3 está enderezada y la 5 recortada).
- `public/fonts/`: fuentes Great Vibes, Playfair Display y Montserrat.

## Uso

```bash
npm install
npm run dev      # Remotion Studio (vista previa en el navegador)
npm run render   # genera out/cumple-50-percy.mp4
```

Si Remotion no puede descargar su Chrome, indica uno ya instalado:
`REMOTION_CHROME=/ruta/a/chrome npm run render`.
