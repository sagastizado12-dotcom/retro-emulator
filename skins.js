// Per-system touch controller skins (original CSS/SVG art, no logos).
// Input ids are RetroPad indices sent through EJS_emulator.gameManager.simulateInput,
// matching EmulatorJS 4.2.3's own per-system virtual gamepad defaults:
// 0 B, 1 Y, 2 Select, 3 Start, 4-7 Up/Down/Left/Right, 8 A, 9 X, 10 L, 11 R, 12 L2, 13 R2,
// 14 L3, 15 R3, 16-19 left stick R/L/D/U, 20-23 right stick R/L/D/U (analog, 0x7fff).
(() => {
  const AX = 0x7fff;
  // Shape helpers. Positions are % of a square cluster box (x, y = centre, s = diameter).
  const b = (label, input, x, y, s, cls = '', extra = {}) => ({ t: 'btn', label, in: input, x, y, s, cls, ...extra });
  const pad = (x, y, s, style = 'cross', inputs = [4, 5, 6, 7]) => ({ t: 'dpad', x, y, s, style, in: inputs }); // in: up, down, left, right
  const stick = (x, y, s, inputs = [16, 17, 18, 19], style = 'stick') => ({ t: 'stick', x, y, s, style, in: inputs }); // in: right, left, down, up
  const P = (label, input, cls = '') => ({ label, in: input, cls }); // pill (shoulder / centre)
  const SYM = { // simple geometric face symbols, drawn here
    tri: '<svg viewBox="0 0 20 20"><path d="M10 3 18 16H2Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>',
    cir: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
    crs: '<svg viewBox="0 0 20 20"><path d="M4 4 16 16M16 4 4 16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    sqr: '<svg viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
    up: '<svg viewBox="0 0 20 20"><path d="M10 5 16 14H4Z" fill="currentColor"/></svg>',
  };
  const arrow = deg => SYM.up.replace('<path', `<path transform="rotate(${deg} 10 10)"`);
  const genesis = { body: '#1c1c1f', ink: '#d8d8dc', left: [pad(50, 50, 78, 'disc')],
    right: [b('X', 10, 22, 28, 22, 'blk sm'), b('Y', 9, 50, 22, 22, 'blk sm'), b('Z', 11, 78, 16, 22, 'blk sm'),
            b('A', 1, 20, 66, 29, 'blk'), b('B', 0, 50, 58, 29, 'blk'), b('C', 8, 80, 50, 29, 'blk')],
    center: [P('MODE', 2), P('START', 3)] };
  const psFace = (cx, cy, r, s, mono) => [b(SYM.tri, 9, cx, cy - r, s, 'ps tri' + mono), b(SYM.cir, 8, cx + r, cy, s, 'ps cir' + mono),
                                         b(SYM.crs, 0, cx, cy + r, s, 'ps crs' + mono), b(SYM.sqr, 1, cx - r, cy, s, 'ps sqr' + mono)];
  const S = {
    nes: { body: '#cfcfcf', face: '#2a2a2a', ink: '#c8102e', left: [pad(50, 50, 78)],
      right: [b('B', 0, 28, 55, 34, 'red cap'), b('A', 8, 74, 55, 34, 'red cap')], center: [P('SELECT', 2, 'nes'), P('START', 3, 'nes')] },
    snes: { body: '#d6d6dc', ink: '#4a4a55', left: [pad(50, 50, 78)],
      right: [b('X', 9, 50, 20, 28, 'cx'), b('A', 8, 80, 50, 28, 'ca'), b('B', 0, 50, 80, 28, 'cb'), b('Y', 1, 20, 50, 28, 'cy')],
      shoulders: [[P('L', 10)], [P('R', 11)]], center: [P('SELECT', 2, 'slant'), P('START', 3, 'slant')] },
    n64: { body: '#3b3b42', ink: '#e8e8ee', left: [pad(28, 26, 46), stick(62, 70, 52)],
      right: [b('A', 0, 30, 74, 30, 'n64a'), b('B', 1, 14, 46, 26, 'n64b'),
              b(arrow(0), 23, 70, 14, 22, 'cbtn', { ax: 1 }), b(arrow(90), 20, 90, 36, 22, 'cbtn', { ax: 1 }),
              b(arrow(180), 22, 70, 58, 22, 'cbtn', { ax: 1 }), b(arrow(270), 21, 50, 36, 22, 'cbtn', { ax: 1 })],
      shoulders: [[P('L', 10), P('Z', 12, 'z')], [P('R', 11)]], center: [P('START', 3, 'n64s')] },
    gb: { body: '#cbc7bd', ink: '#2c2a6b', left: [pad(50, 50, 76)],
      right: [b('B', 0, 30, 62, 34, 'gbab cap'), b('A', 8, 72, 40, 34, 'gbab cap')], center: [P('SELECT', 2, 'gbp'), P('START', 3, 'gbp')] },
    gba: { body: '#4c3f92', ink: '#e4e0ff', left: [pad(50, 50, 76)],
      right: [b('B', 0, 30, 62, 32, 'gbaab'), b('A', 8, 72, 40, 32, 'gbaab')],
      shoulders: [[P('L', 10)], [P('R', 11)]], center: [P('SELECT', 2), P('START', 3)] },
    nds: { body: '#c9ccd3', ink: '#3a3d46', left: [pad(50, 50, 72)],
      right: [b('X', 9, 50, 20, 27, 'gry'), b('A', 8, 80, 50, 27, 'gry'), b('B', 0, 50, 80, 27, 'gry'), b('Y', 1, 20, 50, 27, 'gry')],
      shoulders: [[P('L', 10)], [P('R', 11)]], center: [P('SELECT', 2), P('START', 3)] },
    vb: { body: '#1b1b1d', ink: '#e03a3a', left: [pad(50, 50, 72)],
      right: [pad(36, 34, 54, 'cross', [19, 18, 17, 16]), b('B', 0, 34, 84, 24, 'vbb'), b('A', 8, 74, 74, 24, 'vbb')],
      shoulders: [[P('L', 10)], [P('R', 11)]], center: [P('SELECT', 2), P('START', 3)] },
    psx: { body: '#c3c4c9', ink: '#55565e', left: [pad(34, 30, 54, 'ps'), stick(68, 74, 44)],
      right: [...psFace(64, 30, 22, 25, ''), stick(30, 74, 44, [20, 21, 22, 23])],
      shoulders: [[P('L2', 12), P('L1', 10)], [P('R1', 11), P('R2', 13)]], center: [P('SELECT', 2, 'psp'), P('START', 3, 'psp')] },
    psp: { body: '#1d1d22', ink: '#c9c9d2', left: [pad(50, 34, 58, 'ps'), stick(30, 80, 34, [16, 17, 18, 19], 'nub')],
      right: psFace(50, 50, 26, 28, ' mono'), shoulders: [[P('L', 10)], [P('R', 11)]], center: [P('SELECT', 2, 'psp'), P('START', 3, 'psp')] },
    segaMS: { body: '#1d1d1d', ink: '#e8e8e8', left: [pad(50, 50, 76, 'square')],
      right: [b('1', 0, 30, 58, 34, 'sms'), b('2', 8, 74, 58, 34, 'sms')], center: [P('PAUSE', 3)] },
    segaGG: { body: '#26262c', ink: '#7aa7ff', left: [pad(50, 50, 72, 'disc')],
      right: [b('1', 0, 30, 62, 32, 'gg'), b('2', 8, 72, 42, 32, 'gg')], center: [P('START', 3, 'ggs')] },
    segaMD: genesis, segaCD: genesis, sega32x: genesis,
    segaSaturn: { body: '#3d3d47', ink: '#dcdce4', left: [pad(50, 50, 74, 'disc')],
      right: [b('X', 9, 22, 28, 22, 'sat sx'), b('Y', 10, 50, 22, 22, 'sat sy'), b('Z', 11, 78, 16, 22, 'sat sz'),
              b('A', 1, 20, 66, 28, 'sat sa'), b('B', 0, 50, 58, 28, 'sat sb'), b('C', 8, 80, 50, 28, 'sat sc')],
      shoulders: [[P('L', 12)], [P('R', 13)]], center: [P('START', 3)] },
    atari2600: { body: '#1a1a1a', ink: '#e0b070', wood: 1, left: [pad(50, 50, 82, 'joy')],
      right: [b('', 0, 50, 50, 46, 'fire')], center: [P('SELECT', 2, 'sw'), P('RESET', 3, 'sw')] },
    atari7800: { body: '#1a1a1a', ink: '#d0d0d0', left: [pad(50, 50, 82, 'joy')],
      right: [b('1', 0, 30, 58, 32, 'fire'), b('2', 8, 74, 58, 32, 'fire')],
      center: [P('PAUSE', 3, 'sw'), P('SELECT', 2, 'sw'), P('RESET', 9, 'sw')] },
    lynx: { body: '#252528', ink: '#c8c8c8', left: [pad(50, 50, 72)],
      right: [b('B', 0, 30, 66, 30, 'gry2'), b('A', 8, 70, 42, 30, 'gry2')],
      center: [P('OPT 1', 10), P('PAUSE', 3), P('OPT 2', 11)] },
    jaguar: { body: '#1d1d1f', ink: '#e04040', left: [pad(50, 50, 76, 'disc')],
      right: [b('A', 8, 20, 66, 27, 'jag'), b('B', 0, 50, 54, 27, 'jag'), b('C', 1, 80, 42, 27, 'jag')],
      center: [P('PAUSE', 2), P('OPTION', 3)] },
    arcade: null, mame: null,
    pce: { body: '#e9e9e6', ink: '#333', left: [pad(50, 50, 76)],
      right: [b('II', 0, 30, 58, 32, 'pce'), b('I', 8, 74, 58, 32, 'pce')], center: [P('SELECT', 2, 'pcep'), P('RUN', 3, 'pcep')] },
    ngp: { body: '#2b2b30', ink: '#e8e8ec', left: [pad(50, 50, 70, 'joy')],
      right: [b('A', 0, 32, 62, 32, 'ngp'), b('B', 8, 72, 40, 32, 'ngp')], center: [P('OPTION', 3)] },
    ws: { body: '#ecece8', ink: '#444', left: [pad(50, 50, 72, 'buttons')],
      right: [pad(30, 34, 50, 'buttons', [13, 12, 10, 11]), b('B', 0, 50, 80, 26, 'wsb'), b('A', 8, 82, 66, 26, 'wsb')],
      center: [P('START', 3)], yLabel: 1 },
    coleco: { body: '#2a2a2c', ink: '#f08a3c', left: [pad(50, 50, 80, 'joy')],
      right: [b('L', 8, 30, 50, 32, 'col'), b('R', 0, 72, 50, 32, 'col')] },
    '3do': { body: '#1b1b1d', ink: '#cfcfd6', left: [pad(50, 50, 74, 'disc')],
      right: [b('A', 1, 20, 62, 27, 'blk'), b('B', 0, 50, 52, 27, 'blk'), b('C', 8, 80, 42, 27, 'blk')],
      shoulders: [[P('L', 10)], [P('R', 11)]], center: [P('X', 2), P('P', 3)] },
    c64: { body: '#2a2622', ink: '#e2d7bf', left: [pad(50, 50, 82, 'joy')], right: [b('FIRE', 0, 50, 50, 44, 'fire')] },
    dos: { body: '#2e2f35', ink: '#d6d8e0', left: [pad(50, 50, 72)],
      right: [b('Y', 9, 50, 20, 27, 'xy'), b('B', 8, 80, 50, 27, 'xb'), b('A', 0, 50, 80, 27, 'xa'), b('X', 1, 20, 50, 27, 'xx')],
      shoulders: [[P('L', 10)], [P('R', 11)]], center: [P('SELECT', 2), P('START', 3)] },
  };
  S.arcade = S.mame = { body: '#17171d', ink: '#f0d040', left: [pad(50, 50, 82, 'joy')],
    right: [b('1', 0, 20, 64, 25, 'arc a1'), b('2', 8, 50, 58, 25, 'arc a2'), b('3', 1, 80, 52, 25, 'arc a3'),
            b('4', 9, 20, 30, 25, 'arc a4'), b('5', 10, 50, 24, 25, 'arc a5'), b('6', 11, 80, 18, 25, 'arc a6')],
    center: [P('COIN', 2), P('START', 3)] };

  let sink = (i, v) => { const gm = window.EJS_emulator && EJS_emulator.gameManager; if (gm) gm.simulateInput(0, i, v); };
  const state = new Map(); // input -> value currently sent
  const send = (i, v) => { if ((state.get(i) || 0) === v) return; state.set(i, v); sink(i, v); };

  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function place(e, it) { e.style.left = it.x + '%'; e.style.top = it.y + '%'; e.style.width = e.style.height = it.s + '%'; }
  function cluster(items, side) {
    const box = el('div', 'rs-cluster rs-' + side);
    for (const it of items || []) {
      let e;
      if (it.t === 'btn') { e = el('div', 'rs-btn ' + it.cls, `<span>${it.label}</span>`); e.dataset.in = it.in; if (it.ax) e.dataset.ax = 1; }
      else {
        e = el('div', 'rs-' + it.t + ' rs-' + it.style);
        if (it.style === 'buttons') e.innerHTML = ['u', 'd', 'l', 'r'].map(d => `<i class="k ${d}"></i>`).join('');
        else if (it.t === 'stick' || it.style === 'joy') e.innerHTML = '<i class="knob"></i>';
        else e.innerHTML = '<i class="arm v"></i><i class="arm h"></i><i class="hub"></i>';
        e.dataset.kind = it.t; e.dataset.ins = it.in.join(',');
      }
      e.classList.add('rs-ctl'); place(e, it); box.appendChild(e);
    }
    return box;
  }
  function pills(list, cls) {
    const row = el('div', cls);
    for (const p of list || []) { const e = el('div', 'rs-pill rs-ctl ' + p.cls, `<span>${p.label}</span>`); e.dataset.in = p.in; row.appendChild(e); }
    return row;
  }

  // ---- touch handling: pointer events, multi-touch, slide between buttons, analog sticks ----
  const ptrs = new Map(); // pointerId -> {lock: element|null, el: element|null}
  function analog(e, x, y) { // returns {dx, dy} in -1..1
    const r = e.getBoundingClientRect(), rad = r.width / 2;
    let dx = (x - r.left - rad) / rad, dy = (y - r.top - r.height / 2) / rad; const m = Math.hypot(dx, dy);
    if (m > 1) { dx /= m; dy /= m; }
    return { dx, dy };
  }
  function recompute(root) {
    const want = new Map();
    for (const p of ptrs.values()) {
      const e = p.lock || p.el; if (!e) continue;
      if (e.dataset.kind === 'dpad') {
        const [u, d, l, r] = e.dataset.ins.split(',').map(Number); const { dx, dy } = analog(e, p.x, p.y);
        if (Math.hypot(dx, dy) < 0.22) continue;
        const a = Math.atan2(dy, dx) * 180 / Math.PI; // 8-way, 45 degree sectors
        if (a > -67.5 && a < 67.5) want.set(r, 1); if (a > 112.5 || a < -112.5) want.set(l, 1);
        if (a > 22.5 && a < 157.5) want.set(d, 1); if (a < -22.5 && a > -157.5) want.set(u, 1);
        p.vis = [dx, dy];
      } else if (e.dataset.kind === 'stick') {
        const [r, l, d, u] = e.dataset.ins.split(',').map(Number); let { dx, dy } = analog(e, p.x, p.y);
        if (Math.hypot(dx, dy) < 0.12) dx = dy = 0;
        want.set(dx > 0 ? r : l, Math.round(Math.abs(dx) * AX)); want.set(dy > 0 ? d : u, Math.round(Math.abs(dy) * AX));
        p.vis = [dx, dy];
      } else want.set(+e.dataset.in, e.dataset.ax ? AX : 1);
    }
    for (const i of state.keys()) if (!want.has(i)) send(i, 0);
    for (const [i, v] of want) send(i, v);
    root.querySelectorAll('.rs-ctl').forEach(c => {
      let on = false, vis = null;
      for (const p of ptrs.values()) if ((p.lock || p.el) === c) { on = true; vis = p.vis; }
      c.classList.toggle('on', on);
      const k = c.querySelector('.knob'); if (k) k.style.transform = on && vis ? `translate(${vis[0] * 30}%,${vis[1] * 30}%)` : '';
      if (c.dataset.kind === 'dpad' && !k) c.style.setProperty('--tx', on && vis ? `${(vis[1] * 5).toFixed(1)}deg` : '0deg'),
                                           c.style.setProperty('--ty', on && vis ? `${(-vis[0] * 5).toFixed(1)}deg` : '0deg');
    });
    // light the individual keys of button-style pads (WonderSwan X/Y)
    root.querySelectorAll('.rs-buttons').forEach(c => { const ins = c.dataset.ins.split(',').map(Number);
      ['u', 'd', 'l', 'r'].forEach((d, j) => c.querySelector('.k.' + d).classList.toggle('on', (state.get(ins[j]) || 0) > 0)); });
  }
  function hit(x, y) { const t = document.elementFromPoint(x, y); return t && t.closest && t.closest('#rskin .rs-ctl'); }
  function bind(root) {
    const down = ev => {
      const e = hit(ev.clientX, ev.clientY); if (!e) return;
      ev.preventDefault();
      const lock = e.dataset.kind ? e : null;
      ptrs.set(ev.pointerId, { lock, el: e, x: ev.clientX, y: ev.clientY });
      if (navigator.vibrate) navigator.vibrate(8);
      recompute(root);
    };
    const move = ev => {
      const p = ptrs.get(ev.pointerId); if (!p) return; ev.preventDefault();
      p.x = ev.clientX; p.y = ev.clientY; if (!p.lock) { const e = hit(p.x, p.y); p.el = e && !e.dataset.kind ? e : null; }
      recompute(root);
    };
    const up = ev => { if (ptrs.delete(ev.pointerId)) recompute(root); };
    root.addEventListener('pointerdown', down); window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    root.addEventListener('touchstart', ev => { if (ev.target.closest('.rs-ctl')) ev.preventDefault(); }, { passive: false }); // no iOS zoom/scroll
    root.addEventListener('contextmenu', ev => ev.preventDefault());
    window.addEventListener('blur', () => { ptrs.clear(); recompute(root); });
  }

  function mount(id, opts = {}) {
    const s = S[id]; if (!s) return null;
    if (opts.sink) sink = opts.sink;
    const root = el('div', 'rskin-' + id.replace(/\W/g, '')); root.id = 'rskin';
    root.style.setProperty('--body', s.body); root.style.setProperty('--ink', s.ink);
    if (s.face) root.style.setProperty('--face', s.face);
    if (s.wood) root.classList.add('wood');
    const sh = s.shoulders || [[], []];
    root.append(pills(sh[0], 'rs-sh rs-shl'), pills(sh[1], 'rs-sh rs-shr'), cluster(s.left, 'left'), cluster(s.right, 'right'), pills(s.center, 'rs-center'));
    document.body.appendChild(root); document.body.classList.add('has-skin');
    bind(root);
    const tg = el('button', 'rs-toggle', '🎮'); tg.title = 'Show/hide touch controls'; tg.setAttribute('aria-label', tg.title);
    tg.onclick = () => { const off = document.body.classList.toggle('skin-off'); localStorage.setItem('skinOff', off ? '1' : ''); ptrs.clear(); recompute(root); setTimeout(() => dispatchEvent(new Event('resize')), 50); };
    document.body.appendChild(tg);
    if (opts.hidden ?? localStorage.getItem('skinOff') === '1') document.body.classList.add('skin-off');
    return root;
  }
  window.RetroSkin = { mount, skins: S, state };
})();
