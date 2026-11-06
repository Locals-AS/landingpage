"""Leser merkefargene fra src/styles.css, så fargene bare står ett sted.

Brukes av lag-ikoner.py og lag-delingsbilder.py.
"""

import re
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
CSS = ROT / 'src' / 'styles.css'


def merkefarger() -> dict[str, str]:
    """Henter --hoved, --prikk, --ink og --mist fra den første :root-blokken."""
    tekst = CSS.read_text(encoding='utf-8')
    root = tekst[tekst.index(':root {'):]
    root = root[: root.index('\n}')]
    farger = {}
    for navn in ('hoved', 'prikk', 'ink', 'mist'):
        treff = re.search(rf'--{navn}:\s*(#[0-9a-fA-F]{{6}})', root)
        if not treff:
            raise SystemExit(f'Fant ikke --{navn} i :root i {CSS}')
        farger[navn] = treff.group(1).upper()
    return farger


def vuggen_svg(storrelse: int, hoved: str, prikk: str, hjorner: bool = True) -> str:
    """Logoen Vuggen som frittstående SVG. Uten hjørner til app-ikon (iOS runder selv)."""
    rx = '22.5' if hjorner else '0'
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="{storrelse}" height="{storrelse}">'
        f'<rect width="100" height="100" rx="{rx}" fill="{hoved}"/>'
        '<g transform="translate(11 11) scale(0.78) translate(-3 -1)">'
        '<path d="M30 16 L30 52 A34 34 0 0 0 64 86 L76 86" fill="none" stroke="#FFFFFF" '
        'stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>'
        f'<circle cx="64" cy="52" r="14" fill="{prikk}"/>'
        '</g></svg>'
    )
