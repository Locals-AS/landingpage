// Lenker samlet ett sted. Bytt ut før lansering.
export const CONTACT_EMAIL = 'post@locals.no';

// Påmeldingen (venteliste og testbrukere) går til et skjema i Tally.
// Lim inn skjema-ID-en fra lenken https://tally.so/r/[ID] her. Står den tom,
// åpner knappene en e-post som før. Selve logikken bor i src/signup.ts.
export const TALLY_FORM_ID = 'gbaRol';

export const TESTER_SIGNUP_URL = TALLY_FORM_ID
  ? `https://tally.so/r/${TALLY_FORM_ID}`
  : `mailto:${CONTACT_EMAIL}?subject=Jeg%20vil%20teste%20Locals`;
