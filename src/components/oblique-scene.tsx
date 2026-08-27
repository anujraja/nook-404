import { useEffect, useMemo, useRef, useState } from "react";

type Vec3 = [number, number, number];
type Face = { n: Vec3; pts: Vec3[] };

const DEG = Math.PI / 180;
const DEPTH = 0.62;

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
function mul(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s];
}
function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function norm(a: Vec3): Vec3 {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
}
function rotX([x, y, z]: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}
function rotY([x, y, z]: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c + z * s, y, -x * s + z * c];
}

/** Extrude a CCW 2D polygon along Z. */
function extrude(poly: [number, number][], z0: number, z1: number): Face[] {
  const faces: Face[] = [];
  faces.push({ n: [0, 0, 1], pts: poly.map(([x, y]) => [x, y, z1]) });
  faces.push({
    n: [0, 0, -1],
    pts: [...poly].reverse().map(([x, y]) => [x, y, z0]),
  });
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const n = norm([dy, -dx, 0]);
    faces.push({
      n,
      pts: [
        [a[0], a[1], z1],
        [b[0], b[1], z1],
        [b[0], b[1], z0],
        [a[0], a[1], z0],
      ],
    });
  }
  return faces;
}

function rect(x: number, y: number, w: number, h: number): [number, number][] {
  return [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
}

function letter4(): Face[] {
  const t = 0.34;
  const w = 1.2;
  const h = 1.62;
  const z0 = -DEPTH / 2;
  const z1 = DEPTH / 2;
  return [
    ...extrude(rect(w - t, 0, t, h), z0, z1),
    ...extrude(rect(0, h * 0.42, w - t, t), z0, z1),
    ...extrude(rect(0, h * 0.42, t, h * 0.58), z0, z1),
  ];
}

function letter0(): Face[] {
  const t = 0.34;
  const w = 1.2;
  const h = 1.62;
  const z0 = -DEPTH / 2;
  const z1 = DEPTH / 2;
  return [
    ...extrude(rect(0, 0, w, t), z0, z1),
    ...extrude(rect(0, h - t, w, t), z0, z1),
    ...extrude(rect(0, t, t, h - 2 * t), z0, z1),
    ...extrude(rect(w - t, t, t, h - 2 * t), z0, z1),
  ];
}

function buildLetters(): Face[] {
  const glyphs = [
    { faces: letter4(), x: -1.64 },
    { faces: letter0(), x: 0 },
    { faces: letter4(), x: 1.64 },
  ];
  const out: Face[] = [];
  for (const g of glyphs) {
    for (const f of g.faces) {
      out.push({
        n: f.n,
        pts: f.pts.map(([x, y, z]) => [x + g.x - 0.6, y + 0.02, z]),
      });
    }
  }
  return out;
}

function gridLines(): [Vec3, Vec3][] {
  const lines: [Vec3, Vec3][] = [];
  const n = 14;
  const s = 0.62;
  const extent = n * s;
  const sn = Math.sqrt(3) / 2;
  const c = 0.5;

  for (let i = -n; i <= n; i++) {
    lines.push([
      [-extent, 0, i * s],
      [extent, 0, i * s],
    ]);
  }
  const t = extent * 1.35;
  for (let i = -n * 2; i <= n * 2; i++) {
    const ox = -sn * i * s;
    const oz = c * i * s;
    lines.push([
      [ox - c * t, 0, oz - sn * t],
      [ox + c * t, 0, oz + sn * t],
    ]);
    const ox2 = sn * i * s;
    const oz2 = c * i * s;
    lines.push([
      [ox2 + c * t, 0, oz2 - sn * t],
      [ox2 - c * t, 0, oz2 + sn * t],
    ]);
  }
  return lines;
}

const LIGHT = norm([0.5, 0.82, 0.42]);
const CAM_Z = 3.45;
const FOCAL = 2.7;
const SCALE = 430;
const CX = 500;
const CY = 332;

function xform(p: Vec3, rx: number, ry: number): Vec3 {
  return rotX(rotY(p, ry), rx);
}

function project(p: Vec3): [number, number, number] {
  const z = p[2] + CAM_Z;
  const s = FOCAL / z;
  return [p[0] * s * SCALE + CX, -p[1] * s * SCALE + CY, z];
}

function shade(n: Vec3): { fill: string; stroke: string } {
  const ndl = Math.max(0, dot(n, LIGHT));
  const up = Math.max(0, n[1]);
  const side = Math.max(0, -n[0]);
  const l = 0.05 + ndl * 0.36 + up * 0.16 + side * 0.07;
  const r = Math.round(10 + l * 150);
  const g = Math.round(10 + l * 148);
  const b = Math.round(14 + l * 168);
  const sr = Math.min(255, r + 18);
  const sg = Math.min(255, g + 18);
  const sb = Math.min(255, b + 28);
  return {
    fill: `rgb(${r},${g},${b})`,
    stroke: `rgb(${sr},${sg},${sb})`,
  };
}

const WORLD_FACES = buildLetters();
const WORLD_GRID = gridLines();

type DrawnFace = {
  d: string;
  fill: string;
  stroke: string;
  z: number;
  key: number;
};
type DrawnLine = { d: string; o: number; z: number; key: number };

function drawScene(rx: number, ry: number): { faces: DrawnFace[]; lines: DrawnLine[] } {
  const faces: DrawnFace[] = [];
  WORLD_FACES.forEach((f, i) => {
    const n = norm(xform(f.n, rx, ry));
    if (n[2] <= 0.02) return;
    const pts = f.pts.map((p) => project(xform(p, rx, ry)));
    const z = pts.reduce((s, p) => s + p[2], 0) / pts.length;
    const col = shade(n);
    faces.push({
      key: i,
      z,
      fill: col.fill,
      stroke: col.stroke,
      d: pts.map((p, k) => `${k === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z",
    });
  });
  faces.sort((a, b) => b.z - a.z);

  const lines: DrawnLine[] = [];
  WORLD_GRID.forEach((seg, i) => {
    const a = project(xform(seg[0], rx, ry));
    const b = project(xform(seg[1], rx, ry));
    const mid = project(xform(mul(add(seg[0], seg[1]), 0.5), rx, ry));
    const dist = Math.hypot(mid[0] - CX, mid[1] - CY);
    const o = Math.max(0, 0.22 - dist / 2200) * (1 / (0.35 + mid[2] * 0.18));
    if (o < 0.02) return;
    if (a[2] < 0.4 || b[2] < 0.4) return;
    lines.push({
      key: i,
      z: mid[2],
      o,
      d: `M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`,
    });
  });
  lines.sort((a, b) => b.z - a.z);
  return { faces, lines };
}

export function ObliqueScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [pose, setPose] = useState(() => drawScene(-24 * DEG, -38 * DEG));
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      const autoY = reduce.current ? -38 * DEG : t * 0.12;
      const rx = -24 * DEG + mouse.current.y * 10 * DEG;
      const ry = autoY + mouse.current.x * 16 * DEG;
      setPose(drawScene(rx, ry));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onPointerMove(e: React.PointerEvent) {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mouse.current = {
      x: (e.clientX - r.left) / r.width * 2 - 1,
      y: (e.clientY - r.top) / r.height * 2 - 1,
    };
  }

  const { faces, lines } = pose;

  const grain = useMemo(
    () => (
      <filter id="oblique-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.78  0 0 0 0.09 0" />
      </filter>
    ),
    [],
  );

  return (
    <div
      ref={wrap}
      className="oblique-stage"
      onPointerMove={onPointerMove}
    >
      <svg
        className="oblique-svg"
        viewBox="0 0 1000 640"
        role="img"
        aria-label="Three-dimensional extruded 404 letters rotating above a triangular grid, drawn in SVG."
      >
        <defs>
          {grain}
          <radialGradient id="oblique-vignette" cx="50%" cy="48%" r="62%">
            <stop offset="55%" stopColor="#050506" stopOpacity="0" />
            <stop offset="100%" stopColor="#050506" stopOpacity="0.72" />
          </radialGradient>
        </defs>
        <rect width="1000" height="640" fill="#050506" />
        <g>
          {lines.map((ln) => (
            <path
              key={ln.key}
              d={ln.d}
              fill="none"
              stroke="#6a6a7a"
              strokeWidth="0.7"
              opacity={ln.o}
            />
          ))}
        </g>
        <g>
          {faces.map((f) => (
            <path
              key={f.key}
              d={f.d}
              fill={f.fill}
              stroke={f.stroke}
              strokeWidth="0.55"
              strokeLinejoin="round"
            />
          ))}
        </g>
        <rect
          width="1000"
          height="640"
          fill="url(#oblique-vignette)"
          style={{ pointerEvents: "none" }}
        />
        <rect
          width="1000"
          height="640"
          filter="url(#oblique-grain)"
          opacity="0.55"
          style={{ mixBlendMode: "overlay", pointerEvents: "none" }}
        />
      </svg>
    </div>
  );
}
