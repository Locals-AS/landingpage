import { motion, type MotionStyle } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: MotionStyle;
  label?: string;
};

export default function Phone({ children, className, style, label }: Props) {
  return (
    <motion.div className={`phone ${className ?? ''}`} style={style} role="img" aria-label={label}>
      <div className="phone-screen">
        <div className="phone-status" aria-hidden="true">
          <span>9:41</span>
          <span className="phone-island" />
          <span className="phone-status-icons">
            <svg viewBox="0 0 18 12" width="16"><path d="M1 11h2V8H1zm4 0h2V6H5zm4 0h2V3H9zm4 0h2V1h-2z" fill="currentColor" /></svg>
            <svg viewBox="0 0 26 12" width="22"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="17" height="8" rx="1.6" fill="currentColor" /><rect x="23.5" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".5" /></svg>
          </span>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
