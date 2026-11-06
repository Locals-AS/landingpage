import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useScrollTo } from '../lenis';
import { TESTER_SIGNUP_URL } from '../config';
import { openSignup } from '../signup';

/* Logoen Vuggen: en «l» som svinger rundt prikken. Prikken er deg, ruta er byen rundt deg.
   Fargene kommer fra --hoved og --prikk, så de byttes ett sted (styles.css). */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" className="logo">
      <rect width="100" height="100" rx="22.5" fill="var(--hoved)" />
      <g transform="translate(11 11) scale(0.78) translate(-3 -1)">
        <path
          d="M30 16 L30 52 A34 34 0 0 0 64 86 L76 86"
          fill="none"
          stroke="#fff"
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="64" cy="52" r="14" fill="var(--prikk)" />
      </g>
    </svg>
  );
}

/* Ordmerket «l●cals»: o-en er prikken fra logoen. Bokstavene er tegnet fra skriften Sora (fet,
   sperret −0,04 em) som SVG, så siden ikke trenger å laste en egen skrift. Bokstavene følger
   tekstfargen, prikken følger --hoved. */
export function Ordmerke({ className = '' }: { className?: string }) {
  return (
    <svg className={`ordmerke ${className}`} viewBox="0 -730 2830 750" role="img" aria-label="Locals">
      <g fill="currentColor">
        <path transform="translate(0 0) scale(1 -1)" d="M80 0V612H15V730H241V0Z" />
        <path transform="translate(885 0) scale(1 -1)" d="M319 -19Q248 -19 196 4Q143 28 108 68Q73 108 56 158Q39 209 39 263V282Q39 338 57 390Q75 441 110 481Q145 521 198 544Q250 567 318 567Q392 567 449 538Q506 510 540 459Q574 408 578 342H421Q417 379 392 404Q366 430 318 430Q278 430 252 410Q225 390 212 355Q199 320 199 272Q199 228 211 192Q223 157 250 138Q276 118 319 118Q351 118 374 130Q396 141 410 162Q423 182 426 209H582Q579 141 544 90Q509 38 451 10Q393 -19 319 -19Z" />
        <path transform="translate(1456 0) scale(1 -1)" d="M404 0V105Q397 84 388 67Q365 28 326 7Q286 -14 229 -14Q170 -14 126 7Q81 28 56 68Q31 107 31 162Q31 222 62 260Q93 299 149 318Q205 336 278 336H377V338Q377 380 357 401Q337 422 293 422Q271 422 235 421Q199 420 161 418Q123 416 92 414V549Q115 551 146 553Q177 555 210 556Q243 557 272 557Q356 557 414 533Q471 509 501 460Q531 412 531 336V0ZM377 247H277Q235 247 212 226Q190 206 190 171Q190 138 212 118Q235 97 277 97Q304 97 326 106Q347 116 361 139Q375 162 377 203Z" />
        <path transform="translate(2010 0) scale(1 -1)" d="M80 0V612H15V730H241V0Z" />
        <path transform="translate(2285 0) scale(1 -1)" d="M281 -17Q164 -17 98 31Q32 79 28 166H170Q174 140 202 120Q229 99 284 99Q326 99 354 114Q381 128 381 155Q381 179 360 194Q339 208 285 214L242 218Q143 228 94 273Q44 318 44 388Q44 446 73 485Q102 524 154 544Q205 564 271 564Q377 564 442 518Q507 471 510 383H368Q364 410 340 428Q316 447 269 447Q232 447 210 433Q188 419 188 395Q188 372 207 360Q226 348 269 343L312 339Q413 328 469 283Q525 238 525 162Q525 107 495 66Q465 26 410 4Q355 -17 281 -17Z" />
      </g>
      <circle cx="600" cy="-275" r="290" fill="var(--hoved)" />
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
        <Ordmerke />
      </a>
      <nav className="nav-links" aria-label="Hovedmeny">
        <a href="#slik" onClick={(e) => { e.preventDefault(); scrollTo('#slik'); }}>Slik virker det</a>
        <a href="#kartet" onClick={(e) => { e.preventDefault(); scrollTo('#kartet', -40); }}>På kartet</a>
        <a href="#byer" onClick={(e) => { e.preventDefault(); scrollTo('#byer', -40); }}>Andre byer</a>
      </nav>
      <a className="button button--small" href={TESTER_SIGNUP_URL} onClick={(e) => openSignup(e, 'meny')}>
        Bli testbruker
      </a>
    </motion.header>
  );
}
