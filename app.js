const CORE_CACHE = 'retro-cores-v1';
const $ = s => document.querySelector(s);
let pendingSystem = null;

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(e => console.warn('SW', e));
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

function updateNet() { const n = $('#net'); n.textContent = navigator.onLine ? 'Online' : 'Offline'; n.className = 'pill ' + (navigator.onLine ? 'on' : 'off'); }
addEventListener('online', updateNet); addEventListener('offline', updateNet); updateNet();

async function isReady(c) {
  if (!('caches' in window)) return false;
  const cache = await caches.open(CORE_CACHE);
  const r = await Promise.all(coreFiles(c).map(u => cache.match(new URL(u, location.href).href)));
  return r.every(Boolean);
}

async function renderTiles() {
  const biosRec = await DB.get('bios', 'psx').catch(() => null);
  const t = $('#tiles'); t.innerHTML = '';
  for (const c of CONSOLES) {
    const el = document.createElement('div');
    el.className = 'tile' + (c.unsupported ? ' disabled' : '');
    el.style.setProperty('--c', c.color);
    el.innerHTML = `<div class="tile-short">${c.short}</div><div class="tile-name">${c.name}</div>
      <div class="tile-meta">${c.unsupported ? '<span class="badge warn">Not supported</span>' : '<span class="badge" data-ready>…</span>'}</div>
      <div class="tile-exts">.${c.exts.join(' .')}</div>`;
    if (c.bios) {
      const b = document.createElement('button');
      b.className = 'btn small'; b.textContent = biosRec ? 'BIOS: ' + biosRec.name + ' ✕' : '+ Optional BIOS';
      b.onclick = async e => {
        e.stopPropagation();
        if (biosRec) { await DB.del('bios', 'psx'); renderTiles(); } else $('#biosFile').click();
      };
      el.appendChild(b);
    }
    if (!c.unsupported) {
      el.tabIndex = 0;
      el.onclick = () => { pendingSystem = c.id; $('#sysFile').value = ''; $('#sysFile').click(); };
      isReady(c).then(r => { const b = el.querySelector('[data-ready]'); b.textContent = r ? '✓ Ready offline' : 'Needs download'; b.classList.toggle('ok', r); });
    } else {
      el.onclick = () => alert('GameCube isn\'t supported: there is no reliable in-browser GameCube emulator yet.');
    }
    t.appendChild(el);
  }
}

async function addGame(file, system) {
  const id = file.name + ':' + file.size;
  const prev = await DB.get('games', id).catch(() => null);
  await DB.put('games', { id, name: file.name, system, size: file.size, blob: file, added: prev ? prev.added : Date.now(), lastPlayed: Date.now() });
  location.href = 'play.html?id=' + encodeURIComponent(id);
}

$('#sysFile').onchange = e => { const f = e.target.files[0]; if (f) addGame(f, pendingSystem); };
$('#anyFile').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  const sys = detectSystem(f.name);
  if (!sys) { alert('Couldn\'t detect the console from "' + f.name + '". Tap the console tile instead and pick the file there.'); e.target.value = ''; return; }
  if (CONSOLES.find(c => c.id === sys).unsupported) { alert('GameCube isn\'t supported yet.'); return; }
  addGame(f, sys);
};
$('#biosFile').onchange = async e => {
  const f = e.target.files[0]; if (!f) return;
  await DB.put('bios', { system: 'psx', name: f.name, blob: f }); renderTiles();
};

async function renderRecent() {
  const games = (await DB.all('games').catch(() => [])).sort((a, b) => b.lastPlayed - a.lastPlayed);
  const r = $('#recent');
  if (!games.length) return;
  r.innerHTML = '';
  for (const g of games) {
    const c = CONSOLES.find(c => c.id === g.system) || {};
    const el = document.createElement('div'); el.className = 'game';
    el.innerHTML = `<span class="badge" style="background:${c.color}">${c.short || '?'}</span><span class="gname"></span><span class="muted">${(g.size / 1048576).toFixed(1)} MB</span><button class="btn small del" title="Remove">✕</button>`;
    el.querySelector('.gname').textContent = g.name;
    el.onclick = () => location.href = 'play.html?id=' + encodeURIComponent(g.id);
    el.querySelector('.del').onclick = async ev => { ev.stopPropagation(); if (confirm('Remove ' + g.name + ' from this device?')) { await DB.del('games', g.id); el.remove(); } };
    r.appendChild(el);
  }
}

$('#dlAll').onclick = async () => {
  const btn = $('#dlAll'), st = $('#dlStatus');
  if (!navigator.onLine) { st.textContent = 'Connect to the internet to download.'; return; }
  btn.disabled = true;
  try {
    const cache = await caches.open(CORE_CACHE);
    const files = CONSOLES.filter(c => !c.unsupported).flatMap(coreFiles);
    let i = 0;
    for (const f of files) {
      st.textContent = `Downloading ${++i}/${files.length}: ${f.split('/').pop()}`;
      const url = new URL(f, location.href).href;
      const res = await fetch(url, { cache: 'reload' });
      if (!res.ok) throw new Error(f + ' ' + res.status);
      await cache.put(url, res);
    }
    // also make sure the app shell is cached
    if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage('precache');
    st.textContent = '✓ All consoles are ready offline.';
  } catch (e) { st.textContent = 'Download failed: ' + e.message; }
  btn.disabled = false; renderTiles();
};

renderTiles(); renderRecent();
