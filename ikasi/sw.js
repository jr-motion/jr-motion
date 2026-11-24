// Ikasi! funciona sin conexión: guarda la app, las imágenes y las fuentes en caché.
// Al cambiar cualquier archivo, sube el número de CACHE.
const CACHE = "ikasi-v34";
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
  "img/caida-harri.webp", "img/caida-uxue.webp", "img/caida-ane.webp", "img/gramatika.webp",
  // v1.34: oficios con dibujo
  "img/lan-abeltzaina.webp", "img/lan-abokatua.webp", "img/lan-aktorea.webp", "img/lan-albaitaria.webp",
  "img/lan-argazkilaria.webp", "img/lan-arkitektoa.webp", "img/lan-elektrikaria.webp", "img/lan-enpresaria.webp",
  "img/lan-eraikitzailea.webp", "img/lan-erizaina.webp", "img/lan-errementaria.webp", "img/lan-garbitzailea.webp",
  "img/lan-gidaria.webp", "img/lan-harakina.webp", "img/lan-idazlea.webp", "img/lan-igeltseroa.webp",
  "img/lan-ile-apaintzailea.webp", "img/lan-informatikaria.webp", "img/lan-iturgina.webp", "img/lan-kazetaria.webp",
  "img/lan-lorazaina.webp", "img/lan-mekanikaria.webp", "img/lan-pilotua.webp", "img/lan-polizia.webp",
  "img/lan-postaria.webp", "img/lan-saltzailea.webp", "img/lan-sendagilea.webp", "img/lan-suhiltzailea.webp",
  // v1.37-v1.38: estados de Nola dago?
  "img/ego-pozik.webp", "img/ego-haserre.webp", "img/ego-triste.webp", "img/ego-urduri.webp",
  "img/ego-harrituta.webp", "img/ego-beldurtuta.webp", "img/ego-negarrez.webp", "img/ego-nekatuta.webp",
  "img/ego-gaixorik.webp", "img/ego-lotan.webp", "img/ego-esna.webp", "img/ego-zutik.webp",
  "img/ego-eserita.webp", "img/ego-etzanda.webp", "img/ego-garbi.webp", "img/ego-zikin.webp",
  // v1.39: partes del cuerpo
  "img/gor-aurpegia.webp", "img/gor-ilea.webp", "img/gor-begiak.webp", "img/gor-bekainak.webp",
  "img/gor-sudurra.webp", "img/gor-belarriak.webp", "img/gor-ahoa.webp", "img/gor-masailak.webp",
  "img/gor-lepoa.webp", "img/gor-besoa.webp", "img/gor-eskua.webp", "img/gor-behatzak.webp",
  "img/gor-hanka.webp", "img/gor-oina.webp",
  "img/nork-ireki.webp", "img/nork-itxi.webp", "img/nork-igo.webp", "img/nork-jaitsi.webp", "img/nork-jaiki.webp", "img/nork-erori.webp", "img/nork-jan.webp", "img/nork-edan.webp", "img/nork-erosi.webp", "img/nork-garbitu.webp", "img/nork-ikusi.webp", "img/nork-galdu.webp"
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
