// Skriver en kort tabell over Lighthouse-målingene, så den vises på sjekken i GitHub.
// Leser manifest.json fra mappene lhci skriver til (.lighthouseci-mobil og .lighthouseci-pc).
import { existsSync, readFileSync } from 'node:fs';

const enheter = [
  ['Mobil', '.lighthouseci-mobil/manifest.json'],
  ['PC', '.lighthouseci-pc/manifest.json'],
];
const prosent = (v) => (typeof v === 'number' ? Math.round(v * 100) : '–');

console.log('## Fartssjekk (Lighthouse)\n');
console.log('| Enhet | Fart | Tilgjengelighet | God praksis | SEO |');
console.log('| --- | --- | --- | --- | --- |');
for (const [navn, fil] of enheter) {
  if (!existsSync(fil)) {
    console.log(`| ${navn} | ikke målt | | | |`);
    continue;
  }
  // lhci lagrer én rad per kjøring. Den som er merket representativ, er medianen.
  const runs = JSON.parse(readFileSync(fil, 'utf8'));
  const run = runs.find((r) => r.isRepresentativeRun) ?? runs[0];
  const s = run.summary;
  console.log(`| ${navn} | ${prosent(s.performance)} | ${prosent(s.accessibility)} | ${prosent(s['best-practices'])} | ${prosent(s.seo)} |`);
}
console.log('\nMål: 90 eller mer på alt. Mobil måles som en middels telefon på treg 4G. Fulle rapporter ligger under Artifacts på denne kjøringen.');
