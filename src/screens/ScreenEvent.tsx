import { motion } from 'framer-motion';
import Pin, { YouDot } from '../components/Pin';
import { Avatars, MapBackdrop } from './parts';

const sheet = {
  initial: { y: '100%' },
  animate: { y: 0 },
  transition: { type: 'spring' as const, stiffness: 180, damping: 26, delay: 0.25 },
};

const rise = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.5 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ScreenEvent() {
  return (
    <div className="screen">
      <MapBackdrop id="ev" dim />
      <YouDot className="screen-you" style={{ top: '30%' }} />
      <motion.div
        className="focus-pin"
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.1 }}
        style={{ left: '62%', top: '18%' }}
      >
        <Pin kind="event" size={34} />
      </motion.div>

      <motion.div className="sheet" {...sheet}>
        <span className="sheet-grip" />
        <motion.span className="tag tag--event" {...rise(0)}>Konsert</motion.span>
        <motion.h4 className="sheet-title" {...rise(1)}>Jazz i bakgården</motion.h4>
        <motion.div className="sheet-meta" {...rise(2)}>
          <span>I kveld kl. 21.00</span>
          <span>650 m unna</span>
        </motion.div>
        <motion.p className="sheet-text" {...rise(3)}>
          Trio fra konservatoriet spiller standarder under lyslenkene. Ta med noe å sitte på.
        </motion.p>
        <motion.div className="sheet-people" {...rise(4)}>
          <Avatars names={['Mia', 'Jonas', 'Sara', 'Ali']} />
          <span>14 skal</span>
        </motion.div>
        <motion.div
          className="sheet-button"
          {...rise(5)}
          whileHover={{ scale: 1.02 }}
        >
          Bli med
        </motion.div>
      </motion.div>
    </div>
  );
}
