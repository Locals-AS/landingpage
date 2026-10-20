import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useScrollTo } from '../lenis';
import { TESTER_SIGNUP_URL } from '../config';

export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 40" width={size} height={size * 1.25} aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3FA2F7" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path d="M16 39S2.5 26.6 2.5 15.5a13.5 13.5 0 0127 0C29.5 26.6 16 39 16 39z" fill="url(#logo-g)" />
      <circle cx="16" cy="15.5" r="8.6" fill="#fff" />
      <circle cx="16" cy="12.8" r="2.9" fill="url(#logo-g)" />
      <path d="M10.6 21.2c.8-3 2.8-4.5 5.4-4.5s4.6 1.5 5.4 4.5a8.6 8.6 0 01-10.8 0z" fill="url(#logo-g)" />
    </svg>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const scrollTo = useScrollTo();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setSolid(y > 24);
  });

  return (
    <motion.header
      className={`nav ${solid ? 'nav--solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, delay: hidden ? 0 : 0.2 }}
    >
      <a
        href="#top"
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault();
          scrollTo(0);
        }}
      >
        <Logo size={24} />
        <span>Locals</span>
      </a>
      <nav className="nav-links" aria-label="Hovedmeny">
        <a href="#slik" onClick={(e) => { e.preventDefault(); scrollTo('#slik'); }}>Slik virker det</a>
        <a href="#kartet" onClick={(e) => { e.preventDefault(); scrollTo('#kartet', -40); }}>På kartet</a>
        <a href="#byer" onClick={(e) => { e.preventDefault(); scrollTo('#byer', -40); }}>Andre byer</a>
      </nav>
      <a className="button button--small" href={TESTER_SIGNUP_URL}>
        Bli testbruker
      </a>
    </motion.header>
  );
}
