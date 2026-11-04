import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Logo } from './Nav';
import { TESTER_SIGNUP_URL } from '../config';
import { openSignup } from '../signup';

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
          Vi fyller kartet nå. Har du iPhone, kan du teste allerede. Har du Android,
          får du beskjed så fort appen er klar. Pinnen din venter.
        </motion.p>
        <motion.div
          className="join-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <motion.a className="button button--large" href={TESTER_SIGNUP_URL} onClick={(e) => openSignup(e, 'bunnen')} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            Sett meg på kartet
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
