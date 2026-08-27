import { useEffect, useMemo, useRef } from "react";

const D = 50;

function Face({
  w,
  h,
  transform,
  tone,
}: {
  w: number;
  h: number;
  transform: string;
  tone: "front" | "east" | "west" | "top" | "bot" | "back";
}) {
  return (
    <span
      className={`ob-face ob-face-${tone}`}
      style={{ width: w, height: h, transform }}
    />
  );
}

function Cube({
  w,
  h,
  x,
  y,
  rz = 0,
  origin,
}: {
  w: number;
  h: number;
  x: number;
  y: number;
  rz?: number;
  origin?: string;
}) {
  return (
    <div
      className="ob-cube"
      style={{
        width: w,
        height: h,
        transform: `translate3d(${x}px, ${y}px, 0) rotateZ(${rz}deg)`,
        transformOrigin: origin ?? "center center",
      }}
    >
      <Face w={w} h={h} tone="front" transform={`translateZ(${D / 2}px)`} />
      <Face w={w} h={h} tone="back" transform={`rotateY(180deg) translateZ(${D / 2}px)`} />
      <Face w={D} h={h} tone="west" transform={`rotateY(-90deg) translateZ(${D / 2}px)`} />
      <Face
        w={D}
        h={h}
        tone="east"
        transform={`translateX(${w}px) rotateY(90deg) translateZ(${D / 2}px)`}
      />
      <Face w={w} h={D} tone="top" transform={`rotateX(90deg) translateZ(${D / 2}px)`} />
      <Face
        w={w}
        h={D}
        tone="bot"
        transform={`translateY(${h}px) rotateX(-90deg) translateZ(${D / 2}px)`}
      />
    </div>
  );
}

function LetterA() {
  const t = 36;
  const w = 158;
  const h = 200;
  const mid = w / 2 - t / 2;
  const lean = 16;
  const barW = 92;
  return (
    <div className="ob-letter" style={{ width: w, height: h }}>
      <Cube w={t} h={h} x={mid} y={0} rz={-lean} origin={`${t / 2}px 0px`} />
      <Cube w={t} h={h} x={mid} y={0} rz={lean} origin={`${t / 2}px 0px`} />
      <Cube w={barW} h={32} x={(w - barW) / 2} y={h * 0.54} />
    </div>
  );
}

function LetterN() {
  const t = 36;
  const w = 142;
  const h = 200;
  const run = w - t;
  const len = Math.hypot(run, h);
  const ang = -(Math.atan2(run, h) * 180) / Math.PI;
  return (
    <div className="ob-letter" style={{ width: w, height: h }}>
      <Cube w={t} h={h} x={0} y={0} />
      <Cube w={t} h={h} x={w - t} y={0} />
      <Cube w={t} h={len} x={0} y={0} rz={ang} origin={`${t / 2}px 0px`} />
    </div>
  );
}

function LetterU() {
  const t = 36;
  const w = 132;
  const h = 200;
  return (
    <div className="ob-letter" style={{ width: w, height: h }}>
      <Cube w={t} h={h - t} x={0} y={0} />
      <Cube w={t} h={h - t} x={w - t} y={0} />
      <Cube w={w} h={t} x={0} y={h - t} />
    </div>
  );
}

function LetterJ() {
  const t = 36;
  const w = 120;
  const h = 200;
  const hook = Math.round(w * 0.2);
  return (
    <div className="ob-letter" style={{ width: w, height: h }}>
      <Cube w={w} h={t} x={0} y={0} />
      <Cube w={t} h={h} x={w - t} y={0} />
      <Cube w={w - hook} h={t} x={hook} y={h - t} />
      <Cube w={t} h={64} x={hook} y={h - t - 50} />
    </div>
  );
}

function triangleGrid() {
  const size = 22;
  const step = 1.15;
  const hh = (step * Math.sqrt(3)) / 2;
  const n = Math.ceil(size / step) + 2;
  const parts: string[] = [];
  for (let i = -n; i <= n; i++) {
    parts.push(`M ${-size} ${i * hh} L ${size} ${i * hh}`);
  }
  const c = 0.5;
  const s = Math.sqrt(3) / 2;
  for (let i = -n * 2; i <= n * 2; i++) {
    const ox = -s * i * step;
    const oy = c * i * step;
    parts.push(
      `M ${ox - c * size} ${oy - s * size} L ${ox + c * size} ${oy + s * size}`,
    );
    const ox2 = s * i * step;
    const oy2 = c * i * step;
    parts.push(
      `M ${ox2 + c * size} ${oy2 - s * size} L ${ox2 - c * size} ${oy2 + s * size}`,
    );
  }
  return parts.join(" ");
}

export function ObliqueScene() {
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const grid = useMemo(triangleGrid, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = world.current;
    const root = stage.current;
    if (!el || !root) return;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      mouse.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      };
    };
    root.addEventListener("pointermove", onMove);
    let raf = 0;
    let lx = 0;
    let ly = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      lx += (mouse.current.x - lx) * 0.12;
      ly += (mouse.current.y - ly) * 0.12;
      const spin = reduce ? -48 : t * 14;
      const rx = -32 + ly * 8;
      const ry = spin + lx * 12;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      const hue = 210 + lx * 95 + ly * 18;
      root.style.setProperty("--hue", hue.toFixed(1));
      root.style.setProperty("--px", ((lx + 1) * 50).toFixed(2));
      root.style.setProperty("--py", ((ly + 1) * 50).toFixed(2));
      root.style.setProperty("--lw", Math.max(0, -lx).toFixed(3));
      root.style.setProperty("--le", Math.max(0, lx).toFixed(3));
      root.style.setProperty("--lt", Math.max(0, -ly).toFixed(3));
      root.style.setProperty("--lb", Math.max(0, ly).toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
    };
  }

  return (
    <div
      ref={stage}
      className="oblique-stage"
      onPointerMove={onPointerMove}
    >
      <div
        ref={world}
        className="oblique-world"
        style={{ transform: "rotateX(-32deg) rotateY(-48deg)" }}
      >
        <svg className="oblique-floor" viewBox="-22 -22 44 44" aria-hidden>
          <defs>
            <radialGradient id="oblique-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="oblique-grid-mask">
              <rect x="-22" y="-22" width="44" height="44" fill="url(#oblique-grid-fade)" />
            </mask>
          </defs>
          <path
            d={grid}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.028"
            mask="url(#oblique-grid-mask)"
          />
        </svg>

        <div className="oblique-word" aria-label="ANUJ">
          <LetterA />
          <LetterN />
          <LetterU />
          <LetterJ />
        </div>
      </div>
      <div className="oblique-spot" />
      <div className="oblique-vignette" />
      <div className="oblique-grain" />
    </div>
  );
}
