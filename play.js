(async () => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  const err = m => { const e = document.getElementById('err'); e.textContent = m; e.hidden = false; };
  const id = new URLSearchParams(location.search).get('id');
  const g = id && await DB.get('games', id).catch(() => null);
  if (!g) return err('Game not found on this device. Go back and pick the file again.');
  const c = CONSOLES.find(c => c.id === g.system);
  if (!c || c.unsupported) return err('This console is not supported.');
  g.lastPlayed = Date.now(); DB.put('games', g).catch(() => {});
  document.title = g.name + ' - Retro';

  window.EJS_player = '#game';
  window.EJS_core = c.id === 'n64' ? 'mupen64plus_next' : c.id; // system key -> correct control scheme
  window.EJS_threads = !!c.threads;
  if (c.threads && !window.crossOriginIsolated) {
    // Threaded cores (PSP, DOS) need cross-origin isolation, provided by our service worker
    if (navigator.serviceWorker && !sessionStorage.getItem('coiReload')) { await navigator.serviceWorker.ready; sessionStorage.setItem('coiReload', '1'); return location.reload(); }
    return err('This console needs a browser that supports SharedArrayBuffer (cross-origin isolation). Try reloading.');
  }
  sessionStorage.removeItem('coiReload');
  window.EJS_pathtodata = 'data/';
  window.EJS_gameUrl = URL.createObjectURL(g.blob);
  window.EJS_gameName = g.name;              // keeps extension; also keys save states/SRAM
  window.EJS_language = 'en-US';
  window.EJS_color = '#7c5cff';
  window.EJS_startOnLoaded = true;
  window.EJS_defaultOptions = { 'save-state-location': 'browser' };
  if (c.bios) {
    const b = await DB.get('bios', c.id).catch(() => null);
    const files = !b ? [] : b.files ? b.files : [{ name: b.name, blob: b.blob }];
    if (files.length) window.EJS_biosUrl = URL.createObjectURL(await storeZip(files)); // zip keeps the real BIOS filename(s)
  }
  window.EJS_ready = () => console.log('EJS ready');
  window.EJS_onGameStart = () => { window.__gameStarted = true; console.log('EJS game started'); };
  const s = document.createElement('script'); s.src = 'data/loader.js'; document.body.appendChild(s);
})();

// Minimal uncompressed ZIP so EmulatorJS extracts BIOS files under their real names (e.g. scph5501.bin, neogeo.zip)
async function storeZip(files) {
  const parts = [], central = []; let off = 0;
  for (const f of files) {
    const data = new Uint8Array(await f.blob.arrayBuffer());
    let crc = ~0; for (let i = 0; i < data.length; i++) { crc ^= data[i]; for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1)); } crc = ~crc >>> 0;
    const fn = new TextEncoder().encode(f.name), n = data.length;
    const lh = new DataView(new ArrayBuffer(30)); lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 10, true); lh.setUint32(14, crc, true); lh.setUint32(18, n, true); lh.setUint32(22, n, true); lh.setUint16(26, fn.length, true);
    const ch = new DataView(new ArrayBuffer(46)); ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 10, true); ch.setUint32(16, crc, true); ch.setUint32(20, n, true); ch.setUint32(24, n, true); ch.setUint16(28, fn.length, true); ch.setUint32(42, off, true);
    parts.push(lh, fn, data); central.push(ch, fn); off += 30 + fn.length + n;
  }
  const cdSize = central.reduce((a, p) => a + p.byteLength, 0);
  const end = new DataView(new ArrayBuffer(22)); end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, cdSize, true); end.setUint32(16, off, true);
  return new Blob([...parts, ...central, end], { type: 'application/zip' });
}
