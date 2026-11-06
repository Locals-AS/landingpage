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
(`.github/workflows/static.yml`). `base: './'` i `vite.config.ts` gjør at
bygget virker både under `/landingpage/` og på eget domene.

## Struktur

- `src/components/CityMap.tsx` – det tegnede bykartet som går igjen på hele siden
- `src/components/Hero.tsx` – toppen, med innlastingsanimasjonen
- `src/components/Story.tsx` – «Slik virker det», låst telefon som bytter skjerm mens du scroller
- `src/screens/` – skjermene inni telefonen
- `src/components/Kinds.tsx`, `Travel.tsx`, `Join.tsx` – resten av seksjonene
- `src/config.ts` – lenker (testbruker-påmelding, kontakt) samlet ett sted

## Logo og merkefarger

- Logoen heter Vuggen (valgt av teamet 05.11.2026). Den ligger som komponenten `Logo` i
  `src/components/Nav.tsx`, sammen med ordmerket `Ordmerke` («l●cals», tegnet som SVG fra
  skriften Sora, så siden ikke laster en ekstra skrift).
- Fargene står ett sted: `--hoved` og `--prikk` (og `--ink` og `--mist`) i `:root` øverst i
  `src/styles.css`. Prikkfargen brukes aldri som tekst på lys bakgrunn, bare inni hovedfargen
  eller på mørke flater.
- Endres fargene, lages ikonene og delingsbildene på nytt (krever Playwright for Python og
  Google Chrome):

```bash
python3 design/lag-ikoner.py          # favicon.svg, favicon-48.png, apple-touch-icon.png
npm run build
python3 design/lag-delingsbilder.py   # public/og-image.jpg og design/delingsbilde-A-lansering.jpg
```

## Delingsbilde

- `public/og-image.jpg` er bildet som vises når locals.no deles (1200 × 630). Nå er det
  versjon B, med «Test Locals før alle andre».
- Ved lansering byttes det til versjon A: kopier `design/delingsbilde-A-lansering.jpg`
  til `public/og-image.jpg`, og rett `og:image:alt` i `index.html`.
- Begge lages av `design/lag-delingsbilder.py` fra toppen av siden.
