type TimeOfDay = "auto" | "dawn" | "day" | "dusk" | "night";

type RoomProps = {
  time: TimeOfDay;
  paused: boolean;
};

function WoodFrame({
  x,
  y,
  w,
  h,
  rx = 2,
  art,
  rot = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  art: string;
  rot?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={rx} fill="#5c3d28" />
      <rect x={-w / 2 + 3.5} y={-h / 2 + 3.5} width={w - 7} height={h - 7} fill={art} />
      <rect
        x={-w / 2 + 3.5}
        y={-h / 2 + 3.5}
        width={w - 7}
        height={(h - 7) * 0.42}
        fill="#fff"
        opacity="0.16"
      />
    </g>
  );
}

function RoundFrame({
  x,
  y,
  r,
  art,
}: {
  x: number;
  y: number;
  r: number;
  art: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#5c3d28" />
      <circle r={r - 4} fill={art} />
      <ellipse
        cx={-r * 0.2}
        cy={-r * 0.28}
        rx={r * 0.42}
        ry={r * 0.28}
        fill="#fff"
        opacity="0.16"
      />
    </g>
  );
}

export function NookRoom({ time, paused }: RoomProps) {
  const planks = Array.from({ length: 15 }, (_, i) => {
    const t = i / 14;
    const xBack = 218 + t * 564;
    const xFront = 78 + t * 844;
    return (
      <line
        key={i}
        x1={xBack}
        y1={368}
        x2={xFront}
        y2={610}
        stroke="#6a4a2e"
        strokeWidth={1.1}
        opacity="0.35"
      />
    );
  });

  return (
    <svg
      className="nook-svg"
      data-time={time}
      data-paused={paused ? "true" : "false"}
      viewBox="0 0 1000 640"
      role="img"
      aria-label="A cozy wood-paneled living room seen through a doorway. Day turns to night through the window. A white cat walks the rug. Someone sits reading on the sofa."
    >
      <defs>
        <clipPath id="room-clip">
          <rect x="78" y="36" width="844" height="574" />
        </clipPath>
        <clipPath id="window-clip">
          <rect x="292" y="118" width="196" height="148" rx="2" />
        </clipPath>
        <linearGradient id="wall-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a6240" />
          <stop offset="70%" stopColor="#c4a078" />
          <stop offset="100%" stopColor="#d8bc96" />
        </linearGradient>
        <linearGradient id="wall-r" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#6a4a30" />
          <stop offset="55%" stopColor="#b08a60" />
          <stop offset="100%" stopColor="#c8a87a" />
        </linearGradient>
        <linearGradient id="ceil-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a07850" />
          <stop offset="100%" stopColor="#d4b890" />
        </linearGradient>
        <linearGradient id="back-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2d0b4" />
          <stop offset="100%" stopColor="#c8b090" />
        </linearGradient>
        <linearGradient id="floor-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4a070" />
          <stop offset="100%" stopColor="#8a5e38" />
        </linearGradient>
        <linearGradient id="skyDayGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7eb8e0" />
          <stop offset="50%" stopColor="#c5e4f6" />
          <stop offset="100%" stopColor="#e8f2d4" />
        </linearGradient>
        <linearGradient id="skyDuskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2a58" />
          <stop offset="32%" stopColor="#c05048" />
          <stop offset="68%" stopColor="#ee8a58" />
          <stop offset="100%" stopColor="#f6c888" />
        </linearGradient>
        <linearGradient id="skyDawnGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a88c0" />
          <stop offset="48%" stopColor="#f0a888" />
          <stop offset="100%" stopColor="#fce0bc" />
        </linearGradient>
        <linearGradient id="skyNightGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1020" />
          <stop offset="55%" stopColor="#182848" />
          <stop offset="100%" stopColor="#2a3c68" />
        </linearGradient>
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#f0b45a" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#f0b45a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0c070" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#f0c070" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="windowLight" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff6d8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sofa-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8d8c0" />
          <stop offset="100%" stopColor="#c4a888" />
        </linearGradient>
        <linearGradient id="olive-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a8c52" />
          <stop offset="100%" stopColor="#5c5e32" />
        </linearGradient>
        <linearGradient id="teal-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4e7268" />
          <stop offset="100%" stopColor="#2c4a44" />
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.9  0 0 0 0 0.82  0 0 0 0 0.68  0 0 0 0.12 0"
          />
        </filter>
      </defs>

      <rect width="1000" height="640" fill="#0c0b0a" />

      <g className="nook-world" clipPath="url(#room-clip)">
        {/* architecture */}
        <polygon points="78,36 218,98 218,368 78,610" fill="url(#wall-l)" />
        <polygon points="922,36 782,98 782,368 922,610" fill="url(#wall-r)" />
        <polygon points="78,36 922,36 782,98 218,98" fill="url(#ceil-g)" />
        <polygon points="218,98 782,98 782,368 218,368" fill="url(#back-g)" />
        <polygon points="218,368 782,368 922,610 78,610" fill="url(#floor-g)" />
        {planks}
        {/* cross boards */}
        <line x1="160" y1="460" x2="840" y2="460" stroke="#6a4a2e" strokeWidth="0.8" opacity="0.2" />
        <line x1="120" y1="530" x2="880" y2="530" stroke="#6a4a2e" strokeWidth="0.8" opacity="0.18" />

        {/* ceiling planks */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const t = i / 6;
          const x1 = 78 + t * 844;
          const x2 = 218 + t * 564;
          return (
            <line
              key={`c-${i}`}
              x1={x1}
              y1={36}
              x2={x2}
              y2={98}
              stroke="#7a5638"
              strokeWidth="2.4"
              opacity="0.22"
            />
          );
        })}

        {/* window + sky */}
        <g clipPath="url(#window-clip)">
          <rect className="sky-day" x="292" y="118" width="196" height="148" fill="url(#skyDayGrad)" />
          <rect
            className="sky-dawn"
            x="292"
            y="118"
            width="196"
            height="148"
            fill="url(#skyDawnGrad)"
            opacity="0.2"
          />
          <rect className="sky-dusk" x="292" y="118" width="196" height="148" fill="url(#skyDuskGrad)" />
          <rect
            className="sky-night"
            x="292"
            y="118"
            width="196"
            height="148"
            fill="url(#skyNightGrad)"
            opacity="0"
          />

          <g className="stars" opacity="0">
            <circle className="nook-star" cx="312" cy="138" r="1.15" fill="#f4f0e4" />
            <circle className="nook-star" cx="338" cy="128" r="0.8" fill="#f4f0e4" />
            <circle className="nook-star" cx="364" cy="144" r="1.25" fill="#f4f0e4" />
            <circle className="nook-star" cx="402" cy="126" r="0.9" fill="#f4f0e4" />
            <circle className="nook-star" cx="438" cy="136" r="1.2" fill="#f4f0e4" />
            <circle className="nook-star" cx="458" cy="150" r="0.7" fill="#f4f0e4" />
            <circle className="nook-star" cx="320" cy="158" r="0.6" fill="#f4f0e4" />
          </g>

          <circle className="sun" cx="338" cy="168" r="18" fill="#ffe08a" opacity="0.35" />
          <g className="moon" opacity="0">
            <circle cx="448" cy="148" r="13" fill="#f4eedc" />
            <circle cx="454" cy="144" r="13" fill="#182848" />
          </g>

          <path d="M292 232 C328 208 362 218 396 204 C430 192 460 210 488 202 L488 266 L292 266 Z" fill="#3a4a32" />
          <path d="M292 244 C340 224 380 236 424 222 C456 214 476 226 488 224 L488 266 L292 266 Z" fill="#2a3428" />
        </g>

        {/* window frame */}
        <rect x="286" y="112" width="208" height="160" fill="none" stroke="#5a3c24" strokeWidth="8" rx="2" />
        <rect x="292" y="118" width="196" height="148" fill="none" stroke="#efe4cc" strokeWidth="3" />
        <line x1="390" y1="118" x2="390" y2="266" stroke="#efe4cc" strokeWidth="3" />
        <line x1="292" y1="192" x2="488" y2="192" stroke="#efe4cc" strokeWidth="3" />
        <rect
          className="window-warm"
          x="292"
          y="118"
          width="196"
          height="148"
          fill="url(#windowLight)"
          opacity="0.55"
        />

        {/* curtains */}
        <g className="nook-curtain-l">
          <path
            d="M278 112 C298 132 292 168 304 204 C312 232 296 252 286 266 L278 266 Z"
            fill="#243832"
          />
          <path
            d="M282 118 C294 140 290 176 298 208"
            fill="none"
            stroke="#1a2824"
            strokeWidth="5"
            opacity="0.45"
          />
          <path
            d="M286 130 C296 154 294 186 300 214"
            fill="none"
            stroke="#3a5850"
            strokeWidth="4"
            opacity="0.4"
          />
        </g>
        <g className="nook-curtain-r">
          <path
            d="M508 112 C488 132 494 168 482 204 C474 232 490 252 500 266 L508 266 Z"
            fill="#243832"
          />
          <path
            d="M504 118 C492 140 496 176 488 208"
            fill="none"
            stroke="#1a2824"
            strokeWidth="5"
            opacity="0.45"
          />
        </g>
        <rect x="274" y="108" width="238" height="8" rx="2" fill="#4a3020" />

        {/* left wall — bookshelf + frames */}
        <g transform="translate(108 150)">
          <polygon points="0,8 62,0 70,92 6,108" fill="#4a3020" />
          <polygon points="6,14 58,8 64,86 10,100" fill="#2e1e14" />
          {[
            { x: 12, y: 22, w: 7, h: 18, c: "#8b3a2a" },
            { x: 20, y: 20, w: 6, h: 20, c: "#c47a3a" },
            { x: 27, y: 24, w: 8, h: 16, c: "#d8c48a" },
            { x: 36, y: 18, w: 6, h: 22, c: "#3d5c4a" },
            { x: 43, y: 22, w: 7, h: 18, c: "#2a3a5c" },
            { x: 14, y: 52, w: 8, h: 20, c: "#f0e8d8" },
            { x: 23, y: 50, w: 6, h: 22, c: "#6b2a2a" },
            { x: 30, y: 54, w: 7, h: 18, c: "#7a5a32" },
            { x: 38, y: 48, w: 6, h: 24, c: "#8b3a2a" },
            { x: 45, y: 52, w: 8, h: 20, c: "#3d5c4a" },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} rx={0.6} />
          ))}
          <line x1="8" y1="44" x2="64" y2="38" stroke="#6a4830" strokeWidth="3" />
          <line x1="10" y1="76" x2="66" y2="70" stroke="#6a4830" strokeWidth="3" />
        </g>
        <RoundFrame x={168} y={292} r={24} art="#6a8aaa" />
        <WoodFrame x={158} y={346} w={40} h={30} art="#c47a5a" rot={-5} />
        <WoodFrame x={204} y={338} w={26} h={34} art="#d8c48a" rot={4} />
        <WoodFrame x={176} y={392} w={34} h={24} art="#3d5c54" rot={-2} />

        {/* left pendant */}
        <line x1="214" y1="98" x2="214" y2="188" stroke="#3a2818" strokeWidth="1.5" />
        <ellipse cx="214" cy="200" rx="13" ry="14" fill="#f0d080" />
        <ellipse className="lamp-glow" cx="214" cy="204" rx="40" ry="40" fill="url(#lampGlow)" />

        {/* right wall frames + shelf */}
        <RoundFrame x={820} y={188} r={22} art="#8a6a4a" />
        <WoodFrame x={832} y={246} w={38} h={28} art="#5a7a9a" rot={5} />
        <WoodFrame x={796} y={242} w={26} h={34} art="#c4a070" rot={-4} />
        <WoodFrame x={818} y={298} w={44} h={30} art="#3a4a3a" rot={2} />
        <g transform="translate(792 338)">
          <polygon points="8,0 72,10 64,110 0,92" fill="#4a3020" />
          <polygon points="14,8 66,16 60,100 8,86" fill="#2e1e14" />
          {[
            { x: 20, y: 20, w: 7, h: 18, c: "#c47a3a" },
            { x: 28, y: 18, w: 6, h: 20, c: "#2a3a5c" },
            { x: 35, y: 22, w: 8, h: 16, c: "#8b3a2a" },
            { x: 44, y: 16, w: 6, h: 22, c: "#d8c48a" },
            { x: 22, y: 52, w: 8, h: 20, c: "#3d5c4a" },
            { x: 31, y: 50, w: 6, h: 22, c: "#f0e8d8" },
            { x: 38, y: 54, w: 7, h: 18, c: "#6b2a2a" },
            { x: 46, y: 48, w: 6, h: 24, c: "#7a5a32" },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} rx={0.6} />
          ))}
        </g>

        {/* sofa — against the back wall */}
        <g transform="translate(500 318)">
          <ellipse cx="0" cy="58" rx="150" ry="16" fill="#3a2418" opacity="0.28" />
          {/* base */}
          <path
            d="M-148 8 C-140 -28 -80 -42 0 -42 C80 -42 140 -28 148 8 L154 50 C154 66 90 78 0 78 C-90 78 -154 66 -154 50 Z"
            fill="url(#sofa-g)"
          />
          {/* seat plane */}
          <path
            d="M-132 10 C-90 0 -40 -4 0 -4 C40 -4 90 0 132 10 L136 42 C90 34 40 30 0 30 C-40 30 -90 34 -136 42 Z"
            fill="#efe4cc"
          />
          {/* back cushions */}
          <ellipse cx="-78" cy="-6" rx="42" ry="26" fill="#d4c0a4" />
          <ellipse cx="0" cy="-10" rx="46" ry="24" fill="#e0ccb0" />
          <ellipse cx="78" cy="-6" rx="42" ry="26" fill="#d0ba9a" />
          {/* arms */}
          <path d="M-154 8 C-164 -10 -148 -24 -132 -8 L-128 48 C-148 52 -162 36 -154 8 Z" fill="#c4aa88" />
          <path d="M154 8 C164 -10 148 -24 132 -8 L128 48 C148 52 162 36 154 8 Z" fill="#c4aa88" />
          {/* skirt */}
          <path d="M-136 48 L136 48 L140 62 C80 70 -80 70 -140 62 Z" fill="#b09070" />
        </g>

        {/* person, right side of sofa */}
        <g className="nook-person" transform="translate(552 272)">
          <ellipse cx="22" cy="68" rx="28" ry="8" fill="#3a2418" opacity="0.2" />
          <rect x="6" y="48" width="38" height="14" rx="6" fill="#3a2c22" transform="rotate(-12 25 55)" />
          <rect x="-8" y="50" width="18" height="16" rx="7" fill="#2e2218" transform="rotate(18 1 58)" />
          <ellipse cx="8" cy="40" rx="18" ry="22" fill="#f3eadc" />
          <circle cx="14" cy="8" r="13" fill="#d2ae8c" />
          <path d="M2 -2 C4 -18 26 -18 28 0 C26 8 20 14 14 10 C10 20 0 12 0 4 C0 0 1 -2 2 -2 Z" fill="#1a1210" />
          <circle cx="10" cy="10" r="2.4" fill="#d2ae8c" />
          <g className="nook-arm">
            <rect x="10" y="28" width="28" height="8" rx="4" fill="#f3eadc" transform="rotate(22 24 32)" />
            <g transform="translate(30 36) rotate(-20)">
              <rect x="0" y="0" width="30" height="17" rx="2" fill="#1c1c1a" />
              <rect x="2" y="2" width="26" height="10" rx="1" fill="#6a96a6" />
            </g>
          </g>
        </g>

        {/* floor lamp — behind the chairs */}
        <g transform="translate(848 218)">
          <line x1="0" y1="28" x2="0" y2="268" stroke="#3a2818" strokeWidth="3.2" />
          <ellipse cx="0" cy="272" rx="18" ry="5.5" fill="#2a1c14" />
          <path d="M-24 28 L24 28 L14 -14 L-14 -14 Z" fill="#e8d8b0" />
          <path d="M-18 22 L18 22 L10 -8 L-10 -8 Z" fill="#f6eed8" />
          <ellipse className="lamp-glow" cx="0" cy="48" rx="70" ry="84" fill="url(#lampGlow)" />
        </g>

        {/* coffee table */}
        <g transform="translate(498 428)">
          <ellipse cx="0" cy="22" rx="88" ry="18" fill="#2a1c12" opacity="0.28" />
          <ellipse cx="0" cy="8" rx="86" ry="18" fill="#4a3020" />
          <ellipse cx="0" cy="4" rx="80" ry="14" fill="#7a5638" />
          <ellipse cx="0" cy="2" rx="76" ry="11" fill="#8a6444" />
          {/* mug */}
          <rect x="-28" y="-18" width="13" height="15" rx="2" fill="#f2ebe0" />
          <path d="M-15 -14 C-8 -14 -8 -6 -15 -6" fill="none" stroke="#f2ebe0" strokeWidth="1.8" />
          <g transform="translate(-22 -20)">
            <path
              className="nook-steam"
              d="M0 0 C-2 -6 2 -10 0 -16"
              fill="none"
              stroke="#f4efe4"
              strokeWidth="1.15"
              opacity="0.55"
            />
            <path
              className="nook-steam"
              d="M4 0 C2 -7 6 -11 4 -17"
              fill="none"
              stroke="#f4efe4"
              strokeWidth="1.15"
              opacity="0.55"
            />
            <path
              className="nook-steam"
              d="M-4 0 C-6 -5 -2 -9 -4 -14"
              fill="none"
              stroke="#f4efe4"
              strokeWidth="1.15"
              opacity="0.55"
            />
          </g>
          <rect x="6" y="-10" width="32" height="9" rx="1" fill="#3d4a6a" transform="rotate(-9 22 -6)" />
          <rect x="8" y="-6" width="28" height="7" rx="1" fill="#8b3a2a" transform="rotate(-7 22 -2)" />
          {/* vase + plant */}
          <path d="M40 8 L44 -10 C44 -16 54 -16 54 -10 L58 8 Z" fill="#c47a5a" />
          <g className="nook-plant">
            <path d="M49 -10 C42 -24 54 -34 52 -42" fill="none" stroke="#2d5a3a" strokeWidth="1.7" />
            <ellipse cx="42" cy="-28" rx="8" ry="4.5" fill="#3d7a4a" transform="rotate(-32 42 -28)" />
            <ellipse cx="58" cy="-32" rx="9" ry="4.5" fill="#2d6a40" transform="rotate(26 58 -32)" />
            <ellipse cx="50" cy="-40" rx="7" ry="3.6" fill="#4a8a52" transform="rotate(-8 50 -40)" />
          </g>
        </g>

        {/* rug */}
        <ellipse cx="500" cy="512" rx="228" ry="70" fill="#5a281c" />
        <ellipse cx="500" cy="512" rx="204" ry="56" fill="#a06040" />
        <ellipse cx="500" cy="512" rx="184" ry="46" fill="none" stroke="#c48860" strokeWidth="2.4" opacity="0.5" />
        <ellipse cx="500" cy="512" rx="72" ry="16" fill="#b07048" opacity="0.45" />

        {/* left armchair */}
        <g transform="translate(286 418)">
          <ellipse cx="4" cy="78" rx="56" ry="16" fill="#2a1c12" opacity="0.28" />
          {/* back */}
          <path
            d="M-36 -8 C-40 -48 8 -62 28 -40 C36 -28 22 8 -4 18 C-28 22 -40 12 -36 -8 Z"
            fill="url(#olive-g)"
          />
          {/* seat */}
          <path d="M-40 18 C-20 8 20 8 48 22 L52 56 C20 66 -24 64 -46 50 Z" fill="#7a7c48" />
          <path d="M-40 18 C-20 8 20 8 48 22 L44 36 C16 26 -16 26 -38 32 Z" fill="#8a8c56" />
          {/* arms */}
          <ellipse cx="-42" cy="32" rx="14" ry="26" fill="#5c5e32" />
          <ellipse cx="46" cy="36" rx="13" ry="24" fill="#5c5e32" />
          {/* front rail */}
          <path d="M-44 50 L50 56 L48 66 L-46 58 Z" fill="#4e5028" />
        </g>

        {/* right armchair */}
        <g transform="translate(714 428)">
          <ellipse cx="-4" cy="78" rx="58" ry="16" fill="#2a1c12" opacity="0.28" />
          <path
            d="M38 -6 C44 -48 -6 -64 -28 -40 C-36 -26 -20 10 6 20 C30 24 44 14 38 -6 Z"
            fill="url(#teal-g)"
          />
          <path d="M42 20 C20 8 -22 10 -50 24 L-54 58 C-18 70 26 66 48 52 Z" fill="#3d5c54" />
          <path d="M42 20 C20 8 -22 10 -50 24 L-46 38 C-16 26 16 24 40 34 Z" fill="#4e7268" />
          <ellipse cx="44" cy="34" rx="14" ry="26" fill="#2f4a44" />
          <ellipse cx="-48" cy="38" rx="13" ry="24" fill="#2f4a44" />
          <path d="M46 52 L-52 58 L-50 68 L48 60 Z" fill="#243832" />
        </g>

        {/* floor plant */}
        <g className="nook-plant" transform="translate(214 488)">
          <ellipse cx="0" cy="36" rx="18" ry="7" fill="#2a1c12" opacity="0.28" />
          <path d="M-12 36 L-7 10 L7 10 L12 36 Z" fill="#8a4a32" />
          <path d="M0 10 C-18 -12 -8 -34 0 -40 C8 -34 10 -18 4 -6" fill="#2d6a40" />
          <path d="M0 10 C16 -2 20 -26 10 -40 C2 -28 -4 -16 -2 -4" fill="#3d7a4a" />
          <path d="M0 10 C-6 -22 12 -36 16 -18 C8 -10 2 2 0 10" fill="#245a34" />
        </g>

        {/* hanging pendant */}
        <g className="nook-pendant">
          <line x1="470" y1="98" x2="470" y2="188" stroke="#3a2818" strokeWidth="1.7" />
          <ellipse cx="470" cy="206" rx="18" ry="19" fill="#f2d078" />
          <ellipse cx="470" cy="200" rx="11" ry="10" fill="#fff6c8" opacity="0.85" />
          <ellipse className="lamp-glow" cx="470" cy="220" rx="100" ry="100" fill="url(#lampGlow)" />
          <ellipse className="lamp-glow" cx="500" cy="450" rx="180" ry="56" fill="url(#floorGlow)" />
        </g>

        {/* cat */}
        <g className="nook-cat-travel" transform="translate(330 518)">
          <g className="nook-cat-flip">
            <g className="nook-cat-bounce">
              <ellipse cx="22" cy="28" rx="18" ry="4.5" fill="#2a1c12" opacity="0.32" />
              <path
                className="nook-tail"
                d="M4 12 C-10 2 -12 -8 -4 -16"
                fill="none"
                stroke="#f4efe6"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
              <ellipse cx="20" cy="16" rx="17" ry="10" fill="#f4efe6" />
              <circle cx="38" cy="11" r="8.5" fill="#f7f2ea" />
              <path d="M31 7 L33.2 -2 L38 7 Z" fill="#f4efe6" />
              <path d="M40 7 L46.5 -2 L46 9 Z" fill="#f4efe6" />
              <path d="M32.4 6 L33.4 0.5 L36 6 Z" fill="#e0b0a0" />
              <path d="M41.2 6 L44.6 0.2 L45.2 7 Z" fill="#e0b0a0" />
              <circle cx="40.4" cy="11" r="1.15" fill="#2a1c14" />
              <circle cx="44.4" cy="11" r="1.15" fill="#2a1c14" />
              <ellipse cx="42.4" cy="13.4" rx="1.15" ry="0.7" fill="#d09080" />
              <rect x="9" y="20" width="3.4" height="9" rx="1.5" fill="#efe8dc" />
              <rect x="16" y="20" width="3.4" height="9" rx="1.5" fill="#efe8dc" />
              <rect x="25" y="20" width="3.4" height="9" rx="1.5" fill="#efe8dc" />
              <rect x="32" y="20" width="3.4" height="9" rx="1.5" fill="#efe8dc" />
            </g>
          </g>
        </g>

        <polygon
          className="night-veil"
          points="78,36 922,36 922,610 78,610"
          fill="#0a1220"
          opacity="0.12"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>

      {/* doorframe */}
      <g>
        <path
          d="M0 0 H1000 V640 H0 Z M74 32 H926 V614 H74 Z"
          fill="#0c0b0a"
          fillRule="evenodd"
        />
        <polygon points="48,10 78,36 78,610 48,634" fill="#1a120e" />
        <polygon points="952,10 922,36 922,610 952,634" fill="#120c0a" />
        <polygon points="48,10 952,10 922,36 78,36" fill="#221610" />
        <polygon points="48,634 952,634 922,610 78,610" fill="#0e0a08" />
        <rect x="76" y="34" width="848" height="578" fill="none" stroke="#3a2a1c" strokeWidth="3.5" />
        <rect x="78" y="36" width="844" height="574" fill="none" stroke="#6a4a32" strokeWidth="1.1" opacity="0.65" />
        <polygon points="78,36 104,52 104,594 78,610" fill="#2a1c14" opacity="0.9" />
        <polygon points="922,36 896,52 896,594 922,610" fill="#140e0c" opacity="0.92" />
        <polygon points="78,36 922,36 896,52 104,52" fill="#3a281c" opacity="0.85" />
      </g>

      <rect
        x="0"
        y="0"
        width="1000"
        height="640"
        filter="url(#grain)"
        opacity="0.32"
        style={{ mixBlendMode: "overlay", pointerEvents: "none" }}
      />
    </svg>
  );
}

export type { TimeOfDay };
