import { motion } from 'framer-motion';

/**
 * Et tegnet, oppdiktet bykart: fjord nede til venstre, elv gjennom byen,
 * parker, hovedveier og to bydeler med gatenett i hver sin vinkel.
 * Hele landingssiden står på dette kartet.
 */

const WATER =
  'M-40,640 C140,600 300,660 470,730 C620,792 760,850 860,1040 L-40,1040 Z';
const ISLAND = 'M250,880 C290,850 360,860 372,895 C384,930 330,950 290,940 C258,932 236,905 250,880 Z';
const RIVER =
  'M1190,-40 C1150,170 1250,300 1205,460 C1170,590 1060,650 1000,770 C960,850 900,930 860,1040';

const PARKS = [
  'M1330,90 C1420,60 1520,110 1510,200 C1500,280 1400,300 1340,260 C1290,225 1270,120 1330,90 Z',
  'M600,150 C660,110 760,130 770,200 C780,260 700,290 640,270 C590,252 560,190 600,150 Z',
  'M1060,800 C1120,770 1220,790 1230,860 C1240,920 1150,950 1090,925 C1040,905 1010,830 1060,800 Z',
  'M140,140 C190,110 260,130 262,180 C264,230 200,250 160,232 C120,214 100,165 140,140 Z',
];

const MAJOR = [
  'M-40,300 C300,260 520,340 760,330 S1200,260 1640,320',
  'M380,-40 C420,200 480,380 560,520 S700,820 720,1040',
  'M880,-40 C860,160 930,340 900,520 S820,780 860,1040',
  'M-40,520 C240,480 600,560 900,520 S1400,600 1640,560',
  'M1300,-40 C1320,200 1420,420 1360,600 S1300,900 1420,1040',
  'M80,60 C400,170 700,420 1000,610 S1400,880 1640,960',
];

const MINOR = [
  'M-40,420 C200,400 420,440 640,430',
  'M620,640 C820,660 1100,700 1640,740',
  'M200,-40 C220,120 250,240 300,400',
  'M1040,-40 C1060,120 1080,220 1060,380',
  'M1500,300 C1480,460 1520,620 1600,760',
  'M560,520 C700,600 760,700 900,760',
  'M980,900 C1140,880 1300,960 1640,880',
];

type Props = {
  id: string;
  viewBox?: string;
  draw?: boolean;
  className?: string;
};

export default function CityMap({ id, viewBox = '0 0 1600 1000', draw = false, className }: Props) {
  const roadAnim = (i: number) =>
    draw
      ? {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 2.2, delay: 0.1 + i * 0.12, ease: [0.65, 0, 0.35, 1] as const },
        }
      : {};

  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={`${id}-grid-a`} width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
          <path d="M0 0H46M0 0V46" stroke="var(--map-street)" strokeWidth="1.4" fill="none" />
        </pattern>
        <pattern id={`${id}-grid-b`} width="40" height="54" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
          <path d="M0 0H40M0 0V54" stroke="var(--map-street)" strokeWidth="1.4" fill="none" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="-100" y="-100" width="1800" height="1200" fill="var(--map-land)" />

      {/* bydeler med gatenett */}
      <path d="M440,330 L900,300 L930,560 L560,600 Z" fill={`url(#${id}-grid-a)`} />
      <path d="M940,560 L1360,600 L1330,900 L1020,880 Z" fill={`url(#${id}-grid-b)`} />
      <path d="M-40,330 L420,320 L470,520 L-40,520 Z" fill={`url(#${id}-grid-b)`} />
      <path d="M920,-40 L1290,-40 L1340,280 L940,300 Z" fill={`url(#${id}-grid-a)`} />

      {PARKS.map((d, i) => (
        <path key={i} d={d} fill="var(--map-park)" />
      ))}

      <path d={WATER} fill="var(--map-water)" />
      <path d={ISLAND} fill="var(--map-land)" />
      <path d={RIVER} fill="none" stroke="var(--map-water)" strokeWidth="30" strokeLinecap="round" />

      {MINOR.map((d, i) => (
        <motion.path key={`m${i}`} d={d} fill="none" stroke="var(--map-casing)" strokeWidth="7" strokeLinecap="round" {...roadAnim(i + 2)} />
      ))}
      {MINOR.map((d, i) => (
        <motion.path key={`mi${i}`} d={d} fill="none" stroke="var(--map-road)" strokeWidth="4.5" strokeLinecap="round" {...roadAnim(i + 2)} />
      ))}
      {MAJOR.map((d, i) => (
        <motion.path key={`c${i}`} d={d} fill="none" stroke="var(--map-casing)" strokeWidth="17" strokeLinecap="round" {...roadAnim(i)} />
      ))}
      {MAJOR.map((d, i) => (
        <motion.path key={`r${i}`} d={d} fill="none" stroke="var(--map-road)" strokeWidth="12" strokeLinecap="round" {...roadAnim(i)} />
      ))}
    </svg>
  );
}
