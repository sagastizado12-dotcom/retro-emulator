// Generated console definitions (EmulatorJS 4.2.3)
window.MAKERS = ["Nintendo","Sony","Sega","Atari","Arcade & Other"];
window.CONSOLES = [
 {
  "id": "nes",
  "name": "NES / Famicom",
  "short": "NES",
  "maker": "Nintendo",
  "core": "fceumm",
  "threads": false,
  "exts": [
   "nes",
   "fds",
   "unf",
   "unif"
  ],
  "color": "#e04848",
  "files": [
   "data/cores/fceumm-legacy-wasm.data",
   "data/cores/reports/fceumm.json"
  ],
  "size": 1053126
 },
 {
  "id": "snes",
  "name": "Super Nintendo",
  "short": "SNES",
  "maker": "Nintendo",
  "core": "snes9x",
  "threads": false,
  "exts": [
   "sfc",
   "smc",
   "fig",
   "swc",
   "bs"
  ],
  "color": "#7c5cff",
  "files": [
   "data/cores/snes9x-legacy-wasm.data",
   "data/cores/reports/snes9x.json"
  ],
  "size": 1092557
 },
 {
  "id": "n64",
  "name": "Nintendo 64",
  "short": "N64",
  "maker": "Nintendo",
  "core": "mupen64plus_next",
  "threads": false,
  "exts": [
   "n64",
   "z64",
   "v64"
  ],
  "color": "#ff5c5c",
  "files": [
   "data/cores/mupen64plus_next-wasm.data",
   "data/cores/reports/mupen64plus_next.json"
  ],
  "size": 1451948,
  "note": "Heavy on iPhone"
 },
 {
  "id": "gb",
  "name": "Game Boy / Color",
  "short": "GB / GBC",
  "maker": "Nintendo",
  "core": "gambatte",
  "threads": false,
  "exts": [
   "gb",
   "gbc",
   "sgb"
  ],
  "color": "#4fd18b",
  "files": [
   "data/cores/gambatte-legacy-wasm.data",
   "data/cores/reports/gambatte.json"
  ],
  "size": 967144
 },
 {
  "id": "gba",
  "name": "Game Boy Advance",
  "short": "GBA",
  "maker": "Nintendo",
  "core": "mgba",
  "threads": false,
  "exts": [
   "gba"
  ],
  "color": "#5c7cff",
  "files": [
   "data/cores/mgba-legacy-wasm.data",
   "data/cores/reports/mgba.json"
  ],
  "size": 1055111
 },
 {
  "id": "nds",
  "name": "Nintendo DS",
  "short": "DS",
  "maker": "Nintendo",
  "core": "melonds",
  "threads": false,
  "exts": [
   "nds"
  ],
  "color": "#9aa4b8",
  "files": [
   "data/cores/melonds-wasm.data",
   "data/cores/reports/melonds.json"
  ],
  "size": 1194890,
  "bios": {
   "files": "bios7.bin, bios9.bin, firmware.bin",
   "req": false
  },
  "note": "Heavy on iPhone"
 },
 {
  "id": "vb",
  "name": "Virtual Boy",
  "short": "VB",
  "maker": "Nintendo",
  "core": "beetle_vb",
  "threads": false,
  "exts": [
   "vb",
   "vboy"
  ],
  "color": "#d03030",
  "files": [
   "data/cores/beetle_vb-legacy-wasm.data",
   "data/cores/reports/beetle_vb.json"
  ],
  "size": 857764
 },
 {
  "id": "psx",
  "name": "PlayStation",
  "short": "PS1",
  "maker": "Sony",
  "core": "pcsx_rearmed",
  "threads": false,
  "exts": [
   "cue",
   "bin",
   "iso",
   "chd",
   "pbp",
   "img",
   "m3u",
   "ccd"
  ],
  "color": "#c8c8d8",
  "files": [
   "data/cores/pcsx_rearmed-wasm.data",
   "data/cores/reports/pcsx_rearmed.json"
  ],
  "size": 1039776,
  "bios": {
   "files": "scph5501.bin (or scph1001.bin / scph7001.bin)",
   "req": false
  },
  "note": "Heavy on iPhone"
 },
 {
  "id": "psp",
  "name": "PlayStation Portable",
  "short": "PSP",
  "maker": "Sony",
  "core": "ppsspp",
  "threads": true,
  "exts": [
   "cso",
   "iso",
   "pbp",
   "chd"
  ],
  "color": "#4a6cd4",
  "files": [
   "data/cores/ppsspp-thread-wasm.data",
   "data/cores/reports/ppsspp.json",
   "data/cores/ppsspp-assets.zip"
  ],
  "size": 15455540,
  "note": "Experimental: needs a recent iPhone/PC, slow",
  "experimental": true
 },
 {
  "id": "segaMS",
  "name": "Master System",
  "short": "SMS",
  "maker": "Sega",
  "core": "smsplus",
  "threads": false,
  "exts": [
   "sms"
  ],
  "color": "#3a7bd5",
  "files": [
   "data/cores/smsplus-legacy-wasm.data",
   "data/cores/reports/smsplus.json"
  ],
  "size": 855437
 },
 {
  "id": "segaGG",
  "name": "Game Gear",
  "short": "GG",
  "maker": "Sega",
  "core": "genesis_plus_gx",
  "threads": false,
  "exts": [
   "gg"
  ],
  "color": "#2d5fa8",
  "files": [
   "data/cores/genesis_plus_gx-legacy-wasm.data",
   "data/cores/reports/genesis_plus_gx.json"
  ],
  "size": 1204932
 },
 {
  "id": "segaMD",
  "name": "Genesis / Mega Drive",
  "short": "Genesis",
  "maker": "Sega",
  "core": "genesis_plus_gx",
  "threads": false,
  "exts": [
   "md",
   "gen",
   "smd",
   "bin"
  ],
  "color": "#1f4f9a",
  "files": [
   "data/cores/genesis_plus_gx-legacy-wasm.data",
   "data/cores/reports/genesis_plus_gx.json"
  ],
  "size": 1204932
 },
 {
  "id": "segaCD",
  "name": "Sega CD / Mega-CD",
  "short": "Sega CD",
  "maker": "Sega",
  "core": "genesis_plus_gx",
  "threads": false,
  "exts": [
   "cue",
   "iso",
   "chd",
   "bin"
  ],
  "color": "#5470b0",
  "files": [
   "data/cores/genesis_plus_gx-legacy-wasm.data",
   "data/cores/reports/genesis_plus_gx.json"
  ],
  "size": 1204932,
  "bios": {
   "files": "bios_CD_U.bin / bios_CD_E.bin / bios_CD_J.bin",
   "req": true
  }
 },
 {
  "id": "sega32x",
  "name": "Sega 32X",
  "short": "32X",
  "maker": "Sega",
  "core": "picodrive",
  "threads": false,
  "exts": [
   "32x"
  ],
  "color": "#c0392b",
  "files": [
   "data/cores/picodrive-legacy-wasm.data",
   "data/cores/reports/picodrive.json"
  ],
  "size": 1035732
 },
 {
  "id": "segaSaturn",
  "name": "Sega Saturn",
  "short": "Saturn",
  "maker": "Sega",
  "core": "yabause",
  "threads": false,
  "exts": [
   "cue",
   "iso",
   "chd",
   "ccd",
   "bin"
  ],
  "color": "#6b6b80",
  "files": [
   "data/cores/yabause-legacy-wasm.data",
   "data/cores/reports/yabause.json"
  ],
  "size": 990549,
  "bios": {
   "files": "saturn_bios.bin",
   "req": false
  },
  "note": "Experimental: slow",
  "experimental": true
 },
 {
  "id": "atari2600",
  "name": "Atari 2600",
  "short": "2600",
  "maker": "Atari",
  "core": "stella2014",
  "threads": false,
  "exts": [
   "a26",
   "bin"
  ],
  "color": "#d98a3a",
  "files": [
   "data/cores/stella2014-legacy-wasm.data",
   "data/cores/reports/stella2014.json"
  ],
  "size": 1051865
 },
 {
  "id": "atari7800",
  "name": "Atari 7800",
  "short": "7800",
  "maker": "Atari",
  "core": "prosystem",
  "threads": false,
  "exts": [
   "a78"
  ],
  "color": "#c8742a",
  "files": [
   "data/cores/prosystem-legacy-wasm.data",
   "data/cores/reports/prosystem.json"
  ],
  "size": 852903,
  "bios": {
   "files": "7800 BIOS (U).rom",
   "req": false
  }
 },
 {
  "id": "lynx",
  "name": "Atari Lynx",
  "short": "Lynx",
  "maker": "Atari",
  "core": "handy",
  "threads": false,
  "exts": [
   "lnx"
  ],
  "color": "#b8862e",
  "files": [
   "data/cores/handy-legacy-wasm.data",
   "data/cores/reports/handy.json"
  ],
  "size": 863063,
  "bios": {
   "files": "lynxboot.img",
   "req": true
  }
 },
 {
  "id": "jaguar",
  "name": "Atari Jaguar",
  "short": "Jaguar",
  "maker": "Atari",
  "core": "virtualjaguar",
  "threads": false,
  "exts": [
   "j64",
   "jag"
  ],
  "color": "#a0522d",
  "files": [
   "data/cores/virtualjaguar-legacy-wasm.data",
   "data/cores/reports/virtualjaguar.json"
  ],
  "size": 943652,
  "note": "Slow on iPhone"
 },
 {
  "id": "arcade",
  "name": "Arcade (FBNeo)",
  "short": "Arcade",
  "maker": "Arcade & Other",
  "core": "fbneo",
  "threads": false,
  "exts": [
   "zip"
  ],
  "color": "#e6b800",
  "files": [
   "data/cores/fbneo-legacy-wasm.data",
   "data/cores/reports/fbneo.json"
  ],
  "size": 8273079,
  "bios": {
   "files": "neogeo.zip (only for Neo Geo games)",
   "req": false
  },
  "note": "Romset must match FBNeo"
 },
 {
  "id": "mame",
  "name": "Arcade (MAME 2003+)",
  "short": "MAME",
  "maker": "Arcade & Other",
  "core": "mame2003_plus",
  "threads": false,
  "exts": [
   "zip"
  ],
  "color": "#d4a017",
  "files": [
   "data/cores/mame2003_plus-legacy-wasm.data",
   "data/cores/reports/mame2003_plus.json"
  ],
  "size": 5388695,
  "note": "Romset must match MAME 2003-Plus"
 },
 {
  "id": "pce",
  "name": "TurboGrafx-16 / PC Engine",
  "short": "TG-16",
  "maker": "Arcade & Other",
  "core": "mednafen_pce",
  "threads": false,
  "exts": [
   "pce",
   "sgx",
   "cue",
   "chd"
  ],
  "color": "#f06a2a",
  "files": [
   "data/cores/mednafen_pce-legacy-wasm.data",
   "data/cores/reports/mednafen_pce.json"
  ],
  "size": 995318,
  "bios": {
   "files": "syscard3.pce (CD games only)",
   "req": false
  }
 },
 {
  "id": "ngp",
  "name": "Neo Geo Pocket / Color",
  "short": "NGP",
  "maker": "Arcade & Other",
  "core": "mednafen_ngp",
  "threads": false,
  "exts": [
   "ngp",
   "ngc"
  ],
  "color": "#3cb4a0",
  "files": [
   "data/cores/mednafen_ngp-legacy-wasm.data",
   "data/cores/reports/mednafen_ngp.json"
  ],
  "size": 872192
 },
 {
  "id": "ws",
  "name": "WonderSwan / Color",
  "short": "WS",
  "maker": "Arcade & Other",
  "core": "mednafen_wswan",
  "threads": false,
  "exts": [
   "ws",
   "wsc"
  ],
  "color": "#5aa0c8",
  "files": [
   "data/cores/mednafen_wswan-legacy-wasm.data",
   "data/cores/reports/mednafen_wswan.json"
  ],
  "size": 879217
 },
 {
  "id": "coleco",
  "name": "ColecoVision",
  "short": "Coleco",
  "maker": "Arcade & Other",
  "core": "gearcoleco",
  "threads": false,
  "exts": [
   "col",
   "cv"
  ],
  "color": "#888",
  "files": [
   "data/cores/gearcoleco-legacy-wasm.data",
   "data/cores/reports/gearcoleco.json"
  ],
  "size": 891893,
  "bios": {
   "files": "colecovision.rom",
   "req": true
  }
 },
 {
  "id": "3do",
  "name": "3DO",
  "short": "3DO",
  "maker": "Arcade & Other",
  "core": "opera",
  "threads": false,
  "exts": [
   "iso",
   "chd",
   "cue",
   "bin"
  ],
  "color": "#b03a3a",
  "files": [
   "data/cores/opera-legacy-wasm.data",
   "data/cores/reports/opera.json"
  ],
  "size": 854008,
  "bios": {
   "files": "panafz10.bin (or panafz1.bin / goldstar.bin)",
   "req": true
  },
  "note": "Experimental",
  "experimental": true
 },
 {
  "id": "c64",
  "name": "Commodore 64",
  "short": "C64",
  "maker": "Arcade & Other",
  "core": "vice_x64sc",
  "threads": false,
  "exts": [
   "d64",
   "t64",
   "prg",
   "crt",
   "tap",
   "g64"
  ],
  "color": "#8b7d5a",
  "files": [
   "data/cores/vice_x64sc-legacy-wasm.data",
   "data/cores/reports/vice_x64sc.json"
  ],
  "size": 1523537
 },
 {
  "id": "dos",
  "name": "DOS (DOSBox Pure)",
  "short": "DOS",
  "maker": "Arcade & Other",
  "core": "dosbox_pure",
  "threads": true,
  "exts": [
   "dosz",
   "exe",
   "com",
   "bat",
   "zip"
  ],
  "color": "#5a5a5a",
  "files": [
   "data/cores/dosbox_pure-thread-legacy-wasm.data",
   "data/cores/reports/dosbox_pure.json"
  ],
  "size": 1792388,
  "note": "Experimental: zip the game folder",
  "experimental": true
 },
 {
  "id": "gc",
  "name": "GameCube",
  "short": "GC",
  "maker": "Nintendo",
  "unsupported": true,
  "exts": [
   "gcm",
   "rvz",
   "gcz"
  ],
  "color": "#5a4a8a",
  "note": "No reliable in-browser emulator yet"
 }
];
window.coreFiles = c => c.files || [];
window.fmtMB = b => (b / 1048576).toFixed(1) + ' MB';
// Returns list of console ids that accept this file's extension
window.detectSystems = name => {
  const ext = (name.split('.').pop() || '').toLowerCase();
  return CONSOLES.filter(c => c.exts.includes(ext)).map(c => c.id);
};
