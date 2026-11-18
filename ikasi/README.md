# Ikasi! · web-app de euskera (A0–A2)

Versión instalable (PWA) de la app que vive como artefacto en claude.ai.
Se publica con GitHub Pages en `/ikasi/`.

- `index.html`: se genera desde el `index.html` del artefacto con `python3 tools/pwa.py <origen> index.html`. No editar a mano: los cambios se hacen en el artefacto y se regenera.
- `decks.json`: copia de las fichas de la base de datos del artefacto (`decks/<id>`). Fuera de claude.ai no hay base de datos, así que hay que volver a exportarla cuando se añadan fichas.
- `img/`: personajes, escena e icono interno (iguales que en el artefacto).
- `icon-*.png`: iconos de la web-app, generados con `tools/make_icons.py` desde la imagen original.
- `sw.js`: caché para usarla sin conexión. Subir `CACHE` en cada actualización.
- El progreso se guarda en el navegador (localStorage) de cada dispositivo.
