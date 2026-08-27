# Nook

**This page does not exist. The room still does.**

A 404 drawn entirely in SVG — zero images, zero video, zero canvas. A wood-paneled living room lives behind a doorway while the sky cycles dawn → day → dusk → night. A white cat walks the rug. Someone reads on the sofa. Lamps warm as the room goes dark.

Inspired by [Cursor's 404](https://cursor.com) (the one that used four images) and [Gurbinder's SVG take](https://x.com/legionsdev/status/1938077259304517718).

## What's moving

- **Sky** — four layered gradients crossfade on a 24s loop
- **Lamps** — glow inverse to daylight
- **Cat** — walks the rug, sits, turns around
- **Person** — idle shift, arm on a laptop
- **Curtains, pendant, steam, tail, plants** — small loops
- **Grain** — `feTurbulence` film overlay

Click **Dawn / Day / Dusk / Night** to lock a time of day, or leave **Cycle** running. Pause freezes everything. `prefers-reduced-motion` holds dusk and sits the cat down.

## Source

| File | What it is |
| --- | --- |
| `src/components/nook-room.tsx` | The room — one SVG |
| `src/components/nook-page.tsx` | 404 chrome, time controls |
| `src/styles.css` | Tokens + every keyframe |

No PNGs, no Lottie, no sprite sheets. The illustration is markup.

## Credit

- Room idea: Cursor 404
- "Just use SVG" energy: [@legionsdev](https://x.com/legionsdev)
- This recreation: original drawing, not a trace of Cursor's frames

## License

MIT
