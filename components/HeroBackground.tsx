// components/HeroBackground.tsx
// Subtle SVG knowledge-network background for the Hero section.
// Purely decorative — aria-hidden, no interaction.

'use client';

import { useEffect, useRef } from 'react';

// Fixed node positions (as % of viewBox 1200×600)
const NODES = [
  { x: 60,  y: 90  },
  { x: 190, y: 210 },
  { x: 340, y: 60  },
  { x: 480, y: 180 },
  { x: 600, y: 80  },
  { x: 720, y: 240 },
  { x: 860, y: 50  },
  { x: 980, y: 190 },
  { x: 1100,y: 100 },
  { x: 130, y: 370 },
  { x: 290, y: 460 },
  { x: 440, y: 340 },
  { x: 580, y: 440 },
  { x: 700, y: 330 },
  { x: 830, y: 420 },
  { x: 960, y: 360 },
  { x: 1080,y: 470 },
  { x: 200, y: 540 },
  { x: 500, y: 560 },
  { x: 780, y: 530 },
  { x: 1050,y: 560 },
];

// Edges: index pairs
const EDGES = [
  [0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,5],[4,6],
  [5,7],[6,7],[6,8],[7,8],[1,9],[9,10],[10,11],
  [3,11],[11,12],[5,12],[12,13],[7,13],[13,14],
  [8,15],[14,15],[15,16],[9,17],[17,10],[10,18],
  [12,18],[14,19],[16,19],[16,20],[19,20],
];

export default function HeroBackground() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <radialGradient id="hero-fade" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="#fbfaf7" stopOpacity="0" />
          <stop offset="100%" stopColor="#fbfaf7" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Edges */}
      <g stroke="#cfc6b6" strokeWidth="1" opacity="0.55">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
          />
        ))}
      </g>

      {/* Nodes — outer ring */}
      <g fill="none" stroke="#cfc6b6" strokeWidth="1" opacity="0.6">
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i % 5 === 0 ? 7 : 4} />
        ))}
      </g>

      {/* Nodes — inner dot */}
      <g fill="#b98b2d" opacity="0.3">
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i % 5 === 0 ? 2.5 : 1.5} />
        ))}
      </g>

      {/* Radial fade so text remains readable */}
      <rect x="0" y="0" width="1200" height="600" fill="url(#hero-fade)" />
    </svg>
  );
}
