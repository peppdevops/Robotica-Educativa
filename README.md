# Robótica Educativa — Métodos Activos

## Preparar la publicación

Requiere Node.js y npm. Ejecutar desde la carpeta del proyecto:

```sh
npm ci
npm run build
npm test
```

Subir **el contenido de `dist/`** al alojamiento estático elegido. Su `index.html` debe quedar en la raíz de la carpeta publicada. No subir `node_modules` ni las carpetas de caché.

La versión generada incluye todas las secciones en el HTML y el CSS de Tailwind local. Se puede alojar en la raíz de un dominio o en una subcarpeta. No necesita servidor Node.js en producción. Las fuentes y los iconos utilizan servicios externos.

## Editar

Modificar `index.html`, `sections/`, `components/`, `css/` y `js/`, y volver a ejecutar `npm run build`. No editar `dist/` directamente: se regenera.

Para previsualizar los archivos fuente, usar un servidor HTTP local; su carga de fragmentos requiere HTTP. La versión publicada se encuentra en `dist/`.
