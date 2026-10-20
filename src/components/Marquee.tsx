import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { KINDS, type Kind } from './Pin';

const ROW_A: [string, Kind][] = [
  ['Konserter', 'event'], ['Kaffe', 'place'], ['Løpeturer', 'meetup'], ['Quiz', 'event'],
  ['Brettspill', 'meetup'], ['Utstillinger', 'event'], ['Bakerier', 'place'], ['Fotball i parken', 'meetup'],
];
const ROW_B: [string, Kind][] = [
  ['Stand-up', 'event'], ['Loppemarked', 'event'], ['Klatring', 'meetup'], ['Naturvin', 'place'],
  ['Strikkeklubb', 'meetup'], ['Bading', 'meetup'], ['Vennen din', 'friend'], ['Teater', 'event'],
];

function Row({ items, from, to, progress }: { items: [string, Kind][]; from: string; to: string; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const x = useTransform(progress, [0, 1], [from, to]);
  const doubled = [...items, ...items];
  return (
    <motion.div className="marquee-row" style={{ x }} aria-hidden="true">
      {doubled.map(([word, kind], i) => (
        <span key={i} className="marquee-item">
          <i style={{ background: KINDS[kind].color }} />
          {word}
        </span>
      ))}
    </motion.div>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="marquee">
      <motion.h2
        className="h2 marquee-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        Det skjer mer rundt deg enn du tror.
      </motion.h2>
      <p className="sr-only">
        For eksempel konserter, quiz, løpeturer, brettspill, loppemarked, stand-up og
        kafeer i nærheten.
      </p>
      <Row items={ROW_A} from="0%" to="-38%" progress={scrollYProgress} />
      <Row items={ROW_B} from="-42%" to="-4%" progress={scrollYProgress} />
    </section>
  );
}
