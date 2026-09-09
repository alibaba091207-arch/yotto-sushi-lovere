"""Genera versioni WebP + JPEG responsive (480/960/1440 px) dalle foto sorgente.
Non modifica gli originali. Da rieseguire se si aggiungono o si cambiano foto.

Le versioni gia' presenti e piu' recenti dell'originale vengono saltate, cosi'
rieseguire lo script dopo aver aggiunto UNA foto non rigenera (ne' modifica nel
repo) tutte le altre.  Per forzare la rigenerazione:  cancella i file generati
oppure lancia:  python _ottimizza-immagini.py --forza

Uso:  python _ottimizza-immagini.py
"""
from PIL import Image, ImageFilter
import glob, os, sys

FORZA = "--forza" in sys.argv

LARGHEZZE = [480, 960, 1440]

# Qualita' per cartella. L'hero e' lo showcase del sito: qualita' alta.
IMPOSTAZIONI = {
    "assets/images/hero":     {"webp": 90, "jpeg": 90, "sharpen": True},
    "assets/images/locale":   {"webp": 80, "jpeg": 84, "sharpen": False},
    "assets/images/piatti":   {"webp": 80, "jpeg": 84, "sharpen": False},
    "assets/images/cocktail": {"webp": 80, "jpeg": 84, "sharpen": False},
}


def elabora(path, cfg):
    base, _ = os.path.splitext(path)
    if any(base.endswith(f"-{w}") for w in LARGHEZZE):
        return  # e' gia' una versione generata, la salto
    generati = [f"{base}-{w}.{est}" for w in LARGHEZZE for est in ("webp", "jpg")]
    if not FORZA and all(
        os.path.exists(f) and os.path.getmtime(f) >= os.path.getmtime(path)
        for f in generati
    ):
        return  # versioni gia' presenti e aggiornate: non le ritocco
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
