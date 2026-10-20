import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { KINDS, type Kind } from './Pin';
import CityMap from './CityMap';

const EASE = [0.22, 1, 0.36, 1] as const;

const ROUTE = 'M110,330 C270,330 290,150 450,160 S650,340 790,310 S990,100 1110,120';

const CITIES: { name: string; x: number; y: number; at: number; note?: string; kind?: Kind; above?: boolean }[] = [
  { name: 'Oslo', x: 110, y: 330, at: 0 },
  { name: 'Bergen', x: 450, y: 160, at: 0.33, note: 'Fiskemarked og quiz i kveld', kind: 'event', above: true },
  { name: 'Trondheim', x: 790, y: 310, at: 0.66, note: 'Søndagstur i Bymarka', kind: 'meetup' },
  { name: 'Tromsø', x: 1110, y: 120, at: 0.98, note: 'Kafé åpen til midnatt', kind: 'place', above: true },
];

// Små pins som spretter fram rundt en by når du kommer dit.
const BLOOM: { dx: number; dy: number; r: number; kind: Kind }[] = [
  { dx: -40, dy: -10, r: 6, kind: 'meetup' },
  { dx: -58, dy: 8, r: 4, kind: 'event' },
  { dx: 38, dy: 10, r: 6, kind: 'place' },
  { dx: 56, dy: -8, r: 5, kind: 'friend' },
  { dx: -28, dy: 14, r: 4, kind: 'event' },
];

export default function Travel() {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const draw = useTransform(scrollYProgress, [0.05, 0.85], [0, 1], { clamp: true });
  const px = useMotionValue(110);
  const py = useMotionValue(330);
  const [reached, setReached] = useState(0);
  const travelerLeft = useTransform(px, (v) => `${(v / 1220) * 100}%`);
  const travelerTop = useTransform(py, (v) => `${(v / 440) * 100}%`);

  // På smale skjermer er ruta bredere enn skjermen og panorerer etter prikken.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const pan = useTransform(draw, [0, 1], ['0%', '-62%']);

  useMotionValueEvent(draw, 'change', (v) => {
    const path = pathRef.current;
    if (!path) return;
    const pt = path.getPointAtLength(path.getTotalLength() * v);
    px.set(pt.x);
    py.set(pt.y);
    setReached(v);
  });

  return (
    <section id="byer" ref={ref} className="travel">
      <div className="travel-bg" aria-hidden="true">
        <CityMap id="travel-bg" viewBox="200 0 1200 1000" />
      </div>
      <div className="travel-sticky">
        <div className="travel-copy">
          <motion.h2
            className="h2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Skal du til Bergen i helga?
          </motion.h2>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            Flytt deg dit på kartet og se hva som skjer før du drar. Kartet blir
            like levende der som hjemme.
          </motion.p>
        </div>

        <div className="travel-window">
        <motion.div className="travel-stage" style={narrow ? { x: pan } : undefined}>
          <svg viewBox="0 0 1220 440" className="travel-svg" aria-hidden="true">
            <path d={ROUTE} fill="none" stroke="var(--line)" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
            <motion.path
              ref={pathRef}
              d={ROUTE}
              fill="none"
              stroke="url(#route-g)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: draw }}
            />
            <defs>
              <linearGradient id="route-g" x1="0" x2="1">
                <stop offset="0" stopColor="#3FA2F7" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            {CITIES.map((c) => {
              const on = reached >= c.at - 0.01;
              return (
                <g key={c.name}>
                  {BLOOM.map((b, j) => (
                    <motion.circle
                      key={j}
                      cx={c.x + b.dx}
                      cy={c.y + b.dy}
                      r={b.r}
                      fill={KINDS[b.kind].color}
                      initial={false}
                      animate={on ? { scale: 1, opacity: 0.9 } : { scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 14, delay: on ? 0.05 + j * 0.06 : 0 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                  ))}
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r={on ? 11 : 7}
                    fill={on ? '#fff' : 'var(--mist)'}
                    stroke={on ? 'var(--violet)' : 'var(--line-strong)'}
                    strokeWidth={on ? 4 : 2}
                    animate={{ r: on ? 11 : 7 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  />
                  <text x={c.x} y={c.above ? c.y - 30 : c.y + 44} textAnchor="middle" className={`travel-city ${on ? 'is-on' : ''}`}>
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {CITIES.filter((c) => c.note).map((c) => {
            const on = reached >= c.at - 0.01;
            return (
              <motion.div
                key={c.name}
                className="travel-note"
                style={{ left: `${(c.x / 1220) * 100}%`, top: `${((c.above ? c.y + 56 : c.y - 56) / 440) * 100}%` }}
                initial={false}
                animate={on ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: c.above ? -10 : 10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <i style={{ background: KINDS[c.kind!].color }} />
                {c.note}
              </motion.div>
            );
          })}

          <motion.div className="traveler" style={{ left: travelerLeft, top: travelerTop }}>
            <span />
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
