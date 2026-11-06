"""Lager favicon og hjemskjermikon fra merkefargene i src/styles.css.

Kjør etter at fargene er endret:  python3 design/lag-ikoner.py
Krever Playwright for Python og Google Chrome (pip install playwright).

Lager tre filer i public/:
- favicon.svg            logoen med runde hjørner, for nettlesere som støtter SVG
- favicon-48.png         samme, 48 × 48 px (Google viser favicon i søk i multipler av 48)
- apple-touch-icon.png   180 × 180 px uten hjørner, fordi iPhone runder hjørnene selv
"""

import asyncio
from pathlib import Path

from playwright.async_api import async_playwright

from merkefarger import ROT, merkefarger, vuggen_svg

PUBLIC = ROT / 'public'
CHROME = '/usr/bin/google-chrome'


async def tegn_png(nettleser, svg: str, storrelse: int, fil: Path) -> None:
    side = await nettleser.new_page(viewport={'width': storrelse, 'height': storrelse})
    await side.set_content(
        f'<html><body style="margin:0;background:transparent">{svg}</body></html>'
    )
    await side.locator('svg').screenshot(path=str(fil), omit_background=True)
    await side.close()


async def main() -> None:
    f = merkefarger()
    print(f"Hovedfarge {f['hoved']}, prikk {f['prikk']}")

    (PUBLIC / 'favicon.svg').write_text(vuggen_svg(48, f['hoved'], f['prikk']), encoding='utf-8')

    async with async_playwright() as p:
        nettleser = await p.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
        await tegn_png(nettleser, vuggen_svg(48, f['hoved'], f['prikk']), 48, PUBLIC / 'favicon-48.png')
        await tegn_png(
            nettleser,
            vuggen_svg(180, f['hoved'], f['prikk'], hjorner=False),
            180,
            PUBLIC / 'apple-touch-icon.png',
        )
        await nettleser.close()

    for navn in ('favicon.svg', 'favicon-48.png', 'apple-touch-icon.png'):
        print('Laget', PUBLIC / navn)


if __name__ == '__main__':
    asyncio.run(main())
