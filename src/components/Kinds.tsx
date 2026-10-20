import { motion } from 'framer-motion';
import { useState } from 'react';
import CityMap from './CityMap';
import Pin, { KINDS, YouDot, type Kind } from './Pin';

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS: { kind: Kind; title: string; text: string }[] = [
  {
    kind: 'meetup',
    title: 'Treff',
    text: 'Laget av folk i nærheten, akkurat nå eller litt senere. Du ser hvor mange som skal og om det er plass.',
  },
  {
    kind: 'event',
    title: 'Arrangementer',
    text: 'Konserter, kamper og forestillinger, med tid, sted og lenke til billetter.',
  },
  {
    kind: 'place',
    title: 'Steder',
    text: 'Kafeer, barer og parker rundt deg, så du har et sted å foreslå.',
  },
  {
    kind: 'friend',
    title: 'Venner',
    text: 'Vennene dine, når de selv vil vises. Du bestemmer det samme for deg, og kan bli usynlig når du vil.',
  },
];

const MAP_PINS: { kind: Kind; x: number; y: number }[] = [
  { kind: 'meetup', x: 22, y: 26 }, { kind: 'meetup', x: 70, y: 64 }, { kind: 'meetup', x: 46, y: 80 },
  { kind: 'event', x: 62, y: 20 }, { kind: 'event', x: 84, y: 40 }, { kind: 'event', x: 30, y: 60 },
  { kind: 'place', x: 40, y: 36 }, { kind: 'place', x: 14, y: 48 }, { kind: 'place', x: 78, y: 82 },
  { kind: 'friend', x: 56, y: 46 }, { kind: 'friend', x: 24, y: 78 },
];

export default function Kinds() {
  const [focus, setFocus] = useState<Kind | null>(null);

  return (
    <section id="kartet" className="kinds">
      <div className="kinds-head">
        <motion.h2
          className="h2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Fire slags pins på kartet.
        </motion.h2>
        <p className="lede">Pek eller trykk på en av dem for å se hvor de ligger.</p>
      </div>

      <div className="kinds-grid">
        <motion.div
          className="kinds-map"
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <CityMap id="kinds" viewBox="300 100 900 760" />
          <YouDot className="kinds-you" />
          {MAP_PINS.map((p, i) => (
            <Pin
              key={i}
              kind={p.kind}
              size={32}
              delay={0.3 + i * 0.05}
              dimmed={focus !== null && focus !== p.kind}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            />
          ))}
        </motion.div>

        <ul className="kinds-list">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.kind}
              className={focus === item.kind ? 'is-focus' : ''}
              tabIndex={0}
              onMouseEnter={() => setFocus(item.kind)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(item.kind)}
              onBlur={() => setFocus(null)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <span className="kinds-swatch" style={{ background: KINDS[item.kind].color }} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
