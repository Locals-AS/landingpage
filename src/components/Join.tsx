import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Logo } from './Nav';
import { TESTER_SIGNUP_URL } from '../config';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Join() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const bloom = useTransform(scrollYProgress, [0, 1], [0.4, 1.15]);
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={ref} className="join">
      <motion.div className="join-bloom" style={{ scale: bloom, opacity: bloomOpacity }} aria-hidden="true" />
      <div className="join-inner">
        <motion.div
          className="join-mark"
          initial={{ y: -60, opacity: 0, scale: 0.6 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ type: 'spring', stiffness: 220, damping: 12 }}
        >
          <span className="join-ring" />
          <span className="join-ring join-ring--late" />
          <Logo size={64} />
        </motion.div>
        <motion.h2
          className="display display--join"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
        >
          Vær blant de første på kartet.
        </motion.h2>
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          Vi tester Locals med en liten gruppe nå. Meld deg på, så får du en
          invitasjon til testversjonen på iPhone.
        </motion.p>
        <motion.div
          className="join-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <motion.a className="button button--large" href={TESTER_SIGNUP_URL} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            Meld deg på testen
          </motion.a>
          <div className="stores">
            <span className="store">
              <small>Snart i</small>App Store
            </span>
            <span className="store">
              <small>Snart i</small>Google Play
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
