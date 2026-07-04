// components/HeroBackground.tsx
// Hero background: 6 photo layers with CSS crossfade + animated SVG network on top.
// CSS-only, no JS timers. aria-hidden.

'use client';

// Per-image max opacity (injected as CSS custom property)
const IMAGES = [
  { src: '/images/hero/ssf-hero0.png', maxOpacity: 0.10 },
  { src: '/images/hero/ssf-hero1.png', maxOpacity: 0.18 },
  { src: '/images/hero/ssf-hero2.png', maxOpacity: 0.18 },
  { src: '/images/hero/ssf-hero3.png', maxOpacity: 0.22 },
  { src: '/images/hero/ssf-hero4.png', maxOpacity: 0.25 },
  { src: '/images/hero/ssf-hero5.png', maxOpacity: 0.25 },
];

const N        = IMAGES.length;   // 6
const HOLD     = 8;               // seconds fully visible
const FADE     = 3;               // seconds to crossfade
const CYCLE    = N * (HOLD + FADE); // 66s total

const NODES = [
  { x: 60,   y: 90  }, { x: 190, y: 210 }, { x: 340, y: 60  },
  { x: 480,  y: 180 }, { x: 600, y: 80  }, { x: 720, y: 240 },
  { x: 860,  y: 50  }, { x: 980, y: 190 }, { x: 1100,y: 100 },
  { x: 130,  y: 370 }, { x: 290, y: 460 }, { x: 440, y: 340 },
  { x: 580,  y: 440 }, { x: 700, y: 330 }, { x: 830, y: 420 },
  { x: 960,  y: 360 }, { x: 1080,y: 470 }, { x: 200, y: 540 },
  { x: 500,  y: 560 }, { x: 780, y: 530 }, { x: 1050,y: 560 },
];

const EDGES = [
  [0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,5],[4,6],
  [5,7],[6,7],[6,8],[7,8],[1,9],[9,10],[10,11],
  [3,11],[11,12],[5,12],[12,13],[7,13],[13,14],
  [8,15],[14,15],[15,16],[9,17],[17,10],[10,18],
  [12,18],[14,19],[16,19],[16,20],[19,20],
];

// Build one @keyframes rule per image based on its maxOpacity and stagger offset
function buildKeyframes(index: number, maxOpacity: number): string {
  const step = HOLD + FADE;
  const start = (index * step / CYCLE) * 100;
  const peakIn  = start + (FADE / CYCLE * 100);
  const peakOut = start + ((FADE + HOLD) / CYCLE * 100);
  const end     = start + (step / CYCLE * 100);

  // Wrap around if > 100
  const s  = start.toFixed(2);
  const pi = peakIn.toFixed(2);
  const po = peakOut.toFixed(2);
  const e  = end.toFixed(2);

  if (parseFloat(e) <= 100) {
    return `
      @keyframes hero-img-${index} {
        0%      { opacity: 0; }
        ${s}%   { opacity: 0; }
        ${pi}%  { opacity: ${maxOpacity}; }
        ${po}%  { opacity: ${maxOpacity}; }
        ${e}%   { opacity: 0; }
        100%    { opacity: 0; }
      }`;
  } else {
    // Wraps around end of cycle — split into two segments
    const overflow = parseFloat(e) - 100;
    return `
      @keyframes hero-img-${index} {
        0%      { opacity: ${overflow < (FADE / CYCLE * 100) ? maxOpacity : 0}; }
        ${Math.min(overflow, parseFloat(po) - 100).toFixed(2)}% { opacity: ${maxOpacity}; }
        ${(parseFloat(po) - 100).toFixed(2)}% { opacity: ${maxOpacity}; }
        ${(parseFloat(e) - 100).toFixed(2)}%  { opacity: 0; }
        ${s}%   { opacity: 0; }
        ${pi}%  { opacity: ${maxOpacity}; }
        ${po}%  { opacity: ${maxOpacity}; }
        100%    { opacity: 0; }
      }`;
  }
}

export default function HeroBackground() {
  const css = `
    ${IMAGES.map((img, i) => buildKeyframes(i, img.maxOpacity)).join('\n')}

    .hero-img-layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      animation-duration: ${CYCLE}s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
    ${IMAGES.map((_, i) => `.hero-img-layer-${i} { animation-name: hero-img-${i}; }`).join('\n')}

    @keyframes node-pulse {
      0%, 100% { opacity: 0.2; }
      50%       { opacity: 0.5; }
    }
    @keyframes dot-pulse {
      0%, 100% { opacity: 0.25; transform: scale(1); }
      50%       { opacity: 0.5;  transform: scale(1.3); }
    }
    @media (prefers-reduced-motion: reduce) {
      .hero-img-layer { animation: none !important; }
      .hero-img-layer-0 { opacity: ${IMAGES[0].maxOpacity} !important; }
    }
  `;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {IMAGES.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt=""
          className={`hero-img-layer hero-img-layer-${i}`}
        />
      ))}

      {/* SVG network overlay */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <radialGradient id="hero-vignette" cx="50%" cy="45%" r="60%">
            <stop offset="0%"   stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="80%"  stopColor="#fbfaf7" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#fbfaf7" stopOpacity="1" />
          </radialGradient>
        </defs>

        <g stroke="#cfc6b6" strokeWidth="1" opacity="0.35">
          {EDGES.map(([a, b], i) => (
            <line key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
            />
          ))}
        </g>

        {NODES.map((n, i) => (
          <circle key={`r${i}`}
            cx={n.x} cy={n.y} r={i % 5 === 0 ? 7 : 4}
            fill="none" stroke="#cfc6b6" strokeWidth="1"
            style={{
              animation: `node-pulse ${7 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.37) % 5}s`,
            }}
          />
        ))}

        {NODES.map((n, i) => (
          <circle key={`d${i}`}
            cx={n.x} cy={n.y} r={i % 5 === 0 ? 2.5 : 1.5}
            fill="#b98b2d"
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              animation: `dot-pulse ${9 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.53) % 6}s`,
            }}
          />
        ))}

        <rect x="0" y="0" width="1200" height="600" fill="url(#hero-vignette)" />
      </svg>
    </div>
  );
}
