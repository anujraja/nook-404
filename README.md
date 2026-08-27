# Oblique

**This page does not exist.**

Chunky 3D **DEV** letters on a triangular grid. Zero images — CSS 3D faces + an SVG floor. The word slowly orbits. Move to look around.

Cursor’s 404 faked this with four pictures. Same idea, one live 3D scene.

## How

- Each glyph is built from **boxes** (front / back / sides / lid)
- The whole world sits in CSS `perspective` and `preserve-3d`
- A triangular grid is an SVG plane rotated into the floor
- One transform on the world does the orbit — the GPU draws the rest

`prefers-reduced-motion` freezes the camera.

## Credit

- Motion idea: Cursor 404 (four images)
- “Just use SVG”: [@legionsdev](https://x.com/legionsdev)
- This piece: original construction, not a trace of anyone’s frames

## License

MIT
