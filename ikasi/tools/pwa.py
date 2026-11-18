"""Convierte el index.html del artefacto de Claude en la versión web-app (PWA) de GitHub Pages.

Uso: python3 tools/pwa.py <index.html del artefacto> <ikasi/index.html de salida>

Cambios que aplica (el original del artefacto no se toca):
- Fuente Montserrat local (fonts/) en vez de Google Fonts, para que funcione sin conexión.
- Manifest, iconos de iOS/Android y modo pantalla completa.
- Registro del service worker (sw.js).
- Fuera de claude.ai no hay base de datos: las fichas de Claude se leen de decks.json.
"""
import sys

src, dst = sys.argv[1], sys.argv[2]
html = open(src, encoding="utf-8").read()

def swap(old, new):
    global html
    if html.count(old) != 1:
        sys.exit(f"No encuentro (o está repetido) en el HTML:\n{old}")
    html = html.replace(old, new)

FONTS = "".join(
    f"@font-face{{font-family:Montserrat;font-style:normal;font-display:swap;font-weight:{w};"
    f"src:url(fonts/montserrat-latin-{w}-normal.woff2) format('woff2')}}"
    for w in (600, 700, 800, 900)
)

swap('<link rel="preconnect" href="https://fonts.googleapis.com">\n', "")
swap('<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">\n',
     f"<style>{FONTS}</style>\n")
swap('<link rel="icon" href="img/icon-96.png">',
     '<link rel="icon" type="image/png" href="icon-192.png">\n'
     '<link rel="manifest" href="manifest.webmanifest">\n'
     '<link rel="apple-touch-icon" href="icon-180.png">\n'
     '<meta name="apple-mobile-web-app-capable" content="yes">\n'
     '<meta name="mobile-web-app-capable" content="yes">\n'
     '<meta name="apple-mobile-web-app-title" content="Ikasi!">\n'
     '<meta name="apple-mobile-web-app-status-bar-style" content="default">')

swap("if(!window.claude||typeof window.claude.use!=='function') return;",
     "if(!window.claude||typeof window.claude.use!=='function'){ loadStaticDecks(); return; }")

swap("</script>\n</body>",
     """/* web-app (GitHub Pages): fichas de decks.json y funcionamiento sin conexión */
async function loadStaticDecks(){
  try{
    const r=await fetch('decks.json',{cache:'no-cache'}); if(!r.ok) return;
    const list=await r.json();
    CLOUD_DECKS=(Array.isArray(list)?list:[]).map(d=>Object.assign({},d,{cloud:true})).filter(d=>d.id&&Array.isArray(d.words));
    rebuildIndex(); if(!R){ renderTop(); if(TAB==='dict') fillDict() }
  }catch(e){}
}
if('serviceWorker' in navigator){
  const had=!!navigator.serviceWorker.controller; let reloaded=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{ if(had&&!reloaded&&!R){ reloaded=true; location.reload() } });
  navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{});
}
</script>
</body>""")

open(dst, "w", encoding="utf-8").write(html)
print("OK", dst)
