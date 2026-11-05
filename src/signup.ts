import type { MouseEvent } from 'react';
import { TALLY_FORM_ID } from './config';

// All påmeldingslogikk bor her. Knappene på siden kaller bare openSignup.
// Bytter vi fra Tally til Supabase senere, er det denne fila (og et eget skjema) som endres,
// ikke seksjonene.

type TallyApi = { openPopup: (formId: string, options?: Record<string, unknown>) => void };
declare global {
  interface Window {
    Tally?: TallyApi;
  }
}

const TALLY_SCRIPT = 'https://tally.so/widgets/embed.js';
let loading: Promise<void> | null = null;

// Tally-skriptet lastes først når noen trykker på en knapp, så siden ikke blir tyngre for alle andre.
function loadTally(): Promise<void> {
  if (window.Tally) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TALLY_SCRIPT;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        loading = null;
        reject(new Error('Tally lastet ikke'));
      };
      document.body.appendChild(script);
    });
  }
  return loading;
}

/**
 * Åpner påmeldingsskjemaet som et vindu over siden.
 * `knapp` sier hvilken knapp som ble brukt (meny, toppen, bunnen). Tally lagrer det
 * hvis skjemaet har et skjult felt med samme navn.
 */
export function openSignup(event: MouseEvent, knapp: string) {
  if (!TALLY_FORM_ID) return; // ikke noe skjema ennå: lenken (e-post) brukes som før
  event.preventDefault();
  loadTally()
    .then(() => window.Tally?.openPopup(TALLY_FORM_ID, { layout: 'modal', width: 440, hiddenFields: { knapp } }))
    .catch(() => {
      // Får vi ikke åpnet vinduet, går vi rett til skjemaet hos Tally i stedet.
      window.location.href = `https://tally.so/r/${TALLY_FORM_ID}`;
    });
}
