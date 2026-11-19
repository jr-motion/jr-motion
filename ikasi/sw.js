// Ikasi! funciona sin conexión: guarda la app, las imágenes y las fuentes en caché.
// Al cambiar cualquier archivo, sube el número de CACHE.
const CACHE = "ikasi-v7";
const CORE = [
  "./", "index.html", "manifest.webmanifest", "decks.json",
  "icon-180.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png",
  "fonts/montserrat-latin-600-normal.woff2", "fonts/montserrat-latin-700-normal.woff2",
  "fonts/montserrat-latin-800-normal.woff2", "fonts/montserrat-latin-900-normal.woff2",
  "img/icon.webp", "img/icon-96.png", "img/scene.webp",
  "img/latxi.webp", "img/ane.webp", "img/joxe.webp", "img/uxue.webp",
  "img/peio.webp", "img/miren.webp", "img/harri.webp",
  // v1.4: personajes, escena del caserío y animales
  "img/unai.webp", "img/aitor.webp", "img/olentzero.webp", "img/maialen.webp", "img/koldo.webp",
  "img/nerea.webp", "img/itziar.webp", "img/patxi.webp", "img/maddi.webp", "img/basajaun.webp",
  "img/gorka.webp", "img/kepa.webp", "img/txomin.webp", "img/karmele.webp", "img/jon.webp",
  "img/eneko.webp", "img/irati.webp", "img/baserria.webp",
  "img/astoa.webp", "img/zaldia.webp", "img/txerria.webp", "img/txakurra.webp", "img/katua.webp",
  "img/usoa.webp", "img/txoria.webp", "img/ahuntza.webp", "img/hartza.webp", "img/sagua.webp", "img/untxia.webp",
  // v1.9: celebraciones de fin de lección
  "img/latxi-toga.webp", "img/bikain-azterketa.webp", "img/latxi-indartsu.webp",
  "img/kapsula-sua.webp", "img/kapsula-mamua.webp", "img/kapsula-lasai.webp",
  // v1.9.1: nivel terminado
  "img/latxi-urrea.webp"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("ikasi-") && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || !url.pathname.startsWith(new URL("./", self.registration.scope).pathname)) return;
  // Red primero para recibir actualizaciones; caché si no hay conexión.
  e.respondWith(fetch(e.request, {cache: "no-cache"})
    .then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
});
