import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Avatars } from './parts';

const MESSAGES = [
  { from: 'Mia', text: 'Hei! Sitter ved vinduet, grønn jakke 🙌', me: false },
  { from: 'Jonas', text: 'Fem min unna. Tar med blyant', me: false },
  { from: 'Deg', text: 'Perfekt. Jeg har kryssordet fra lørdagsavisa', me: true },
  { from: 'Sara', text: 'Kan jeg bli med selv om jeg er elendig på kryssord?', me: false },
  { from: 'Deg', text: 'Spesielt da!', me: true },
];

export default function ScreenChat() {
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const timers: number[] = [];
    MESSAGES.forEach((_, i) => {
      if (i === 0) return;
      timers.push(window.setTimeout(() => setTyping(true), i * 1300 - 650));
      timers.push(
        window.setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
        }, i * 1300),
      );
    });
    timers.push(window.setTimeout(() => setTyping(false), 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="screen screen--chat">
      <motion.div
        className="chat-head"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <span className="chat-back" aria-hidden="true">‹</span>
        <div>
          <strong>Kaffe og kryssord</strong>
          <span>4 skal, starter om 20 min</span>
        </div>
        <Avatars names={['Mia', 'Jonas', 'Sara']} size={22} />
      </motion.div>

      <div className="chat-body">
        <AnimatePresence initial>
          {MESSAGES.slice(0, shown).map((m, i) => (
            <motion.div
              key={i}
              layout
              className={`bubble ${m.me ? 'bubble--me' : ''}`}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            >
              {!m.me && <span className="bubble-from">{m.from}</span>}
              {m.text}
            </motion.div>
          ))}
          {typing && shown < MESSAGES.length && (
            <motion.div
              key="typing"
              layout
              className={`bubble bubble--typing ${MESSAGES[shown].me ? 'bubble--me' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span /><span /><span />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="chat-input" aria-hidden="true">
        <span>Skriv en melding</span>
        <span className="chat-send">↑</span>
      </div>
    </div>
  );
}
