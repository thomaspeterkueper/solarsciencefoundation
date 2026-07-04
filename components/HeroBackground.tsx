// components/HeroBackground.tsx
// Hero background: 6 photo layers with slow CSS crossfade + animated SVG network on top.
// Purely decorative — aria-hidden, no interaction, no JS timers.

'use client';

const IMAGES = [
  { src: '/images/hero/ssf-hero0.png', opacity: 0.10 }, // Sonne — intensiv, niedrigere Opacity
  { src: '/images/hero/ssf-hero1.png', opacity: 0.18 }, // Manganknollen
  { src: '/images/hero/ssf-hero2.png', opacity: 0.18 }, // Kristall
  { src: '/images/hero/ssf-hero3.png', opacity: 0.22 }, // Neuronen sepia
  { src: '/images/hero/ssf-hero4.png', opacity: 0.25 }, // Myzel hell
  { src: '/images/hero/ssf-hero5.png', opacity: 0.25 }, // Myzel cream
];

const TOTAL = IMAGES.length;
const DURATION = 8;   // seconds visible per image
const FADE     = 3;   // seconds crossfade overlap
const CYCLE    = TOTAL * DURATION; // total cycle length

// SVG network nodes
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

export default function HeroBackground() {
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
      <style>{`
        /* Photo crossfade — each image cycles through:
           fade-in → hold → fade-out → invisible
           staggered by DURATION seconds per image */
        @keyframes hero-crossfade {
          0%                                        { opacity: 0; }
          ${(FADE / CYCLE * 100).toFixed(1)}%       { opacity: 1; }
          ${((DURATION) / CYCLE * 100).toFixed(1)}% { opacity: 1; }
          ${((DURATION + FADE) / CYCLE * 100).toFixed(1)}% { opacity: 0; }
          100%                                      { opacity: 0; }
        }

        .hero-img-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: hero-crossfade ${CYCLE}s ease-in-out infinite;
        }

        /* SVG node pulse */
        @keyframes node-pulse {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.55; }
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.30; }
          50%       { transform: scale(1.3); opacity: 0.55; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-img-layer { animation: none; opacity: 0; }
          .hero-img-layer:first-child { opacity: 1; }
        }
      `}</style>

      {/* Photo layers */}
      {IMAGES.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt=""
          className="hero-img-layer"
          style={{
            opacity: 0,
            animationDelay: `${i * DURATION}s`,
            // Each image has its own max opacity via a CSS var hack:
            // we override the keyframe peak via filter brightness to stay tonal
            filter: `brightness(${img.opacity / 0.25 * 100}%)`,
          }}
        />
      ))}

      {/* SVG network — sits above photos */}
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
          <radialGradient id="hero-fade" cx="50%" cy="40%" r="65%">
            <stop offset="0%"   stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="85%"  stopColor="#fbfaf7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbfaf7" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Edges — static */}
        <g stroke="#cfc6b6" strokeWidth="1" opacity="0.4">
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
            />
          ))}
        </g>

        {/* Node rings — pulsing */}
        {NODES.map((n, i) => (
          <circle
            key={`ring-${i}`}
            cx={n.x} cy={n.y}
            r={i % 5 === 0 ? 7 : 4}
            fill="none"
            stroke="#cfc6b6"
            strokeWidth="1"
            style={{
              animation: `node-pulse ${7 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.37) % 5}s`,
            }}
          />
        ))}

        {/* Gold dots — subtle scale pulse */}
        {NODES.map((n, i) => (
          <circle
            key={`dot-${i}`}
            cx={n.x} cy={n.y}
            r={i % 5 === 0 ? 2.5 : 1.5}
            fill="#b98b2d"
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              animation: `dot-pulse ${9 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.53) % 6}s`,
            }}
          />
        ))}

        {/* Radial fade — keeps text readable */}
        <rect x="0" y="0" width="1200" height="600" fill="url(#hero-fade)" />
      </svg>
    </div>
  );
}
