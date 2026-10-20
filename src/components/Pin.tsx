import { motion } from 'framer-motion';

export type Kind = 'meetup' | 'event' | 'place' | 'friend';

export const KINDS: Record<Kind, { name: string; color: string }> = {
  meetup: { name: 'Treff', color: 'var(--c-meetup)' },
  event: { name: 'Arrangement', color: 'var(--c-event)' },
  place: { name: 'Sted', color: 'var(--c-place)' },
  friend: { name: 'Venn', color: 'var(--c-friend)' },
};

function Glyph({ kind }: { kind: Kind }) {
  // Små, enkle symboler inni pinnen.
  switch (kind) {
    case 'meetup':
      return (
        <g fill="#fff">
          <circle cx="9" cy="10" r="2.6" />
          <circle cx="15" cy="10" r="2.6" />
          <path d="M4.6 17c.6-2.4 2.3-3.6 4.4-3.6s3.8 1.2 4.4 3.6zM10.6 17c.6-2.4 2.3-3.6 4.4-3.6s3.8 1.2 4.4 3.6z" />
        </g>
      );
    case 'event':
      return <path fill="#fff" d="M12 5.2l1.9 4.1 4.4.5-3.3 3 .9 4.4L12 15l-3.9 2.2.9-4.4-3.3-3 4.4-.5z" />;
    case 'place':
      return (
        <g fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
          <path d="M7 8h9v4a4.5 4.5 0 01-9 0z" fill="#fff" stroke="none" />
          <path d="M16 9.2h1.3a2 2 0 010 4H16" />
          <path d="M7.5 18h8" />
        </g>
      );
    case 'friend':
      return (
        <g fill="#fff">
          <circle cx="12" cy="9.4" r="3.2" />
          <path d="M6.2 18c.8-3 3-4.6 5.8-4.6s5 1.6 5.8 4.6z" />
        </g>
      );
  }
}

type PinProps = {
  kind: Kind;
  size?: number;
  delay?: number;
  label?: string;
  dimmed?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Pin({ kind, size = 40, delay = 0, label, dimmed = false, className, style }: PinProps) {
  return (
    <motion.div
      className={`pin ${className ?? ''}`}
      style={{ ...style, width: size, height: size * 1.25 }}
      initial={{ opacity: 0, y: -26, scale: 0.4 }}
      animate={{ opacity: dimmed ? 0.18 : 1, y: 0, scale: dimmed ? 0.82 : 1 }}
      transition={{
        opacity: { duration: 0.4, delay: dimmed ? 0 : delay },
        scale: { type: 'spring', stiffness: 420, damping: 16, delay: dimmed ? 0 : delay },
        y: { type: 'spring', stiffness: 380, damping: 14, delay },
      }}
      whileHover={{ y: -4, scale: 1.08 }}
    >
      <svg viewBox="0 0 24 30" width={size} height={size * 1.25} aria-hidden="true">
        <path
          d="M12 29s-9.5-8.6-9.5-16.6a9.5 9.5 0 0119 0C21.5 20.4 12 29 12 29z"
          fill={KINDS[kind].color}
          stroke="#fff"
          strokeWidth="1.6"
        />
        <g transform="translate(0 0.6)">
          <Glyph kind={kind} />
        </g>
      </svg>
      {label && <span className="pin-label">{label}</span>}
    </motion.div>
  );
}

/** Den blå prikken som er deg, med radar-ringer. */
export function YouDot({ size = 18, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`you ${className ?? ''}`} style={{ ...style, width: size, height: size }} aria-hidden="true">
      <span className="you-ring" />
      <span className="you-ring you-ring--late" />
      <span className="you-core" />
    </div>
  );
}
