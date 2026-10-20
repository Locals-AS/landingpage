import { Logo } from './Nav';
import { CONTACT_EMAIL } from '../config';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Logo size={22} />
        <span>Locals AS</span>
      </div>
      <p>Laget i Norge, for nabolaget ditt.</p>
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      <small>© {new Date().getFullYear()} Locals AS</small>
    </footer>
  );
}
