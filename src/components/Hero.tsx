import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import CityMap from './CityMap';
import Phone from './Phone';
import Pin, { KINDS, type Kind } from './Pin';
import ScreenMap from '../screens/ScreenMap';
import { Avatars } from '../screens/parts';
import { useScrollTo } from '../lenis';
import { TESTER_SIGNUP_URL } from '../config';

const EASE = [0.22, 1, 0.36, 1] as const;

const MAP_PINS: { kind: Kind; x: number; y: number; label: string }[] = [
  { kind: 'event', x: 58, y: 16, label: 'Quiz på hjørnet, 19.30' },
  { kind: 'meetup', x: 92, y: 30, label: 'Søndagstur rundt vannet' },
  { kind: 'place', x: 50, y: 82, label: 'Nytt bakeri åpnet i dag' },
  { kind: 'friend', x: 86, y: 74, label: 'Jonas er ute' },
  { kind: 'meetup', x: 8, y: 86, label: 'Brettspill, 2 plasser igjen' },
  { kind: 'event', x: 96, y: 54, label: 'Loppemarked i parken' },
  { kind: 'place', x: 64, y: 50, label: 'Kafé med uteservering' },
  { kind: 'meetup', x: 36, y: 10, label: 'Løpetur i morgen 07.00' },
];

const LINES = ['Se hva', 'som skjer', 'rundt deg.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const phoneScrollY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const phoneScrollRot = useTransform(scrollYProgress, [0, 1], [0, -6]);

  // Musa vipper telefonen og skyver kartet litt.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const mapX = useTransform(sx, [-1, 1], [18, -18]);
  const mapShiftY = useTransform(sy, [-1, 1], [12, -12]);
  const rotY = useTransform(sx, [-1, 1], [-9, 9]);
  const rotX = useTransform(sy, [-1, 1], [7, -7]);
  const cardsX = useTransform(sx, [-1, 1], [-14, 14]);
  const cardsY = useTransform(sy, [-1, 1], [-10, 10]);

  // Én pin om gangen viser hva den er.
  const [callout, setCallout] = useState(-1);
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => setCallout(0), 2600);
    const t = setInterval(() => {
      i = (i + 1) % MAP_PINS.length;
      setCallout(i);
    }, 2600);
    return () => {
      clearTimeout(start);
      clearInterval(t);
    };
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="hero"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      <motion.div className="hero-map" style={{ scale: mapScale, y: mapY }}>
        <motion.div className="hero-map-inner" style={{ x: mapX, y: mapShiftY }}>
          <CityMap id="hero" draw />
          {MAP_PINS.map((p, i) => (
            <div key={i} className="hero-pin" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <Pin kind={p.kind} size={34} delay={1.1 + i * 0.09} />
              <AnimatePresence>
                {callout === i && (
                  <motion.span
                    className="callout"
                    initial={{ opacity: 0, y: 8, scale: 0.9, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -6, scale: 0.96, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <i style={{ background: KINDS[p.kind].color }} />
                    {p.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="hero-veil" />

      <div className="hero-inner">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <h1 className="display">
            {LINES.map((line, i) => (
              <span className="line-mask" key={line}>
                <motion.span
                  className="line"
                  initial={{ y: '110%', rotate: 3 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          >
            Locals er et levende kart over nabolaget ditt. Finn konserter, quiz og
            løpeturer i nærheten, lag et treff der du står, og bli med når andre gjør
            det samme.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          >
            <motion.a className="button" href={TESTER_SIGNUP_URL} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Bli testbruker
            </motion.a>
            <button className="button button--ghost" onClick={() => scrollTo('#slik')}>
              Se hvordan det virker
            </button>
          </motion.div>
          <motion.p
            className="hero-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            Kommer snart til iPhone og Android.
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-device"
          style={{ y: phoneScrollY, rotate: phoneScrollRot }}
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
        >
          <motion.div className="hero-tilt" style={{ rotateX: rotX, rotateY: rotY }}>
            <Phone label="Locals-appen viser et kart med treff, arrangementer og steder i nærheten">
              <ScreenMap id="hero-phone" delay={1.0} />
            </Phone>
          </motion.div>

          <motion.div className="float-card float-card--a" style={{ x: cardsX, y: cardsY }}
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 2.0, type: 'spring', stiffness: 160, damping: 18 }}
          >
            <Avatars names={['Mia']} size={34} />
            <div>
              <strong>Mia ble med på treffet ditt</strong>
              <span>Kveldsløp langs elva, 18.00</span>
            </div>
          </motion.div>

          <motion.div className="float-card float-card--b" style={{ x: cardsY, y: cardsX }}
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 2.4, type: 'spring', stiffness: 160, damping: 18 }}
          >
            <span className="float-card-pin" style={{ background: KINDS.event.color }}>★</span>
            <div>
              <strong>Jazz i bakgården</strong>
              <span>I kveld, 650 m unna</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        className="scroll-cue"
        onClick={() => scrollTo('#slik')}
        aria-label="Scroll ned"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.button>
    </section>
  );
}
