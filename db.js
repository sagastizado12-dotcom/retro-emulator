// Tiny IndexedDB wrapper: games (ROM blobs) + bios
window.DB = (() => {
  let p;
  const open = () => p || (p = new Promise((res, rej) => {
    const r = indexedDB.open('retro-emu', 1);
    r.onupgradeneeded = () => {
      const db = r.result;
      db.createObjectStore('games', { keyPath: 'id' });
      db.createObjectStore('bios', { keyPath: 'system' });
    };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const tx = async (store, mode, fn) => {
    const db = await open();
    return new Promise((res, rej) => {
      const t = db.transaction(store, mode); const s = t.objectStore(store);
      const req = fn(s); t.oncomplete = () => res(req && req.result); t.onerror = () => rej(t.error);
    });
  };
  return {
    put: (store, v) => tx(store, 'readwrite', s => s.put(v)),
    get: (store, k) => tx(store, 'readonly', s => s.get(k)),
    del: (store, k) => tx(store, 'readwrite', s => s.delete(k)),
    all: (store) => tx(store, 'readonly', s => s.getAll()),
  };
})();
