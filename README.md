# Retro Emulator

Mobile-friendly, installable, offline-capable web front-end for [EmulatorJS](https://emulatorjs.org) (v4.2.3, self-hosted in `data/`).
Plays **your own** game files for SNES, GBA, GB/GBC, N64 and PlayStation. GameCube is not supported (no reliable in-browser emulator exists yet).

Use only games you own. No ROMs or BIOS files are included.

- ROMs, the optional PS1 BIOS, and save states stay in the browser (IndexedDB).
- Service worker precaches the app shell; "Download all consoles for offline" caches every core.

EmulatorJS and the libretro cores are GPL-3.0; see `data/EMULATORJS-LICENSE`.
