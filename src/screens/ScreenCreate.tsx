import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Pin, { YouDot } from '../components/Pin';
import { MapBackdrop } from './parts';

const TITLE = 'Kaffe og kryssord';

const FIELDS = [
  { label: 'Når', value: 'Om 30 minutter' },
  { label: 'Hvor', value: 'Der du står nå' },
  { label: 'Plass til', value: '6 personer' },
];

export default function ScreenCreate() {
  const [typed, setTyped] = useState(0);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const t = setInterval(() => {
        i += 1;
        setTyped(i);
        if (i >= TITLE.length) clearInterval(t);
      }, 55);
    }, 700);
    const post = setTimeout(() => setPosted(true), 700 + TITLE.length * 55 + 900);
    return () => {
      clearTimeout(start);
      clearTimeout(post);
    };
  }, []);

  return (
    <div className="screen">
      <MapBackdrop id="cr" dim={!posted} />
      <YouDot className="screen-you" style={{ top: '24%' }} />

      <AnimatePresence>
        {posted && (
          <motion.div
            key="new-pin"
            className="focus-pin"
            style={{ left: '50%', top: '17%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Pin kind="meetup" size={36} />
            <motion.span
              className="ripple"
              initial={{ scale: 0.3, opacity: 0.7 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="sheet"
        initial={{ y: '100%' }}
        animate={{ y: posted ? '62%' : 0 }}
        transition={{ type: 'spring', stiffness: 170, damping: 26, delay: posted ? 0 : 0.2 }}
      >
        <span className="sheet-grip" />
        <h4 className="sheet-title">Nytt treff</h4>
        <div className="field field--title">
          <span className="field-label">Hva vil du gjøre?</span>
          <span className="field-value">
            {TITLE.slice(0, typed)}
            {!posted && <span className="caret" />}
          </span>
        </div>
        {FIELDS.map((f, i) => (
          <motion.div
            key={f.label}
            className="field"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <span className="field-label">{f.label}</span>
            <span className="field-value">{f.value}</span>
          </motion.div>
        ))}
        <motion.div
          className="sheet-button sheet-button--meetup"
          animate={posted ? { scale: [1, 0.95, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          Legg ut treffet
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {posted && (
          <motion.div
            className="toast"
            initial={{ y: -40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.25 }}
          >
            <span className="toast-dot" />
            Treffet er lagt ut
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
