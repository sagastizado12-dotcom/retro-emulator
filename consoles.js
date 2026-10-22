// Shared console definitions
window.CONSOLES = [
  { id: 'snes', name: 'Super Nintendo', short: 'SNES', core: 'snes', file: 'snes9x', exts: ['sfc','smc','fig','swc','bs'], color: '#7c5cff' },
  { id: 'gba',  name: 'Game Boy Advance', short: 'GBA', core: 'gba', file: 'mgba', exts: ['gba'], color: '#5c7cff' },
  { id: 'gb',   name: 'Game Boy / Color', short: 'GB / GBC', core: 'gb', file: 'gambatte', exts: ['gb','gbc','sgb'], color: '#4fd18b' },
  { id: 'n64',  name: 'Nintendo 64', short: 'N64', core: 'n64', file: 'mupen64plus_next', exts: ['n64','z64','v64'], color: '#ff5c5c' },
  { id: 'psx',  name: 'PlayStation', short: 'PS1', core: 'psx', file: 'pcsx_rearmed', exts: ['cue','bin','iso','chd','pbp','img','m3u','ccd'], color: '#c8c8d8', bios: true },
  { id: 'gc',   name: 'GameCube', short: 'GC', unsupported: true, exts: ['gcm','rvz','gcz'], color: '#5a4a8a' }
];
window.coreFiles = c => ['data/cores/' + c.file + '-wasm.data', 'data/cores/' + c.file + '-legacy-wasm.data', 'data/cores/reports/' + c.file + '.json'];
window.detectSystem = name => {
  const ext = (name.split('.').pop() || '').toLowerCase();
  const c = CONSOLES.find(c => c.exts.includes(ext));
  return c ? c.id : null;
};
