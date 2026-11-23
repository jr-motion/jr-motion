// Ikasi! funciona sin conexión: guarda la app, las imágenes y las fuentes en caché.
// Al cambiar cualquier archivo, sube el número de CACHE.
const CACHE = "ikasi-v24";
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
  "img/latxi-urrea.webp", "img/latxi-sin.webp",
  "img/latxi-salto.webp", "img/latxi-agurra.webp", "img/latxi-aspertuta.webp", "img/latxi-korrika.webp", "img/latxi-maiteminduta.webp", "img/latxi-haserre.webp", "img/latxi-negarrez.webp",
  // v1.13: kit de caras de Espioiaren bila
  "img/aurpegiak/base_m.webp", "img/aurpegiak/base_w.webp", "img/aurpegiak/beard_m_beltza.webp", "img/aurpegiak/beard_m_gorria.webp",
  "img/aurpegiak/beard_m_horia.webp", "img/aurpegiak/beard_m_marroia.webp", "img/aurpegiak/beard_m_urdina.webp", "img/aurpegiak/brow_m_beltza.webp",
  "img/aurpegiak/brow_m_gorria.webp", "img/aurpegiak/brow_m_horia.webp", "img/aurpegiak/brow_m_marroia.webp", "img/aurpegiak/brow_m_urdina.webp",
  "img/aurpegiak/brow_w_beltza.webp", "img/aurpegiak/brow_w_gorria.webp", "img/aurpegiak/brow_w_horia.webp", "img/aurpegiak/brow_w_marroia.webp",
  "img/aurpegiak/brow_w_urdina.webp", "img/aurpegiak/gl_m.webp", "img/aurpegiak/gl_w.webp", "img/aurpegiak/hair_m_laburra_kizkurra_beltza.webp",
  "img/aurpegiak/hair_m_laburra_kizkurra_gorria.webp", "img/aurpegiak/hair_m_laburra_kizkurra_horia.webp", "img/aurpegiak/hair_m_laburra_kizkurra_marroia.webp", "img/aurpegiak/hair_m_laburra_kizkurra_urdina.webp",
  "img/aurpegiak/hair_m_laburra_lisoa_beltza.webp", "img/aurpegiak/hair_m_laburra_lisoa_gorria.webp", "img/aurpegiak/hair_m_laburra_lisoa_horia.webp", "img/aurpegiak/hair_m_laburra_lisoa_marroia.webp",
  "img/aurpegiak/hair_m_laburra_lisoa_urdina.webp", "img/aurpegiak/hair_m_luzea_kizkurra_beltza.webp", "img/aurpegiak/hair_m_luzea_kizkurra_gorria.webp", "img/aurpegiak/hair_m_luzea_kizkurra_horia.webp",
  "img/aurpegiak/hair_m_luzea_kizkurra_marroia.webp", "img/aurpegiak/hair_m_luzea_kizkurra_urdina.webp", "img/aurpegiak/hair_m_luzea_lisoa_beltza.webp", "img/aurpegiak/hair_m_luzea_lisoa_gorria.webp",
  "img/aurpegiak/hair_m_luzea_lisoa_horia.webp", "img/aurpegiak/hair_m_luzea_lisoa_marroia.webp", "img/aurpegiak/hair_m_luzea_lisoa_urdina.webp", "img/aurpegiak/hair_w_laburra_kizkurra_beltza.webp",
  "img/aurpegiak/hair_w_laburra_kizkurra_gorria.webp", "img/aurpegiak/hair_w_laburra_kizkurra_horia.webp", "img/aurpegiak/hair_w_laburra_kizkurra_marroia.webp", "img/aurpegiak/hair_w_laburra_kizkurra_urdina.webp",
  "img/aurpegiak/hair_w_laburra_lisoa_beltza.webp", "img/aurpegiak/hair_w_laburra_lisoa_gorria.webp", "img/aurpegiak/hair_w_laburra_lisoa_horia.webp", "img/aurpegiak/hair_w_laburra_lisoa_marroia.webp",
  "img/aurpegiak/hair_w_laburra_lisoa_urdina.webp", "img/aurpegiak/hair_w_luzea_kizkurra_beltza.webp", "img/aurpegiak/hair_w_luzea_kizkurra_gorria.webp", "img/aurpegiak/hair_w_luzea_kizkurra_horia.webp",
  "img/aurpegiak/hair_w_luzea_kizkurra_marroia.webp", "img/aurpegiak/hair_w_luzea_kizkurra_urdina.webp", "img/aurpegiak/hair_w_luzea_lisoa_beltza.webp", "img/aurpegiak/hair_w_luzea_lisoa_gorria.webp",
  "img/aurpegiak/hair_w_luzea_lisoa_horia.webp", "img/aurpegiak/hair_w_luzea_lisoa_marroia.webp", "img/aurpegiak/hair_w_luzea_lisoa_urdina.webp", "img/aurpegiak/must_m_beltza.webp",
  "img/aurpegiak/must_m_gorria.webp", "img/aurpegiak/must_m_horia.webp", "img/aurpegiak/must_m_marroia.webp", "img/aurpegiak/must_m_urdina.webp",
  "img/aurpegiak/wr_m.webp", "img/aurpegiak/wr_w.webp",
  // v1.17: pantalla de carga (escena de caída) · v1.18: cabecera de Gramatika
  "img/caida-amona.webp", "img/caida-latxi.webp", "img/caida-peio.webp", "img/caida-joxe.webp",
  "img/caida-harri.webp", "img/caida-uxue.webp", "img/caida-ane.webp", "img/gramatika.webp"
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
