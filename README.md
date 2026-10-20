# Locals – landingsside

Statisk landingsside for Locals. Vite + React + TypeScript, med
[Framer Motion](https://motion.dev) for overganger og [Lenis](https://lenis.darkroom.engineering)
for myk scrolling. Ingen backend.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bygger til dist/
```

Deploy skjer automatisk til GitHub Pages ved push til `main`
(`.github/workflows/deploy.yml`). `base: './'` i `vite.config.ts` gjør at
bygget virker både under `/landingpage/` og på eget domene.

## Struktur

- `src/components/CityMap.tsx` – det tegnede bykartet som går igjen på hele siden
- `src/components/Hero.tsx` – toppen, med innlastingsanimasjonen
- `src/components/Story.tsx` – «Slik virker det», låst telefon som bytter skjerm mens du scroller
- `src/screens/` – skjermene inni telefonen
- `src/components/Kinds.tsx`, `Travel.tsx`, `Join.tsx` – resten av seksjonene
- `src/config.ts` – lenker (testbruker-påmelding, kontakt) samlet ett sted
