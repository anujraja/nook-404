# Oblique

**This page does not exist.**

A 404 drawn as chunky 3D letters on a triangular grid — one SVG, zero images. The word slowly orbits. Move (or drag) to look around.

This is the technique behind [Gurbinder's SVG "DEV"](https://x.com/legionsdev/status/1938077259304517718): Cursor's 404 faked the motion with four images. The same scene is just extruded polygons, a perspective project, and a camera.

## How it works

1. Each glyph is a set of 2D polygons **extruded** into front, back, and side faces
2. Faces are **rotated** (Y orbit + X tilt + pointer look)
3. **Perspective projected** into SVG `path`s
4. **Back-face culled**, depth-sorted, Lambert-shaded
5. The floor is three families of lines at 0° / 60° / 120° — a triangular tessellation in the same world space

No canvas, no WebGL, no sprite sheet.

| File | What it is |
| --- | --- |
| `src/components/oblique-scene.tsx` | The 3D SVG engine |
| `src/components/oblique-page.tsx` | 404 chrome |
| `src/styles.css` | Tokens |

`prefers-reduced-motion` freezes the camera.

## Credit

- Motion idea: Cursor 404 (four images)
- "Just use SVG": [@legionsdev](https://x.com/legionsdev)
- This piece: original `404` sculpture, not a trace of anyone's frames

## License

MIT
