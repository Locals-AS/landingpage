import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/schibsted-grotesk';
import 'lenis/dist/lenis.css';
import './styles.css';
import App from './App';

// Forhåndsvisning av fargesett: ?palett=teal. Fjernes når fargene er valgt.
const palett = new URLSearchParams(location.search).get('palett');
if (palett) document.documentElement.dataset.palett = palett;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
