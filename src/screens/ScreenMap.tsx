import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Pin, { YouDot, type Kind } from '../components/Pin';
import { MapBackdrop, TabBar } from './parts';

const PINS: { kind: Kind; x: number; y: number }[] = [
  { kind: 'meetup', x: 28, y: 30 },
  { kind: 'event', x: 66, y: 24 },
  { kind: 'place', x: 72, y: 46 },
  { kind: 'friend', x: 22, y: 56 },
  { kind: 'meetup', x: 58, y: 62 },
  { kind: 'event', x: 38, y: 74 },
  { kind: 'place', x: 16, y: 40 },
  { kind: 'friend', x: 80, y: 66 },
  { kind: 'meetup', x: 46, y: 38 },
];

const FILTERS: { label: string; kind: Kind | null }[] = [
  { label: 'Alt', kind: null },
  { label: 'Treff', kind: 'meetup' },
  { label: 'Arrangementer', kind: 'event' },
  { label: 'Steder', kind: 'place' },
];

export default function ScreenMap({ id, cycle = false, delay = 0 }: { id: string; cycle?: boolean; delay?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!cycle) return;
    const t = setInterval(() => setActive((a) => (a + 1) % FILTERS.length), 2200);
    return () => clearInterval(t);
  }, [cycle]);

  const filterKind = FILTERS[active].kind;

  return (
    <div className="screen">
      <MapBackdrop id={id} />

      <motion.div
        className="radius"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <YouDot className="screen-you" />

      {PINS.map((p, i) => (
        <Pin
          key={i}
          kind={p.kind}
          size={28}
          delay={delay + 0.45 + i * 0.07}
          dimmed={filterKind !== null && p.kind !== filterKind}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        />
      ))}

      <motion.div
        className="screen-search"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 260, damping: 24 }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Hva skjer i nærheten?
      </motion.div>

      <motion.div
        className="chips"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.32, type: 'spring', stiffness: 260, damping: 24 }}
      >
        {FILTERS.map((f, i) => (
          <span key={f.label} className={`chip ${i === active ? 'is-active' : ''}`}>
            {i === active && <motion.span layoutId={`${id}-chip`} className="chip-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="chip-text">{f.label}</span>
          </span>
        ))}
      </motion.div>

      <TabBar active={0} />
    </div>
  );
}
