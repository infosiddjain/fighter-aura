import type { FighterInfo } from '@/lib/site';

/** Guard pose angles from the game (degrees; 0 = down, +90 = forward). */
const GUARD = {
  torso: 8, head: 0,
  armFU: 30, armFL: 150, armBU: 15, armBL: 140,
  legFT: 18, legFS: 4, legBT: -18, legBS: -8,
};

type P = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;

/** Same skeleton maths as the game, drawn as SVG. */
function skeleton(k: number, facing: 1 | -1) {
  const pose = GUARD;
  const thigh = 46 * k, shin = 46 * k, torsoLen = 60 * k, upper = 32 * k, fore = 30 * k;
  const headR = 16 * k;
  const seg = (p: P, ang: number, len: number): P => ({
    x: p.x + Math.sin(rad(ang)) * len * facing,
    y: p.y + Math.cos(rad(ang)) * len,
  });
  const legH = (t: number, s: number) => thigh * Math.cos(rad(t)) + shin * Math.cos(rad(s));
  const hip = { x: 0, y: -Math.max(legH(pose.legFT, pose.legFS), legH(pose.legBT, pose.legBS)) };
  const kneeF = seg(hip, pose.legFT, thigh);
  const footF = seg(kneeF, pose.legFS, shin);
  const kneeB = seg(hip, pose.legBT, thigh);
  const footB = seg(kneeB, pose.legBS, shin);
  const neck = {
    x: hip.x + Math.sin(rad(pose.torso)) * torsoLen * facing,
    y: hip.y - Math.cos(rad(pose.torso)) * torsoLen,
  };
  const shoulder = { x: hip.x + (neck.x - hip.x) * 0.88, y: hip.y + (neck.y - hip.y) * 0.88 };
  const head = {
    x: neck.x + Math.sin(rad(pose.torso + pose.head)) * (headR + 4) * facing,
    y: neck.y - Math.cos(rad(pose.torso + pose.head)) * (headR + 4),
  };
  const elbowF = seg(shoulder, pose.armFU, upper);
  const fistF = seg(elbowF, pose.armFL, fore);
  const elbowB = seg(shoulder, pose.armBU, upper);
  const fistB = seg(elbowB, pose.armBL, fore);
  return { hip, neck, shoulder, head, headR, elbowF, fistF, elbowB, fistB, kneeF, footF, kneeB, footB };
}

const pts = (...p: P[]) => p.map(q => `${q.x.toFixed(1)},${q.y.toFixed(1)}`).join(' ');

function Look({ f, x, y, r, facing }: { f: FighterInfo; x: number; y: number; r: number; facing: 1 | -1 }) {
  const c = f.colors.accent;
  const k = f.scale;
  const back = -facing;
  switch (f.look) {
    case 'headband':
      return (
        <g stroke={c} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1={x - r} y1={y - r * 0.35} x2={x + r} y2={y - r * 0.35} strokeWidth={6 * k} />
          <polyline
            points={pts(
              { x: x + back * r, y: y - r * 0.35 },
              { x: x + back * (r + 16), y: y - r * 0.2 + 4 },
              { x: x + back * (r + 30), y: y + 2 },
            )}
            strokeWidth={4 * k}
          />
        </g>
      );
    case 'mohawk':
      return (
        <polygon
          fill={c}
          points={pts(
            { x: x - r * 0.8, y: y - r * 0.6 }, { x: x - r * 0.5, y: y - r * 1.7 },
            { x: x - r * 0.1, y: y - r * 0.9 }, { x: x + r * 0.2, y: y - r * 1.9 },
            { x: x + r * 0.5, y: y - r * 0.9 }, { x: x + r * 0.85, y: y - r * 1.6 },
            { x: x + r * 0.9, y: y - r * 0.5 },
          )}
        />
      );
    case 'mask':
      return (
        <g>
          <polygon
            fill={c}
            points={pts(
              { x: x + back * r * 0.2, y: y - r * 0.05 }, { x: x + facing * r * 1.02, y: y + r * 0.05 },
              { x: x + facing * r * 0.6, y: y + r * 0.85 }, { x: x + back * r * 0.6, y: y + r * 0.8 },
            )}
          />
          <polyline
            fill="none" stroke={c} strokeWidth={5 * k} strokeLinejoin="round"
            points={pts({ x: x - r, y: y - r * 0.2 }, { x, y: y - r * 1.1 }, { x: x + r, y: y - r * 0.2 })}
          />
        </g>
      );
    case 'ponytail':
      return (
        <g>
          <polyline
            fill="none" stroke="#2a1508" strokeWidth={9 * k} strokeLinecap="round" strokeLinejoin="round"
            points={pts(
              { x: x + back * r * 0.9, y: y - r * 0.5 },
              { x: x + back * (r + 14), y: y - r * 0.1 },
              { x: x + back * (r + 22), y: y + r * 0.9 },
            )}
          />
          <circle cx={x + back * r * 0.2} cy={y - r * 0.45} r={r * 0.75} fill="#2a1508" />
          <circle cx={x + back * r * 0.95} cy={y - r * 0.5} r={3.5 * k} fill={c} />
        </g>
      );
    case 'beard':
      return (
        <g>
          <polygon
            fill="#3b3127"
            points={pts(
              { x: x + back * r * 0.5, y: y + r * 0.2 }, { x: x + facing * r * 0.95, y: y + r * 0.15 },
              { x: x + facing * r * 0.4, y: y + r * 1.35 }, { x: x + back * r * 0.2, y: y + r },
            )}
          />
          <circle cx={x + facing * r * 0.45} cy={y - r * 0.3} r={2.8 * k} fill={c} />
        </g>
      );
  }
}

/** A fighter in guard pose, drawn exactly like in the game. */
export function FighterArt({
  fighter,
  facing = 1,
  className,
}: {
  fighter: FighterInfo;
  facing?: 1 | -1;
  className?: string;
}) {
  const k = fighter.scale;
  const s = skeleton(k, facing);
  const c = fighter.colors;
  const chest = { x: (s.hip.x + s.neck.x) / 2, y: (s.hip.y + s.neck.y) / 2 };
  const id = `aura-${fighter.name}-${facing}`;
  return (
    <svg viewBox="-110 -265 220 275" className={className} role="img" aria-label={fighter.name}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor={c.aura} stopOpacity="0.55" />
          <stop offset="100%" stopColor={c.aura} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={0} cy={0} rx={38 * k} ry={6} fill="#000" opacity={0.45} />
      <circle cx={chest.x} cy={chest.y} r={95 * k} fill={`url(#${id})`} />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={pts(s.hip, s.kneeB, s.footB)} stroke={c.secondaryDark} strokeWidth={17 * k} />
        <polyline points={pts(s.shoulder, s.elbowB, s.fistB)} stroke={c.skinDark} strokeWidth={12 * k} />
      </g>
      <circle cx={s.fistB.x} cy={s.fistB.y} r={8 * k} fill={c.accent} opacity={0.8} />
      <line x1={s.hip.x} y1={s.hip.y} x2={s.neck.x} y2={s.neck.y} stroke={c.primary} strokeWidth={30 * k} strokeLinecap="round" />
      <circle cx={s.hip.x} cy={s.hip.y} r={11 * k} fill={c.accent} />
      <polyline
        points={pts(s.hip, s.kneeF, s.footF)}
        fill="none" stroke={c.secondary} strokeWidth={18 * k} strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx={s.head.x} cy={s.head.y} r={s.headR} fill={c.skin} />
      <circle cx={s.head.x + facing * s.headR * 0.45} cy={s.head.y - s.headR * 0.15} r={2.4 * k} fill="#1a1020" />
      <Look f={fighter} x={s.head.x} y={s.head.y} r={s.headR} facing={facing} />
      <polyline
        points={pts(s.shoulder, s.elbowF, s.fistF)}
        fill="none" stroke={c.skin} strokeWidth={13 * k} strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx={s.fistF.x} cy={s.fistF.y} r={9 * k} fill={c.accent} />
    </svg>
  );
}
