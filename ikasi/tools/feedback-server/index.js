// Ikasi! · feedback → Telegram
// Recibe avisos de la app (errores en ejercicios e ideas) y los reenvía
// por Telegram al chat del propietario. El token del bot vive solo aquí,
// en las variables de entorno de Cloud Run, nunca en la app.
//
// Variables de entorno:
//   TG_TOKEN         token del bot (obligatoria)
//   TG_CHAT          chat_id al que se envían los avisos (obligatoria)
//   ALLOWED_ORIGINS  orígenes permitidos, separados por comas (opcional)
//   TG_API           base de la API de Telegram (solo para pruebas)

const http = require('http');

const TOKEN = process.env.TG_TOKEN || '';
const CHAT = process.env.TG_CHAT || '';
const TG_API = process.env.TG_API || 'https://api.telegram.org';
const PORT = process.env.PORT || 8080;

const ORIGINS = (process.env.ALLOWED_ORIGINS ||
  'https://jr-motion.com,https://www.jr-motion.com,https://jr-motion.github.io')
  .split(',').map(s => s.trim()).filter(Boolean);
// Las páginas de artefactos de Claude se sirven desde dominios propios de Claude.
const ORIGIN_SUFFIXES = ['.claudeusercontent.com', '.claude.ai', '.claude.site'];

const MAX_BODY = 8 * 1024;      // bytes por petición
const MAX_TEXT = 1000;          // caracteres del comentario
const MAX_FIELD = 300;          // caracteres por campo de contexto
const PER_IP = { n: 5, ms: 10 * 60 * 1000 };   // 5 avisos cada 10 min por IP
const GLOBAL = { n: 60, ms: 60 * 60 * 1000 };  // 60 avisos por hora en total

const KINDS = {
  akatsa: '⚠️ Error en un ejercicio',
  ideia: '💡 Idea',
  iruzkina: '💬 Comentario',
};

const hits = new Map();   // ip -> [tiempos]
let globalHits = [];

function originOk(o) {
  if (!o) return false;
  if (ORIGINS.includes(o)) return true;
  try {
    const h = new URL(o).hostname;
    return new URL(o).protocol === 'https:' && ORIGIN_SUFFIXES.some(s => h.endsWith(s));
  } catch { return false; }
}

function limited(ip) {
  const now = Date.now();
  globalHits = globalHits.filter(t => now - t < GLOBAL.ms);
  const list = (hits.get(ip) || []).filter(t => now - t < PER_IP.ms);
  if (list.length >= PER_IP.n || globalHits.length >= GLOBAL.n) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  globalHits.push(now);
  if (hits.size > 5000) hits.clear();
  return false;
}

const clip = (v, n) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n);
const strip = s => s.replace(/<[^>]*>/g, '');   // las explicaciones de la app llevan html

function buildMessage(d) {
  const kind = KINDS[d.kind] ? d.kind : 'iruzkina';
  const c = d.ctx && typeof d.ctx === 'object' ? d.ctx : {};
  const lines = [KINDS[kind]];
  const text = clip(d.text, MAX_TEXT);
  if (text) lines.push('', text);
  const ctx = [
    ['Versión', c.v],
    ['Lección', c.lesson],
    ['Ejercicio', c.type],
    ['Enunciado', c.q],
    ['Opciones', Array.isArray(c.opts) ? c.opts.join(' · ') : c.opts],
    ['Correcta', c.answer],
    ['Respondió', c.given],
    ['Explicación', c.x && strip(String(c.x))],
  ].filter(([, v]) => v != null && String(v).trim() !== '')
   .map(([k, v]) => `${k}: ${clip(v, MAX_FIELD)}`);
  if (ctx.length) lines.push('', ...ctx);
  const meta = [clip(d.src, 20), clip(d.name, 40)].filter(Boolean).join(' · ');
  if (meta) lines.push('', `— ${meta}`);
  return lines.join('\n').slice(0, 3900);
}

async function sendTelegram(text) {
  const r = await fetch(`${TG_API}/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT, text, disable_web_page_preview: true }),
  });
  if (!r.ok) throw new Error(`Telegram ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

function send(res, status, body, origin) {
  const h = { 'Content-Type': 'application/json; charset=utf-8', 'Vary': 'Origin' };
  if (origin && originOk(origin)) {
    h['Access-Control-Allow-Origin'] = origin;
    h['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    h['Access-Control-Allow-Headers'] = 'Content-Type';
    h['Access-Control-Max-Age'] = '86400';
  }
  res.writeHead(status, h);
  res.end(body == null ? '' : JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || '';
  const path = req.url.split('?')[0];

  if (req.method === 'GET' && path === '/') return send(res, 200, { ok: true }, origin);
  if (req.method === 'OPTIONS') return send(res, originOk(origin) ? 204 : 403, null, origin);
  if (req.method !== 'POST' || path !== '/feedback') return send(res, 404, { ok: false }, origin);
  if (!originOk(origin)) return send(res, 403, { ok: false, error: 'origin' }, origin);

  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  let size = 0, chunks = [], tooBig = false;
  req.on('data', ch => {
    size += ch.length;
    if (tooBig) return;
    if (size > MAX_BODY) {
      tooBig = true; chunks = [];
      res.setHeader('Connection', 'close');
      send(res, 413, { ok: false, error: 'size' }, origin);
      req.resume();
      return;
    }
    chunks.push(ch);
  });
  req.on('end', async () => {
    if (tooBig) return;
    let d;
    try { d = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { return send(res, 400, { ok: false, error: 'json' }, origin); }
    if (!d || typeof d !== 'object') return send(res, 400, { ok: false, error: 'json' }, origin);
    if (d.web) return send(res, 200, { ok: true }, origin);  // trampa para bots: se ignora
    if (!clip(d.text, MAX_TEXT) && !(d.ctx && d.kind === 'akatsa'))
      return send(res, 400, { ok: false, error: 'empty' }, origin);
    if (limited(ip)) return send(res, 429, { ok: false, error: 'rate' }, origin);
    try {
      await sendTelegram(buildMessage(d));
      send(res, 200, { ok: true }, origin);
    } catch (e) {
      console.error(e.message);
      send(res, 502, { ok: false, error: 'telegram' }, origin);
    }
  });
});

if (!TOKEN || !CHAT) console.warn('Faltan TG_TOKEN o TG_CHAT');
server.listen(PORT, () => console.log(`ikasi-feedback en el puerto ${PORT}`));
