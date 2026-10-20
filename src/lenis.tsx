import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const LenisContext = createContext<Lenis | null>(null);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const instance = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    setLenis(instance);
    let frame = 0;
    const loop = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroller mykt til et element eller en piksel-posisjon. */
export function useScrollTo() {
  const lenis = useContext(LenisContext);
  return (target: string | number, offset = 0) => {
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4 });
      return;
    }
    if (typeof target === 'number') {
      window.scrollTo({ top: target + offset });
    } else {
      const el = document.querySelector(target);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
    }
  };
}
