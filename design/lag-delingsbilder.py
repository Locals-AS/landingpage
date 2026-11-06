"""Lager delingsbildene (1200 × 630) fra toppen av nettsiden, med logoen og fargene som gjelder.

Kjør etter  npm run build:  python3 design/lag-delingsbilder.py
Krever Playwright for Python og Google Chrome (pip install playwright).

Lager to bilder:
- public/og-image.jpg                  versjon B, «Test Locals før alle andre» (brukes nå)
- design/delingsbilde-A-lansering.jpg  versjon A, med locals.no (byttes inn ved lansering)

Bildene tas av toppen av siden med menyen, ingressen og knappene skjult, og med logoen
og en egen linje nederst lagt inn. Telefonen, kartet og kortene er de samme som på siden.
"""

import asyncio
import functools
import http.server
import threading
from io import BytesIO
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

from merkefarger import ROT

DIST = ROT / 'dist'
CHROME = '/usr/bin/google-chrome'
PORT = 4199

CSS = """
.nav, .lede, .hero-actions, .hero-note, .scroll-cue, .callout { display: none !important; }
.hero-inner { padding-top: 0 !important; padding-bottom: 0 !important; }
.hero-copy { transform: none !important; opacity: 1 !important; }
.hero .display { font-size: 104px !important; line-height: 0.95 !important; }
.og-merke { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; color: var(--ink); }
.og-merke .ordmerke { height: 40px; }
.og-linje { margin-top: 34px; font-size: 30px; color: var(--ink-soft); letter-spacing: -0.01em; }
.og-knapp { margin-top: 34px; display: inline-flex; align-items: center; gap: 14px; height: 64px;
  padding: 0 30px; border-radius: 999px; background: var(--hoved); color: #fff;
  font-size: 26px; font-weight: 560; letter-spacing: -0.01em; }
.og-knapp::before { content: ''; width: 12px; height: 12px; border-radius: 50%; background: var(--prikk); }
"""

JS = """(versjon) => {
  const kopi = document.querySelector('.hero');
  const h1 = kopi.querySelector('h1');
  const merke = document.createElement('div');
  merke.className = 'og-merke';
  const logo = document.querySelector('.footer .logo').cloneNode(true);
  logo.setAttribute('width', '56'); logo.setAttribute('height', '56');
  merke.append(logo, document.querySelector('.nav .ordmerke').cloneNode(true));
  h1.before(merke);
  const linje = document.createElement('div');
  if (versjon === 'B') { linje.className = 'og-knapp'; linje.textContent = 'Test Locals før alle andre'; }
  else { linje.className = 'og-linje'; linje.textContent = 'locals.no'; }
  h1.after(linje);
  // Nålene på venstre halvdel skjules, så teksten står fritt
  document.querySelectorAll('.hero-pin').forEach((nal) => {
    const r = nal.getBoundingClientRect();
    if (r.left + r.width / 2 < 620) nal.style.display = 'none';
  });
}"""


def start_server() -> http.server.ThreadingHTTPServer:
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(DIST))
    server = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


async def ta_bilde(nettleser, versjon: str, fil: Path) -> None:
    side = await nettleser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=2)
    await side.goto(f'http://127.0.0.1:{PORT}/', wait_until='networkidle')
    await side.wait_for_timeout(4500)  # telefonen, nålene og kortene er ferdig animert
    await side.add_style_tag(content=CSS)
    await side.evaluate(JS, versjon)
    await side.wait_for_timeout(400)
    png = await side.screenshot()
    await side.close()
    bilde = Image.open(BytesIO(png)).convert('RGB').resize((1200, 630), Image.LANCZOS)
    bilde.save(fil, quality=88, optimize=True, progressive=True)
    print('Laget', fil)


async def main() -> None:
    if not (DIST / 'index.html').exists():
        raise SystemExit('Fant ikke dist/. Kjør npm run build først.')
    server = start_server()
    try:
        async with async_playwright() as p:
            nettleser = await p.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
            await ta_bilde(nettleser, 'B', ROT / 'public' / 'og-image.jpg')
            await ta_bilde(nettleser, 'A', ROT / 'design' / 'delingsbilde-A-lansering.jpg')
            await nettleser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    asyncio.run(main())
