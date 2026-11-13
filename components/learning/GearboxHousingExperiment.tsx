'use client';
/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      components/learning/GearboxHousingExperiment.tsx
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/components/learning/GearboxHousingExperiment.tsx
 * Name:      GearboxHousingExperiment — EXP:GEHAEUSE-SANDGUSS, EXP:GETRIEBE-MONTAGE
 * Version:   0.1.0
 * Created:   2026-11-05
 * Modified:  2026-11-05 17:45 CET
 * Depends:   three (dynamisch geladen), RayleighExperiment.module.css
 *
 * 3D-Prinzipmodell eines zweistufigen Stirnradgetriebes mit Topf-Deckel-Gussgehäuse.
 * Phase „guss“: Modell, Einformen, Ziehen, Gießen, Auspacken, Planfräsen, Ausbohren.
 * Phase „montage“: Vormontage, Einschieben der drei waagerechten Wellen, Deckel, Verschrauben,
 * Dichtringe, Öl und Probelauf. Proportionen sind schematisch.
 * Textlicher Fallback: Die Schrittbeschreibung unter der Bühne trägt den vollständigen Inhalt.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type * as ThreeNS from 'three';
import styles from './RayleighExperiment.module.css';

type Phase = 'guss' | 'montage';
type Three = typeof ThreeNS;

type ShaftState = { vis: number; asm: number; x: number };
type SceneState = {
  patVis: number; patOp: number; patY: number; sandH: number; sandOp: number; topfVis: number; topfRot: number;
  pourH: number; heat: number; stream: number; millVis: number; millY: number; millZ: number; flange: number;
  boreVis: number; boreX: number; boreY: number; eyes: number; front: number; sh: ShaftState[];
  capsA: number; capsB: number; pins: number; deckVis: number; deckX: number; screws: number; oil: number; plugs: number; spin: number;
};
type Step = {
  phase: Phase; dur: number; cam: CamKey; title: string; what: string; why: string;
  fn: (s: SceneState, p: number) => void; start?: number;
};
type CamKey = 'cast' | 'pull' | 'mach' | 'prep' | 'insert' | 'close' | 'run';

const PI = Math.PI;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => { t = clamp(t); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
const Y = [4.0, 1.4, -1.8];

const CAM: Record<CamKey, { t: [number, number, number]; d: number; az: number; el: number }> = {
  cast: { t: [0, 2.5, 0], d: 42, az: 0.55, el: 0.28 },
  pull: { t: [0, 8, 0], d: 50, az: 0.55, el: 0.22 },
  mach: { t: [3, 0, 0], d: 36, az: 0.95, el: 0.3 },
  prep: { t: [10, 0, 0], d: 52, az: 0.42, el: 0.3 },
  insert: { t: [6, 0, 0], d: 44, az: 0.5, el: 0.3 },
  close: { t: [3, 0, 0], d: 38, az: 0.85, el: 0.3 },
  run: { t: [0, -0.5, 0], d: 31, az: 0.32, el: 0.26 },
};

const STEPS: Step[] = [
  { phase: 'guss', dur: 4, cam: 'cast', title: 'Modell bauen',
    what: 'Ein Modell des Topfs aus Holz oder Kunststoff. Es steht mit der offenen Seite nach oben – das ist die spätere Ziehrichtung.',
    why: 'Das Modell ist etwa 1 % größer als das fertige Teil, weil Gusseisen beim Abkühlen schwindet. Alle Wände in Ziehrichtung bekommen 1–3° Aushebeschräge.',
    fn: (S) => { S.patVis = 1; S.patOp = 1; } },
  { phase: 'guss', dur: 5, cam: 'cast', title: 'Einformen',
    what: 'Formsand wird um das Modell und in seinen Innenraum gestampft, bis der Formkasten voll ist.',
    why: 'Der Sand im Inneren bildet später den Hohlraum des Topfs. Weil der Topf auf einer Seite offen ist, braucht man dafür keinen eigenen Kern.',
    fn: (S, p) => { S.sandH = ease(p); S.sandOp = 1; } },
  { phase: 'guss', dur: 4.5, cam: 'pull', title: 'Modell ziehen',
    what: 'Das Modell wird senkrecht nach oben aus dem Sand gezogen. Zurück bleibt ein Hohlraum in Form des Topfs.',
    why: 'Ohne Aushebeschräge würde das Modell an den Wänden reiben und Sand mitreißen. Augen, die quer abstehen (Ablass, Entlüftung), sind am Modell lose Teile und werden danach seitlich entnommen.',
    fn: (S, p) => { S.patY = 26 * ease(p); S.patOp = 1 - clamp((p - 0.6) / 0.4); if (p >= 1) S.patVis = 0; } },
  { phase: 'guss', dur: 6, cam: 'cast', title: 'Gießen',
    what: 'Flüssiges Gusseisen mit rund 1 400 °C läuft über den Einguss in die Form und füllt sie von unten nach oben.',
    why: 'Gleichmäßige Wandstärke sorgt dafür, dass alles etwa gleich schnell erstarrt. Dicke Stellen würden zuletzt fest und bilden Lunker, also Hohlräume im Material.',
    fn: (S, p) => { S.patVis = 0; S.topfVis = 1; S.heat = 1; S.pourH = p >= 1 ? 999 : lerp(-5.2, 9.6, clamp(p / 0.9)); S.stream = p < 0.93 ? clamp(p / 0.06) : 0; } },
  { phase: 'guss', dur: 5, cam: 'cast', title: 'Erstarren und auspacken',
    what: 'Das Eisen kühlt ab und wird fest. Danach wird der Sand abgeschlagen, Einguss und Speiser werden abgetrennt.',
    why: 'Übrig bleibt das Rohgussteil mit rauer Gusshaut. Seine Maße schwanken um etwa einen Millimeter – für Lagersitze viel zu ungenau.',
    fn: (S, p) => { S.heat = 1 - ease(clamp(p / 0.6)); S.sandOp = 1 - ease(clamp((p - 0.3) / 0.7)); } },
  { phase: 'guss', dur: 6.5, cam: 'mach', title: 'Teilfuge planfräsen',
    what: 'Der Topf wird waagerecht aufgespannt. Ein Planfräser fährt in zwei Bahnen über die Flanschfläche.',
    why: 'Die Teilfuge muss eben sein, damit die Dichtung zum Deckel überall anliegt. Dafür gibt es hier 2–3 mm Bearbeitungszugabe. Gewinde und Stiftbohrungen entstehen in derselben Aufspannung.',
    fn: (S, p) => {
      S.topfRot = (PI / 2) * (1 - ease(clamp(p / 0.28)));
      const q = clamp((p - 0.32) / 0.66); S.millVis = p > 0.3 && p < 1 ? 1 : 0;
      const pass = q < 0.5 ? 0 : 1, l = pass ? (q - 0.5) * 2 : q * 2;
      S.millY = lerp(7.6, -7.2, l); S.millZ = pass ? 1.9 : -1.9; S.flange = q;
    } },
  { phase: 'guss', dur: 6.5, cam: 'mach', title: 'Lagersitze ausbohren',
    what: 'Eine Bohrstange fährt nacheinander in die drei Lageraugen und bohrt die Lagersitze auf Maß.',
    why: 'Toleranz H7 und genaue Achsabstände entscheiden, ob die Zahnräder sauber kämmen. Der Deckel wird genauso bearbeitet, mit den Passstiften als Bezug. Alle anderen Flächen bleiben Gusshaut.',
    fn: (S, p) => {
      const k = Math.min(2, Math.floor(p * 3)), lp = p * 3 - k;
      S.boreVis = p < 1 ? 1 : 0; S.boreY = Y[k];
      S.boreX = lp < 0.5 ? lerp(18, -7.1, ease(lp * 2)) : lerp(-7.1, 18, ease((lp - 0.5) * 2)); S.eyes = clamp(p);
    } },
  { phase: 'montage', dur: 7.5, cam: 'prep', title: 'Wellen vormontieren',
    what: 'Außerhalb des Gehäuses kommen auf jede Welle das linke Lager, die Zahnräder, die Distanzhülsen und das rechte Lager.',
    why: 'Lager-Innenringe und Zahnräder sitzen fest (k6/m6 bzw. mit Passfeder), weil sie mitdrehen. So entsteht pro Welle ein fertiges Paket, das man nur noch einschiebt. Die vordere Gehäusewand ist ab hier durchsichtig gezeichnet.',
    fn: (S, p) => { S.front = 1 - 0.84 * ease(clamp(p / 0.25)); for (let i = 0; i < 3; i++) { S.sh[i].vis = 1; S.sh[i].asm = clamp((p - 0.08 - i * 0.1) / 0.62); } } },
  { phase: 'montage', dur: 3.5, cam: 'insert', title: 'Festlager-Deckel am Topf',
    what: 'Für Antriebs- und Zwischenwelle werden die geschlossenen Lagerdeckel außen am Topfboden angeschraubt.',
    why: 'Sie sind der axiale Anschlag für die Festlager im Topf. Die Abtriebswelle bekommt ihren Deckel erst später, weil sie hier nach außen geht.',
    fn: (S, p) => { S.capsA = ease(p); } },
  { phase: 'montage', dur: 4.5, cam: 'insert', title: 'Abtriebswelle einschieben',
    what: 'Das Paket wird waagerecht von der offenen Seite in den Topf geschoben, bis das Lager im Topfboden sitzt.',
    why: 'Die Außenringe stehen still und haben deshalb eine lockere Passung (H7). So lässt sich die Welle von Hand einschieben. Das Wellenende ragt durch die Bohrung nach außen.',
    fn: (S, p) => { S.sh[2].x = 20 * (1 - ease(p)); } },
  { phase: 'montage', dur: 4.5, cam: 'insert', title: 'Zwischenwelle einschieben',
    what: 'Beim Einschieben gleitet das Ritzel der Stufe 2 axial in die Verzahnung des großen Rads.',
    why: 'Bei Geradverzahnung geht das ohne Drehen. Bei Schrägverzahnung dreht man die Welle beim Einschieben leicht mit.',
    fn: (S, p) => { S.sh[1].x = 20 * (1 - ease(p)); } },
  { phase: 'montage', dur: 4.5, cam: 'insert', title: 'Antriebswelle einschieben',
    what: 'Als letzte Welle kommt die Antriebswelle. Ihr Ritzel greift in das Rad der Stufe 1.',
    why: 'Wer von unten nach oben montiert, hat das schwere Rad zuerst sicher liegen und sieht bei jeder weiteren Welle, ob die Verzahnung sauber greift.',
    fn: (S, p) => { S.sh[0].x = 20 * (1 - ease(p)); } },
  { phase: 'montage', dur: 5.5, cam: 'close', title: 'Deckel aufsetzen',
    what: 'Zwei Passstifte kommen in den Flansch, Dichtmittel auf die Teilfuge, dann wird der Deckel über alle drei Lager geschoben.',
    why: 'Die Passstifte zentrieren den Deckel, damit die Lagerbohrungen genau fluchten. Im Deckel sitzen die Loslager – sie dürfen axial gleiten und gleichen Wärmedehnung aus.',
    fn: (S, p) => { S.pins = ease(clamp(p / 0.25)); S.deckVis = 1; S.deckX = 14 * (1 - ease(clamp((p - 0.25) / 0.75))); } },
  { phase: 'montage', dur: 5.5, cam: 'close', title: 'Verschrauben',
    what: 'Die Schrauben rund um den Flansch werden über Kreuz angezogen.',
    why: 'Über Kreuz, damit der Deckel gleichmäßig angepresst wird und sich nicht verkantet. Die Schrauben halten nur – zentriert wird über die Passstifte.',
    fn: (S, p) => { S.screws = p; } },
  { phase: 'montage', dur: 4.5, cam: 'close', title: 'Lagerdeckel und Dichtringe',
    what: 'Die restlichen Lagerdeckel werden angeschraubt. Wo eine Welle austritt, sitzt ein Radialwellendichtring (rot).',
    why: 'Dichtringe nur an den drei Austritten: Antrieb auf der Deckelseite, Abtrieb auf beiden Seiten. Die Zwischenwelle bleibt ganz geschlossen.',
    fn: (S, p) => { S.capsB = ease(p); } },
  { phase: 'montage', dur: 8, cam: 'run', title: 'Öl einfüllen und Probelauf',
    what: 'Ablassschraube rein, Öl bis zur Marke einfüllen, Entlüftung aufsetzen. Dann läuft das Getriebe an.',
    why: 'Das große Rad der Stufe 2 taucht ins Öl und verteilt es als Spritzöl an alle Zahnräder und Lager. Die Entlüftung verhindert Überdruck, wenn das Getriebe warm wird.',
    fn: (S, p) => { S.plugs = ease(clamp(p / 0.22)); S.oil = ease(clamp((p - 0.22) / 0.35)); S.spin = p > 0.6 ? 1 : 0; } },
];
{ let acc = 0; for (const s of STEPS) { s.start = acc; acc += s.dur; } }
const stepStart = (s: Step) => s.start ?? 0;

function freshState(): SceneState {
  return { patVis: 0, patOp: 1, patY: 0, sandH: 0, sandOp: 1, topfVis: 0, topfRot: PI / 2, pourH: 999, heat: 0, stream: 0,
    millVis: 0, millY: 0, millZ: 0, flange: 0, boreVis: 0, boreX: 18, boreY: 0, eyes: 0, front: 1,
    sh: [0, 1, 2].map(() => ({ vis: 0, asm: 0, x: 20 })), capsA: 0, capsB: 0, pins: 0, deckVis: 0, deckX: 14, screws: 0, oil: 0, plugs: 0, spin: 0 };
}
function evaluate(t: number): SceneState {
  const S = freshState();
  for (const s of STEPS) {
    const a = stepStart(s);
    if (t >= a + s.dur) s.fn(S, 1);
    else if (t >= a) { s.fn(S, (t - a) / s.dur); break; }
    else break;
  }
  return S;
}

/** Baut die Szene und gibt eine Funktion zurück, die einen Zustand darstellt. */
function buildScene(T3: Three, scene: ThreeNS.Scene) {
  scene.add(new T3.HemisphereLight(0xffffff, 0x80868e, 0.8));
  const sun = new T3.DirectionalLight(0xffffff, 0.85);
  sun.position.set(14, 28, 18); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -34, right: 34, top: 34, bottom: -34, near: 1, far: 90 });
  scene.add(sun);
  const fillL = new T3.DirectionalLight(0xffffff, 0.35); fillL.position.set(-18, 8, -12); scene.add(fillL);
  const ground = new T3.Mesh(new T3.PlaneGeometry(300, 300), new T3.ShadowMaterial({ opacity: 0.16 }));
  ground.rotation.x = -PI / 2; ground.position.y = -6.8; ground.receiveShadow = true; scene.add(ground);

  const COL = { raw: new T3.Color(0x5f646a), mach: new T3.Color(0xcad0d6), molt: new T3.Color(0xff8a2a), glow: new T3.Color(0xff4a00) };
  const std = (c: number, o: Partial<ThreeNS.MeshStandardMaterialParameters> = {}) =>
    new T3.MeshStandardMaterial({ color: c, roughness: 0.8, metalness: 0.25, ...o });
  const mH = std(0x5f646a), mF = std(0x5f646a), mE = std(0x5f646a), mFront = std(0x5f646a, { transparent: true, opacity: 1 });
  const pourPlane = new T3.Plane(new T3.Vector3(0, -1, 0), 999);
  [mH, mF, mE, mFront].forEach((m) => { m.clippingPlanes = [pourPlane]; });
  const dRaw = std(0x5f646a, { roughness: 0.85 }), dMach = std(0xcad0d6, { roughness: 0.35, metalness: 0.75 });
  const mWood = std(0xc99a5b, { roughness: 0.75, metalness: 0, transparent: true });
  const mSteel = std(0xb7bec6, { roughness: 0.32, metalness: 0.85 });
  const mGear = std(0x8e9aa6, { roughness: 0.4, metalness: 0.7 });
  const mBrg = std(0xdde2e6, { roughness: 0.3, metalness: 0.8 }), mBrgD = std(0x3a4047, { roughness: 0.5, metalness: 0.5 });
  const mSeal = std(0xc0392b, { roughness: 0.6, metalness: 0 }), mDark = std(0x2e3338, { roughness: 0.5, metalness: 0.6 });
  const mTool = std(0xd9a441, { roughness: 0.35, metalness: 0.8 }), mPin = std(0xe4e8ec, { roughness: 0.25, metalness: 0.9 });
  const mSand = new T3.MeshStandardMaterial({ color: 0xcfb487, roughness: 1, metalness: 0, transparent: true, opacity: 0.55, depthWrite: false });
  const mMolten = new T3.MeshStandardMaterial({ color: 0xff8a2a, emissive: 0xff5a00, emissiveIntensity: 1 });
  const mOil = new T3.MeshStandardMaterial({ color: 0xd8a017, transparent: true, opacity: 0.55, roughness: 0.2, metalness: 0, depthWrite: false });

  const tubeX = (ri: number, ro: number, len: number, seg = 40) => {
    const h = len / 2, P = T3.Vector2;
    const g = new T3.LatheGeometry([new P(ri, -h), new P(ro, -h), new P(ro, h), new P(ri, h), new P(ri, -h)], seg);
    g.rotateZ(-PI / 2); return g;
  };
  const cylX = (r: number, len: number, seg = 32) => { const g = new T3.CylinderGeometry(r, r, len, seg); g.rotateZ(-PI / 2); return g; };
  const bx = (sx: number, sy: number, sz: number, x: number, y: number, z: number, m: ThreeNS.Material) => {
    const o = new T3.Mesh(new T3.BoxGeometry(sx, sy, sz), m); o.position.set(x, y, z); return o;
  };
  const gearGeo = (r: number, z: number, w: number) => {
    const m = (2 * r) / z, ra = r + m, rf = r - 1.15 * m, T = (2 * PI) / z, s = new T3.Shape();
    for (let i = 0; i < z; i++) {
      const a = i * T, pts: [number, number][] = [[rf, a], [rf, a + 0.18 * T], [ra, a + 0.36 * T], [ra, a + 0.64 * T], [rf, a + 0.82 * T]];
      pts.forEach(([rr, aa], k) => { const x = rr * Math.cos(aa), y = rr * Math.sin(aa); if (i === 0 && k === 0) s.moveTo(x, y); else s.lineTo(x, y); });
    }
    s.closePath();
    const hole = new T3.Path(); hole.absarc(0, 0, 0.4, 0, 2 * PI, true); s.holes.push(hole);
    const g = new T3.ExtrudeGeometry(s, { depth: w, bevelEnabled: false, curveSegments: 6 });
    g.translate(0, 0, -w / 2); g.rotateY(PI / 2); return g;
  };

  // Topf
  const topf = new T3.Group();
  topf.add(bx(0.6, 12.8, 7.2, -6.3, 0.2, 0, mH));
  topf.add(bx(12.6, 0.6, 7.2, -0.3, 6.3, 0, mH));
  topf.add(bx(12.6, 0.6, 7.2, -0.3, -5.9, 0, mH));
  topf.add(bx(12.6, 11.6, 0.6, -0.3, 0.2, -3.3, mH));
  topf.add(bx(12.6, 11.6, 0.6, -0.3, 0.2, 3.3, mFront));
  topf.add(bx(0.4, 1.0, 8.0, 5.8, 6.5, 0, mF));
  topf.add(bx(0.4, 1.0, 8.0, 5.8, -6.1, 0, mF));
  topf.add(bx(0.4, 11.6, 1.0, 5.8, 0.2, 3.5, mF));
  topf.add(bx(0.4, 11.6, 1.0, 5.8, 0.2, -3.5, mF));
  Y.forEach((y) => { const e = new T3.Mesh(tubeX(0.75, 1.25, 1.0), mE); e.position.set(-6.5, y, 0); topf.add(e); });
  [-4, 4].forEach((x) => topf.add(bx(2.4, 0.6, 9.0, x, -6.5, 0, mH)));
  [-1.9, 1.9].forEach((z) => topf.add(bx(0.4, 12.2, 0.3, -6.8, 0.2, z, mH)));
  const bossA = new T3.Mesh(new T3.CylinderGeometry(0.5, 0.55, 0.35, 24), mH); bossA.position.set(-1, -6.37, 1.8); topf.add(bossA);
  const bossV = new T3.Mesh(new T3.CylinderGeometry(0.45, 0.5, 0.35, 24), mH); bossV.position.set(3.5, 6.77, -1.2); topf.add(bossV);
  const topfHold = new T3.Group(); topfHold.add(topf); scene.add(topfHold);

  // Modell
  const pat = topf.clone(true);
  pat.traverse((o) => { if ((o as ThreeNS.Mesh).isMesh) (o as ThreeNS.Mesh).material = mWood; });
  const patHold = new T3.Group(); patHold.add(pat); patHold.rotation.z = PI / 2; scene.add(patHold);

  // Formkasten
  const sandGeo = new T3.BoxGeometry(18.5, 15, 12); sandGeo.translate(0, 7.5, 0);
  const sand = new T3.Mesh(sandGeo, mSand); sand.position.set(-0.25, -6.6, 0); scene.add(sand);
  const mFrame = new T3.LineBasicMaterial({ color: 0x4a3a22, transparent: true });
  const frame = new T3.LineSegments(new T3.EdgesGeometry(sandGeo), mFrame); frame.position.copy(sand.position); scene.add(frame);
  const funnel = new T3.Mesh(new T3.CylinderGeometry(0.95, 0.32, 1.0, 24, 1, true), mDark); funnel.position.set(8, 8.9, 0); scene.add(funnel);
  const streamGeo = new T3.CylinderGeometry(0.22, 0.22, 7, 16); streamGeo.translate(0, -3.5, 0);
  const stream = new T3.Mesh(streamGeo, mMolten); stream.position.set(8, 16.4, 0); scene.add(stream);

  // Werkzeuge
  const mill = new T3.Group(), cutter = new T3.Group();
  cutter.add(new T3.Mesh(cylX(2.1, 0.6), mDark));
  for (let k = 0; k < 8; k++) { const a = (k / 8) * 2 * PI; cutter.add(bx(0.2, 0.35, 0.35, -0.3, 1.9 * Math.cos(a), 1.9 * Math.sin(a), mTool)); }
  mill.add(cutter);
  const spindle = new T3.Mesh(cylX(0.9, 4), mDark); spindle.position.x = 2.3; mill.add(spindle); scene.add(mill);
  const bore = new T3.Group(), boreSpin = new T3.Group();
  const bar = new T3.Mesh(cylX(0.68, 14), mSteel); bar.position.x = 7; boreSpin.add(bar);
  const tip = new T3.Mesh(cylX(0.72, 0.3), mTool); tip.position.x = 0.15; boreSpin.add(tip);
  bore.add(boreSpin); scene.add(bore);

  // Wellen
  const SPEC = [
    { y: Y[0], xa: -6.9, xb: 10.5, gears: [{ x: 2.5, w: 1.0, r: 1.0, z: 10 }], sleeves: [[3.0, 6.2]], keys: [9.6] },
    { y: Y[1], xa: -6.9, xb: 6.9, gears: [{ x: -3.5, w: 1.4, r: 1.1, z: 11 }, { x: 2.5, w: 1.0, r: 1.6, z: 16 }], sleeves: [[-2.8, 2.0], [3.0, 6.2]], keys: [] },
    { y: Y[2], xa: -10.5, xb: 10.5, gears: [{ x: -3.5, w: 1.4, r: 2.1, z: 21 }], sleeves: [[-2.8, 6.2]], keys: [-9.6, 9.6] },
  ];
  const bearing = () => {
    const g = new T3.Group();
    g.add(new T3.Mesh(tubeX(0.62, 0.75, 0.6), mBrg)); g.add(new T3.Mesh(tubeX(0.4, 0.52, 0.6), mBrg)); g.add(new T3.Mesh(tubeX(0.52, 0.62, 0.5), mBrgD));
    return g;
  };
  type Part = ThreeNS.Object3D & { userData: { base: number; dir: number } };
  const shafts = SPEC.map((sp) => {
    const g = new T3.Group(), spin = new T3.Group(); g.add(spin);
    const s = new T3.Mesh(cylX(0.4, sp.xb - sp.xa), mSteel); s.position.x = (sp.xa + sp.xb) / 2; spin.add(s);
    const g0 = sp.gears[0];
    const collar = new T3.Mesh(tubeX(0.4, 0.6, 0.25), mSteel); collar.position.x = g0.x - g0.w / 2 - 0.125; spin.add(collar);
    sp.keys.forEach((kx) => spin.add(bx(1.2, 0.12, 0.22, kx, 0.4, 0, mDark)));
    const parts: Part[] = [];
    const lb = bearing() as unknown as Part; lb.userData = { base: -6.5, dir: -1 }; parts.push(lb);
    const items: { x: number; m: Part }[] = [];
    sp.gears.forEach((gr) => items.push({ x: gr.x, m: new T3.Mesh(gearGeo(gr.r, gr.z, gr.w), mGear) as unknown as Part }));
    sp.sleeves.forEach(([a, b]) => items.push({ x: (a + b) / 2, m: new T3.Mesh(tubeX(0.4, 0.56, b - a), mSteel) as unknown as Part }));
    items.sort((p, q) => p.x - q.x).forEach((it) => { it.m.userData = { base: it.x, dir: 1 }; parts.push(it.m); });
    const rb = bearing() as unknown as Part; rb.userData = { base: 6.5, dir: 1 }; parts.push(rb);
    parts.forEach((p) => spin.add(p));
    g.position.set(20, sp.y, 0); scene.add(g);
    return { g, spin, parts };
  });

  // Deckel, Stifte, Schrauben, Lagerdeckel
  const deck = new T3.Group();
  deck.add(bx(0.5, 13.6, 8.0, 6.25, 0.2, 0, dRaw));
  Y.forEach((y) => { const e = new T3.Mesh(tubeX(0.75, 1.25, 1.0), dMach); e.position.set(6.5, y, 0); deck.add(e); });
  deck.add(bx(0.3, 1.7, 0.3, 6.65, 6.15, 0, dRaw)); deck.add(bx(0.3, 3.4, 0.3, 6.65, -4.8, 0, dRaw)); deck.add(bx(0.3, 0.3, 7.4, 6.65, -6.1, 0, dRaw));
  scene.add(deck);
  const pins = [[6.5, -3.5], [-6.1, 3.5]].map(([y, z]) => { const p = new T3.Mesh(cylX(0.16, 0.9), mPin); p.position.set(5.75, y, z); scene.add(p); return p; });
  const SCREW_POS = [[6.5, 0], [-6.1, 0], [0.2, 3.5], [0.2, -3.5], [6.5, -2.2], [-6.1, 2.2], [6.5, 2.2], [-6.1, -2.2], [3.4, 3.5], [-3, -3.5], [3.4, -3.5], [-3, 3.5]];
  const screws = SCREW_POS.map(([y, z]) => {
    const g = new T3.Group(), r = new T3.Group();
    const head = new T3.Mesh(cylX(0.3, 0.22, 6), mDark); head.position.x = 0.11; r.add(head);
    const sh = new T3.Mesh(cylX(0.12, 1.1, 12), mSteel); sh.position.x = -0.55; r.add(sh);
    g.add(r); g.position.set(6.5, y, z); scene.add(g); return { g, r };
  });
  const cap = (through: boolean) => {
    const g = new T3.Group();
    if (through) { g.add(new T3.Mesh(tubeX(0.42, 1.25, 0.25), dMach)); g.add(new T3.Mesh(tubeX(0.4, 0.64, 0.29), mSeal)); }
    else g.add(new T3.Mesh(cylX(1.25, 0.25), dMach));
    for (let k = 0; k < 4; k++) { const a = PI / 4 + (k * PI) / 2, b = new T3.Mesh(cylX(0.13, 0.14, 6), mDark); b.position.set(0, 0.98 * Math.cos(a), 0.98 * Math.sin(a)); g.add(b); }
    return g;
  };
  const placeCap = (through: boolean, x: number, y: number, dir: number) => {
    const c = cap(through); c.position.set(x, y, 0); if (dir > 0) c.rotation.y = PI; scene.add(c); return { c, x, dir };
  };
  const capsA = [placeCap(false, -7.125, Y[0], -1), placeCap(false, -7.125, Y[1], -1)];
  const capsB = [placeCap(true, -7.125, Y[2], -1), placeCap(true, 7.125, Y[0], 1), placeCap(false, 7.125, Y[1], 1), placeCap(true, 7.125, Y[2], 1)];
  const oilGeo = new T3.BoxGeometry(11.8, 1, 5.8); oilGeo.translate(0, 0.5, 0);
  const oil = new T3.Mesh(oilGeo, mOil); oil.position.set(-0.1, -5.6, 0); scene.add(oil);
  const plugA = new T3.Mesh(new T3.CylinderGeometry(0.34, 0.34, 0.35, 6), mDark); plugA.position.set(-1, -6.72, 1.8); scene.add(plugA);
  const vent = new T3.Group();
  vent.add(new T3.Mesh(new T3.CylinderGeometry(0.15, 0.15, 0.6, 12), mSteel));
  const vcap = new T3.Mesh(new T3.CylinderGeometry(0.36, 0.36, 0.18, 16), mDark); vcap.position.y = 0.35; vent.add(vcap);
  vent.position.set(3.5, 7.15, -1.2); scene.add(vent);
  scene.traverse((o) => { const m = o as ThreeNS.Mesh; if (m.isMesh && m.material !== mSand && m.material !== mOil && m !== ground) m.castShadow = true; });

  const tmpC = new T3.Color(), tmpC2 = new T3.Color();
  const surf = (m: ThreeNS.MeshStandardMaterial, mach: number, heat: number) => {
    tmpC.copy(COL.raw).lerp(COL.mach, mach); tmpC.lerp(COL.molt, heat); m.color.copy(tmpC);
    tmpC2.copy(COL.glow).multiplyScalar(heat * 0.9); m.emissive.copy(tmpC2);
    m.metalness = lerp(0.25, 0.75, mach); m.roughness = lerp(0.85, 0.35, mach);
  };

  return (S: SceneState, dt: number, spinClock: number) => {
    patHold.visible = S.patVis > 0 && S.patOp > 0.001; patHold.position.y = 2.4 + S.patY;
    mWood.opacity = S.patOp; mWood.depthWrite = S.patOp > 0.99;
    topfHold.visible = S.topfVis > 0; topfHold.rotation.z = S.topfRot; topfHold.position.y = (2.4 * S.topfRot) / (PI / 2);
    pourPlane.constant = S.pourH;
    surf(mH, 0, S.heat); surf(mF, S.flange, S.heat); surf(mE, S.eyes, S.heat); surf(mFront, 0, S.heat);
    mFront.opacity = S.front; mFront.depthWrite = S.front > 0.99;
    const sv = S.sandH > 0 && S.sandOp > 0.001;
    sand.visible = sv; sand.scale.y = Math.max(0.001, S.sandH); mSand.opacity = 0.55 * S.sandOp;
    frame.visible = sv; mFrame.opacity = clamp(S.sandH * 4) * S.sandOp; funnel.visible = sv && S.sandH > 0.98;
    stream.visible = S.stream > 0; stream.scale.y = Math.max(0.001, S.stream);
    mill.visible = S.millVis > 0; mill.position.set(6.3, S.millY, S.millZ); cutter.rotation.x += dt * 14;
    bore.visible = S.boreVis > 0; bore.position.set(S.boreX, S.boreY, 0); boreSpin.rotation.x += dt * 16;
    shafts.forEach((o, i) => {
      const st = S.sh[i]; o.g.visible = st.vis > 0; o.g.position.x = st.x;
      const n = o.parts.length;
      o.parts.forEach((pt, j) => {
        const lp = clamp(st.asm * (n + 0.5) - j); pt.visible = lp > 0;
        pt.position.x = pt.userData.base + (pt.userData.dir < 0 ? -5 : 10) * (1 - ease(lp));
      });
    });
    capsA.forEach(({ c, x, dir }) => { c.visible = S.capsA > 0; c.position.x = x + dir * 4 * (1 - S.capsA); });
    capsB.forEach(({ c, x, dir }) => { c.visible = S.capsB > 0; c.position.x = x + dir * 4 * (1 - S.capsB); });
    pins.forEach((p) => { p.visible = S.pins > 0; p.scale.set(Math.max(0.001, S.pins), 1, 1); });
    deck.visible = S.deckVis > 0; deck.position.x = S.deckX;
    screws.forEach(({ g, r }, j) => {
      const lp = clamp((S.screws - j * 0.055) / 0.34);
      g.visible = lp > 0; g.position.x = 6.5 + 3 * (1 - ease(lp)); r.rotation.x = lp * 14;
    });
    oil.visible = S.oil > 0; oil.scale.y = Math.max(0.001, 1.75 * S.oil);
    plugA.visible = vent.visible = S.plugs > 0;
    plugA.position.y = -6.72 - 1.6 * (1 - S.plugs); vent.position.y = 7.15 + 1.6 * (1 - S.plugs);
    // Übersetzungen: Stufe 1 = 10/16, Stufe 2 = 11/21
    const th1 = spinClock * 2.6, th2 = (-th1 * 10) / 16 + PI / 16;
    shafts[0].spin.rotation.x = th1; shafts[1].spin.rotation.x = th2; shafts[2].spin.rotation.x = (-th2 * 11) / 21 + PI / 21;
  };
}

const fmt = (s: number) => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

export function GearboxHousingExperiment({ phase }: { phase: Phase }) {
  const steps = STEPS.filter((s) => s.phase === phase);
  const t0 = stepStart(steps[0]);
  const t1 = stepStart(steps[steps.length - 1]) + steps[steps.length - 1].dur;
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctl = useRef({ T: t0, playing: true, speed: 1, userAz: 0, userEl: 0 });
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { ctl.current.playing = false; setPlaying(false); }
    let disposed = false, raf = 0;
    let cleanup = () => {};
    import('three').then((T3) => {
      if (disposed || !canvasRef.current || !stageRef.current) return;
      const canvas = canvasRef.current, stage = stageRef.current;
      const renderer = new T3.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.localClippingEnabled = true; renderer.shadowMap.enabled = true; renderer.shadowMap.type = T3.PCFSoftShadowMap;
      renderer.setClearColor(0xe4e8ec, 1);
      const scene = new T3.Scene();
      const camera = new T3.PerspectiveCamera(36, 1.6, 0.1, 600);
      const apply = buildScene(T3, scene);
      const resize = () => {
        const r = stage.getBoundingClientRect(), w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
        renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize); ro.observe(stage); resize();
      let dragging = false, lx = 0, ly = 0;
      const down = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; if (e.pointerType === 'mouse') canvas.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => {
        if (!dragging) return; const c = ctl.current;
        c.userAz -= (e.clientX - lx) * 0.008; if (e.pointerType === 'mouse') c.userEl = clamp(c.userEl + (e.clientY - ly) * 0.006, -0.4, 0.9);
        lx = e.clientX; ly = e.clientY;
      };
      const up = () => { dragging = false; };
      canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
      ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => canvas.addEventListener(ev, up));

      const cam = { tx: 0, ty: 2.5, tz: 0, d: 42, az: 0.55, el: 0.28 };
      let first = true, prev = performance.now(), spinClock = 0, lastStep = -1, lastSec = -1;
      const loop = (now: number) => {
        const dt = Math.min(0.1, (now - prev) / 1000); prev = now;
        const c = ctl.current;
        if (c.playing) { c.T += dt * c.speed; if (c.T >= t1) { c.T = t1; c.playing = false; setPlaying(false); } }
        const S = evaluate(c.T);
        if (S.spin) spinClock += dt * (reduce ? 0.4 : 1);
        apply(S, dt, spinClock);
        let i = steps.length - 1; while (i > 0 && c.T < stepStart(steps[i])) i--;
        if (i !== lastStep) { lastStep = i; setStepIdx(i); }
        const sec = Math.floor((c.T - t0) * 4); if (sec !== lastSec) { lastSec = sec; setTime(c.T - t0); }
        const g = CAM[steps[i].cam], k = first ? 1 : Math.min(1, dt * 2.2); first = false;
        const goal = { tx: g.t[0], ty: g.t[1], tz: g.t[2], d: g.d * Math.max(1, 1.55 / (camera.aspect || 1.6)), az: g.az, el: g.el };
        (Object.keys(goal) as (keyof typeof goal)[]).forEach((f) => { cam[f] += (goal[f] - cam[f]) * k; });
        const az = cam.az + c.userAz, el = clamp(cam.el + c.userEl, -0.15, 1.25);
        camera.position.set(cam.tx + cam.d * Math.sin(az) * Math.cos(el), cam.ty + cam.d * Math.sin(el), cam.tz + cam.d * Math.cos(az) * Math.cos(el));
        camera.lookAt(cam.tx, cam.ty, cam.tz);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
        scene.traverse((o) => {
          const m = o as ThreeNS.Mesh;
          if (m.geometry) m.geometry.dispose();
          const mat = m.material as ThreeNS.Material | ThreeNS.Material[] | undefined;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else mat?.dispose();
        });
        renderer.dispose();
      };
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const jump = (i: number) => { const c = ctl.current; c.T = stepStart(steps[clamp(i, 0, steps.length - 1)]) + 0.001; };
  const toggle = () => {
    const c = ctl.current; if (!c.playing && c.T >= t1) c.T = t0;
    c.playing = !c.playing; setPlaying(c.playing);
  };
  const s = steps[stepIdx];
  const btn: CSSProperties = { padding: '7px 11px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--panel, #fff)', color: 'var(--navy, inherit)', fontSize: 13, cursor: 'pointer' };

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment · 3D-Modell</span>
        <strong>{phase === 'guss' ? 'Vom Sandguss zum bearbeiteten Topf' : 'Montage des zweistufigen Getriebes'}</strong>
      </div>
      <div ref={stageRef} style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', background: '#e4e8ec' }}>
        <canvas ref={canvasRef} aria-label="3D-Modell des Getriebegehäuses" style={{ display: 'block', width: '100%', height: '100%', touchAction: 'pan-y', cursor: 'grab' }} />
        <span style={{ position: 'absolute', right: 10, bottom: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4b5560' }}>Ziehen zum Drehen</span>
        {failed && <p style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', margin: 0, padding: 16, textAlign: 'center', color: '#4b5560' }}>Das 3D-Modell konnte nicht geladen werden. Die Schritte unten beschreiben den vollständigen Ablauf.</p>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginTop: 10 }}>
        <button type="button" onClick={toggle} style={{ ...btn, background: 'var(--gold, #c9a84c)', borderColor: 'var(--gold, #c9a84c)', color: '#fff', minWidth: 92 }}>{playing ? 'Pause' : 'Abspielen'}</button>
        <button type="button" onClick={() => jump(stepIdx - 1)} style={btn} aria-label="Vorheriger Schritt">◀</button>
        <button type="button" onClick={() => jump(stepIdx + 1)} style={btn} aria-label="Nächster Schritt">▶</button>
        <input type="range" aria-label="Zeitleiste" min={0} max={t1 - t0} step={0.01} value={time}
          onChange={(e) => { const c = ctl.current; c.T = t0 + parseFloat(e.target.value); c.playing = false; setPlaying(false); setTime(c.T - t0); }}
          style={{ flex: '1 1 160px', minWidth: 0, accentColor: 'var(--gold, #c9a84c)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{fmt(time)} / {fmt(t1 - t0)}</span>
        <select aria-label="Geschwindigkeit" defaultValue="1" onChange={(e) => { ctl.current.speed = parseFloat(e.target.value) || 1; }} style={{ ...btn, padding: '6px 8px' }}>
          <option value="0.5">0,5×</option><option value="1">1×</option><option value="1.5">1,5×</option><option value="2">2×</option>
        </select>
        <button type="button" onClick={() => { ctl.current.userAz = 0; ctl.current.userEl = 0; }} style={btn}>Ansicht zurücksetzen</button>
      </div>
      <div aria-live="polite" style={{ marginTop: 10, padding: '12px 14px', background: 'var(--soft, #f5f6f8)', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13.5, lineHeight: 1.6 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold-2, #8a6d1f)' }}>Schritt {stepIdx + 1} von {steps.length}</div>
        <strong style={{ display: 'block', margin: '2px 0 6px', fontSize: 15 }}>{s.title}</strong>
        <p style={{ margin: '0 0 6px' }}>{s.what}</p>
        <p style={{ margin: 0, color: 'var(--muted)' }}><strong>Warum: </strong>{s.why}</p>
      </div>
      <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: '10px 0 0' }}>
        {steps.map((st, i) => (
          <li key={st.title}>
            <button type="button" onClick={() => jump(i)} style={{ ...btn, padding: '4px 8px', fontSize: 12, background: i === stepIdx ? 'var(--gold-bg, #f6efd9)' : 'transparent' }}>
              {i + 1}. {st.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function GearboxCastingExperiment() { return <GearboxHousingExperiment phase="guss" />; }
export function GearboxAssemblyExperiment() { return <GearboxHousingExperiment phase="montage" />; }
export default GearboxAssemblyExperiment;
