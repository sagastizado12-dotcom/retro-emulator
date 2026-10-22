# Retro Emulator

Mobile-friendly, installable, offline-capable web front-end for [EmulatorJS](https://emulatorjs.org) (v4.2.3, self-hosted in `data/`).
Plays **your own** game files for 28 systems (Nintendo, Sony, Sega, Atari, arcade and more). GameCube is not supported (no reliable in-browser emulator exists yet).

Use only games you own. No ROMs or BIOS files are included.

- ROMs, the optional PS1 BIOS, and save states stay in the browser (IndexedDB).
- Service worker precaches the app shell; "Download all consoles for offline" caches every core.

EmulatorJS and the libretro cores are GPL-3.0; see `data/EMULATORJS-LICENSE`.

## Touch controller skins

On touch screens the play page shows a per-system controller (`skins.js` + `skins.css`) instead of EmulatorJS's generic virtual gamepad (turned off via `EJS_defaultOptions['virtual-gamepad']`).
Each of the 28 systems gets its own layout, colours and labels, drawn only with CSS and inline SVG (no official artwork or logos). Examples: NES d-pad with red B/A, SNES coloured X/A/B/Y with L/R, N64 stick + yellow C buttons + Z, PlayStation shape symbols with two sticks and L1/L2/R1/R2, Genesis A/B/C + X/Y/Z, arcade stick with 6 buttons.

- Inputs go through `EJS_emulator.gameManager.simulateInput` using the same RetroPad ids as EmulatorJS 4.2.3's own per-system pads (analog sticks and N64 C buttons send 0x7fff).
- Pointer events: multi-touch, slide between buttons, 8-way d-pads, analog sticks, enlarged hit areas.
- Portrait: controller body under the game. Landscape: translucent grips on both sides of the game.
- 🎮 button (top right) hides/shows the skin (remembered) for Bluetooth controller or keyboard use.
- Preview a skin without a game: `play.html?skin=<system id>` (e.g. `?skin=psx`).
- Not covered: ColecoVision number keypad and Jaguar keypad (only fire buttons/options).
