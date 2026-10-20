import { motion } from 'framer-motion';
import CityMap from '../components/CityMap';

export function MapBackdrop({ id, dim = false }: { id: string; dim?: boolean }) {
  return (
    <motion.div
      className="screen-map"
      initial={false}
      animate={{ filter: dim ? 'saturate(0.6) brightness(0.92)' : 'saturate(1) brightness(1)' }}
      transition={{ duration: 0.6 }}
    >
      <CityMap id={id} viewBox="470 120 520 900" />
    </motion.div>
  );
}

export function TabBar({ active = 0 }: { active?: number }) {
  const tabs = [
    { name: 'Kart', d: 'M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2zM9 4v14M15 6v14' },
    { name: 'Treff', d: 'M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20c.6-3.6 3-5.6 6-5.6s5.4 2 6 5.6m-1-5.4c.9-.4 1.9-.6 3-.6 3 0 5.4 2 6 5.6' },
    { name: 'Chat', d: 'M4 5h16v11H9l-5 4z' },
    { name: 'Profil', d: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8c.8-3.6 3.6-6 7-6s6.2 2.4 7 6' },
  ];
  return (
    <div className="tabbar" aria-hidden="true">
      {tabs.map((t, i) => (
        <span key={t.name} className={i === active ? 'is-active' : ''}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d={t.d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          {t.name}
        </span>
      ))}
    </div>
  );
}

const AVATAR_COLORS = ['#F9C9B6', '#C8D9F7', '#D9C8F5', '#C6EBD5', '#F7E2A8', '#F5C6D6'];

export function Avatars({ names, size = 26 }: { names: string[]; size?: number }) {
  return (
    <span className="avatars">
      {names.map((n, i) => (
        <span
          key={n}
          className="avatar"
          style={{ width: size, height: size, background: AVATAR_COLORS[i % AVATAR_COLORS.length], fontSize: size * 0.42 }}
        >
          {n[0]}
        </span>
      ))}
    </span>
  );
}
