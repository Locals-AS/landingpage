import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import CityMap from './CityMap';
import Phone from './Phone';
import ScreenMap from '../screens/ScreenMap';
import ScreenEvent from '../screens/ScreenEvent';
import ScreenCreate from '../screens/ScreenCreate';
import ScreenChat from '../screens/ScreenChat';
import { useScrollTo } from '../lenis';

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS: { title: string; text: string; glow: string; screen: () => ReactNode }[] = [
  {
    title: 'Åpne kartet',
    text: 'Alt som skjer innen 5 km dukker opp som pins: arrangementer, steder og treff som folk i nærheten har laget. Filtrer på det du er i humør for.',
    glow: 'var(--c-event)',
    screen: () => <ScreenMap id="story-map" cycle />,
  },
  {
    title: 'Finn noe å gjøre',
    text: 'Trykk på en pin for å se hva det er, når det starter, hvor langt unna det er og hvem som skal.',
    glow: 'var(--c-place)',
    screen: () => <ScreenEvent />,
  },
  {
    title: 'Lag et treff',
    text: 'Lyst på kaffe, en tur eller et brettspill? Legg ut et treff der du står, så kan folk i nærheten bli med.',
    glow: 'var(--c-meetup)',
    screen: () => <ScreenCreate />,
  },
  {
    title: 'Møt folk',
    text: 'Chat med de som blir med før dere møtes, og legg til venner du vil se igjen.',
    glow: 'var(--c-friend)',
    screen: () => <ScreenChat />,
  },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const scrollTo = useScrollTo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length * 0.999)));
    setActive(i);
  });

  const mapX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const mapY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const mapRot = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    scrollTo(el.offsetTop + (span * (i + 0.5)) / STEPS.length);
  };

  return (
    <section id="slik" ref={ref} className="story" style={{ height: `${STEPS.length * 95 + 30}vh` }}>
      <div className="story-sticky">
        <motion.div className="story-map" style={{ x: mapX, y: mapY, rotate: mapRot }}>
          <CityMap id="story-bg" />
        </motion.div>
        <div className="story-veil" />

        <div className="story-grid">
          <div className="story-copy">
            <motion.h2
              className="h2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              Fra «hva skal vi finne på?» til at dere sitter der.
            </motion.h2>

            <div className="steps">
              <div className="steps-track" aria-hidden="true">
                <motion.span style={{ scaleY: bar }} />
              </div>
              <ol>
                {STEPS.map((s, i) => (
                  <li key={s.title} className={i === active ? 'is-active' : ''}>
                    <button onClick={() => goTo(i)} aria-current={i === active ? 'step' : undefined}>
                      {s.title}
                    </button>
                    <AnimatePresence initial={false}>
                      {i === active && (
                        <motion.p
                          key="text"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                        >
                          <span>{s.text}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="story-device">
            <motion.div
              className="story-glow"
              animate={{ background: `radial-gradient(closest-side, color-mix(in srgb, ${STEPS[active].glow} 38%, transparent), transparent)` }}
              transition={{ duration: 0.9 }}
            />
            <Phone label={`Skjermbilde: ${STEPS[active].title}`}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="screen-slot"
                  initial={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {STEPS[active].screen()}
                </motion.div>
              </AnimatePresence>
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
