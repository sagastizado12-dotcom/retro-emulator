const CORE_CACHE = 'retro-cores-v1';
const $ = s => document.querySelector(s);
let pendingSystem = null, pendingBios = null;

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(e => console.warn('SW', e));
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

function updateNet() { const n = $('#net'); n.textContent = navigator.onLine ? 'Online' : 'Offline'; n.className = 'pill ' + (navigator.onLine ? 'on' : 'off'); }
addEventListener('online', updateNet); addEventListener('offline', updateNet); updateNet();

const playable = CONSOLES.filter(c => !c.unsupported);
const abs = u => new URL(u, location.href).href;

async function isReady(c) {
  if (!('caches' in window) || c.unsupported) return false;
  const r = await Promise.all(coreFiles(c).map(u => caches.match(abs(u))));
  return r.every(Boolean);
}
async function downloadConsole(c, onProgress) {
  const cache = await caches.open(CORE_CACHE);
  for (const f of coreFiles(c)) {
    if (await caches.match(abs(f))) continue;
    onProgress && onProgress(f);
    const res = await fetch(abs(f), { cache: 'reload' });
    if (!res.ok) throw new Error(f + ' ' + res.status);
    await cache.put(abs(f), res);
  }
}
const biosFiles = r => !r ? [] : r.files ? r.files : [{ name: r.name, blob: r.blob }];

async function renderTiles() {
  const biosAll = await DB.all('bios').catch(() => []);
  const biosMap = Object.fromEntries(biosAll.map(b => [b.system, biosFiles(b)]));
  const root = $('#tiles'); root.innerHTML = '';
  let readyCount = 0, readyBytes = 0;
  const checks = [];
  for (const maker of MAKERS) {
    const sec = document.createElement('div'); sec.className = 'maker';
    sec.innerHTML = `<h3>${maker}</h3><div class="tiles"></div>`;
    const grid = sec.querySelector('.tiles');
    for (const c of CONSOLES.filter(c => c.maker === maker)) {
      const el = document.createElement('div');
      el.className = 'tile' + (c.unsupported ? ' disabled' : '');
      el.dataset.id = c.id;
      el.style.setProperty('--c', c.color);
      el.innerHTML = `<div class="tile-top"><span class="tile-short">${c.short}</span>${c.experimental ? '<span class="badge exp">Beta</span>' : ''}</div>
        <div class="tile-name">${c.name}</div>
        ${c.note ? `<div class="tile-note">${c.note}</div>` : ''}
        <div class="tile-meta">${c.unsupported ? '<span class="badge warn">Not supported</span>' : `<button class="badge dl" data-ready>${fmtMB(c.size)}</button>`}</div>`;
      if (c.bios) {
        const have = biosMap[c.id] || [];
        const b = document.createElement('button');
        b.className = 'btn small bios' + (c.bios.req && !have.length ? ' need' : '');
        b.title = 'BIOS: ' + c.bios.files;
        b.textContent = have.length ? '✓ BIOS (' + have.length + ') ✕' : (c.bios.req ? '+ BIOS required' : '+ BIOS (optional)');
        b.onclick = async e => {
          e.stopPropagation();
          if (have.length) { if (confirm('Remove BIOS for ' + c.name + '?')) { await DB.del('bios', c.id); renderTiles(); } }
          else { if (!confirm('Pick your own BIOS file(s) for ' + c.name + '.\nExpected name: ' + c.bios.files + '\nThe file name must match exactly.')) return; pendingBios = c.id; $('#biosFile').value = ''; $('#biosFile').click(); }
        };
        el.appendChild(b);
      }
      if (!c.unsupported) {
        el.tabIndex = 0;
        el.onclick = () => {
          if (c.bios && c.bios.req && !(biosMap[c.id] || []).length && !confirm(c.name + ' needs a BIOS (' + c.bios.files + '). Add it with the BIOS button first. Continue anyway?')) return;
          pendingSystem = c.id; $('#sysFile').value = ''; $('#sysFile').click();
        };
        const badge = el.querySelector('[data-ready]');
        badge.onclick = async e => {
          e.stopPropagation();
          if (badge.classList.contains('ok')) return;
          if (!navigator.onLine) return alert('Connect to the internet to download.');
          badge.textContent = '…'; try { await downloadConsole(c); } catch (err) { alert('Download failed: ' + err.message); } renderTiles();
        };
        checks.push(isReady(c).then(r => {
          badge.textContent = r ? '✓ Offline' : '⬇ ' + fmtMB(c.size); badge.classList.toggle('ok', r);
          badge.title = r ? 'Ready offline' : 'Download for offline (' + fmtMB(c.size) + ')';
          if (r) { readyCount++; readyBytes += c.size; }
        }));
      } else el.onclick = () => alert(c.name + ' isn\'t supported: ' + c.note + '.');
      grid.appendChild(el);
    }
    root.appendChild(sec);
  }
  await Promise.all(checks);
  const total = playable.reduce((a, c) => a + c.size, 0);
  $('#offlineSummary').textContent = `${readyCount}/${playable.length} consoles offline (${fmtMB(readyBytes)} of ${fmtMB(total)})`;
  $('#dlAll').textContent = readyCount === playable.length ? '✓ All consoles offline' : `⬇ Download all for offline (${fmtMB(total)})`;
}

function choose(file, ids) {
  const m = $('#chooser'); m.hidden = false;
  $('#chooserTitle').textContent = 'Which console is "' + file.name + '" for?';
  const box = $('#chooserBtns'); box.innerHTML = '';
  for (const id of ids) {
    const c = CONSOLES.find(c => c.id === id); if (c.unsupported) continue;
    const b = document.createElement('button'); b.className = 'btn'; b.style.borderColor = c.color; b.textContent = c.name;
    b.onclick = () => { m.hidden = true; addGame(file, id); }; box.appendChild(b);
  }
}
$('#chooserCancel').onclick = () => $('#chooser').hidden = true;

async function addGame(file, system) {
  const id = system + ':' + file.name + ':' + file.size;
  const prev = await DB.get('games', id).catch(() => null);
  await DB.put('games', { id, name: file.name, system, size: file.size, blob: file, added: prev ? prev.added : Date.now(), lastPlayed: Date.now() });
  launch(id, system);
}
function launch(id, system) {
  const c = CONSOLES.find(c => c.id === system);
  location.href = 'play.html?id=' + encodeURIComponent(id) + (c && c.threads ? '&t=1' : '');
}

$('#sysFile').onchange = e => { const f = e.target.files[0]; if (f) addGame(f, pendingSystem); };
$('#anyFile').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  e.target.value = '';
  const ids = detectSystems(f.name);
  if (ids.length === 1) {
    const c = CONSOLES.find(c => c.id === ids[0]);
    if (c.unsupported) return alert(c.name + ' isn\'t supported yet.');
    return addGame(f, ids[0]);
  }
  choose(f, ids.length ? ids : playable.map(c => c.id));
};
$('#biosFile').onchange = async e => {
  const files = [...e.target.files]; if (!files.length || !pendingBios) return;
  await DB.put('bios', { system: pendingBios, files: files.map(f => ({ name: f.name, blob: f })) }); renderTiles();
};

async function renderRecent() {
  const games = (await DB.all('games').catch(() => [])).sort((a, b) => b.lastPlayed - a.lastPlayed);
  const r = $('#recent');
  if (!games.length) return;
  r.innerHTML = '';
  for (const g of games) {
    const c = CONSOLES.find(c => c.id === g.system) || {};
    const el = document.createElement('div'); el.className = 'game';
    el.innerHTML = `<span class="badge" style="background:${c.color}">${c.short || '?'}</span><span class="gname"></span><span class="muted">${fmtMB(g.size)}</span><button class="btn small del" title="Remove">✕</button>`;
    el.querySelector('.gname').textContent = g.name;
    el.onclick = () => launch(g.id, g.system);
    el.querySelector('.del').onclick = async ev => { ev.stopPropagation(); if (confirm('Remove ' + g.name + ' from this device?')) { await DB.del('games', g.id); el.remove(); } };
    r.appendChild(el);
  }
}

$('#dlAll').onclick = async () => {
  const btn = $('#dlAll'), st = $('#dlStatus');
  if (!navigator.onLine) { st.textContent = 'Connect to the internet to download.'; return; }
  btn.disabled = true;
  try {
    let i = 0;
    for (const c of playable) { i++; await downloadConsole(c, () => st.textContent = `Downloading ${i}/${playable.length}: ${c.name} (${fmtMB(c.size)})`); }
    if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage('precache');
    st.textContent = '✓ All consoles are ready offline.';
  } catch (e) { st.textContent = 'Download failed: ' + e.message; }
  btn.disabled = false; renderTiles();
};

renderTiles(); renderRecent();
