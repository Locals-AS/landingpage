import { motion } from 'framer-motion';
import { Avatars } from './parts';

// Kommentarfeltet på et treff, slik appen har det: svar i tråd og likes, ikke live chat.
type Comment = { from: string; time: string; text: string; likes?: number; reply?: boolean };

const COMMENTS: Comment[] = [
  { from: 'Mia', time: '12 min', text: 'Jeg sitter ved vinduet, grønn jakke 🙌', likes: 3 },
  { from: 'Jonas', time: '8 min', text: 'Fem min unna. Tar med blyant', likes: 1, reply: true },
  { from: 'Sara', time: '2 min', text: 'Kan jeg bli med selv om jeg er elendig på kryssord?', likes: 2 },
  { from: 'Deg', time: 'nå', text: 'Spesielt da!', reply: true },
];

const COLORS: Record<string, string> = {
  Mia: '#F9C9B6',
  Jonas: '#C8D9F7',
  Sara: '#D9C8F5',
  Deg: '#C6EBD5',
};

export default function ScreenComments() {
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

      <motion.div
        className="comments-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <strong>Kommentarer</strong>
        <span>{COMMENTS.length}</span>
        <em>Nyeste ▾</em>
      </motion.div>

      <div className="comments-body">
        {COMMENTS.map((c, i) => (
          <motion.div
            key={i}
            className={`comment ${c.reply ? 'comment--reply' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.75, type: 'spring', stiffness: 300, damping: 26 }}
          >
            <span
              className="avatar"
              style={{
                width: c.reply ? 22 : 28,
                height: c.reply ? 22 : 28,
                background: COLORS[c.from],
                fontSize: (c.reply ? 22 : 28) * 0.42,
              }}
            >
              {c.from[0]}
            </span>
            <div className="comment-main">
              <span className="comment-meta">
                <b>{c.from}</b> · {c.time}
              </span>
              <p>{c.text}</p>
              <span className="comment-actions">
                <motion.span
                  className="comment-like"
                  initial={{ scale: 1 }}
                  animate={c.likes ? { scale: [1, 1.25, 1] } : undefined}
                  transition={{ delay: 0.9 + i * 0.75, duration: 0.4 }}
                >
                  ♥ {c.likes ?? 0}
                </motion.span>
                <span>Svar</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="chat-input" aria-hidden="true">
        <span>Skriv en kommentar</span>
        <span className="chat-send">↑</span>
      </div>
    </div>
  );
}
