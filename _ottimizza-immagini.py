"""Genera versioni WebP + JPEG responsive (480/960/1440 px) dalle foto sorgente.
Non modifica gli originali. Da rieseguire se si aggiungono o si cambiano foto.

Uso:  python _ottimizza-immagini.py
"""
from PIL import Image, ImageFilter
import glob, os

LARGHEZZE = [480, 960, 1440]

# Qualita' per cartella. L'hero e' lo showcase del sito: qualita' alta.
IMPOSTAZIONI = {
    "assets/images/hero":   {"webp": 90, "jpeg": 90, "sharpen": True},
    "assets/images/locale": {"webp": 80, "jpeg": 84, "sharpen": False},
    "assets/images/piatti": {"webp": 80, "jpeg": 84, "sharpen": False},
}


def elabora(path, cfg):
    base, _ = os.path.splitext(path)
    if any(base.endswith(f"-{w}") for w in LARGHEZZE):
        return  # e' gia' una versione generata, la salto
    im = Image.open(path).convert("RGB")
    w0, h0 = im.size
    for w in LARGHEZZE:
        ww = min(w, w0)
        hh = round(h0 * ww / w0)
        ridim = im.resize((ww, hh), Image.LANCZOS)
        if cfg["sharpen"]:
            ridim = ridim.filter(ImageFilter.UnsharpMask(radius=1.0, percent=60, threshold=2))
        ridim.save(f"{base}-{w}.webp", "WEBP", quality=cfg["webp"], method=6)
        ridim.save(f"{base}-{w}.jpg", "JPEG", quality=cfg["jpeg"], optimize=True, progressive=True)
        print(f"  {os.path.basename(base)}-{w}  {ww}x{hh}")


for cartella, cfg in IMPOSTAZIONI.items():
    print(cartella)
    for p in sorted(glob.glob(f"{cartella}/*.jpg")):
        elabora(p, cfg)
print("Fatto.")
