"""Genera versioni WebP + JPEG responsive (480/960/1440 px) dalle foto sorgente.
Non modifica gli originali. Da rieseguire se si aggiungono foto."""
from PIL import Image
import glob, os

CARTELLE = ["assets/images/hero", "assets/images/locale", "assets/images/piatti"]
LARGHEZZE = [480, 960, 1440]
Q_WEBP = 78
Q_JPEG = 82

def elabora(path):
    base, _ = os.path.splitext(path)
    # salta i file gia generati
    if any(base.endswith(f"-{w}") for w in LARGHEZZE):
        return
    im = Image.open(path).convert("RGB")
    w0, h0 = im.size
    for w in LARGHEZZE:
        if w > w0:
            ww, hh = w0, h0
        else:
            ww, hh = w, round(h0 * w / w0)
        ridim = im.resize((ww, hh), Image.LANCZOS)
        ridim.save(f"{base}-{w}.webp", "WEBP", quality=Q_WEBP, method=6)
        ridim.save(f"{base}-{w}.jpg", "JPEG", quality=Q_JPEG, optimize=True, progressive=True)
        print(f"  {os.path.basename(base)}-{w}  {ww}x{hh}")

for c in CARTELLE:
    print(c)
    for p in sorted(glob.glob(f"{c}/*.jpg")):
        elabora(p)
print("Fatto.")
