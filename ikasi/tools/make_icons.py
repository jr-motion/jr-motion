import sys, numpy as np, cv2
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB').crop((679,110,1896,1327))
a = np.asarray(im).copy()
h, w = a.shape[:2]
grey = (np.abs(a.astype(int) - 226).max(2) < 14)
corner = np.zeros((h, w), bool); R = 220
for y0 in (0, h-R):
    for x0 in (0, w-R):
        corner[y0:y0+R, x0:x0+R] = True
mask = (grey & corner).astype(np.uint8) * 255
mask = cv2.dilate(mask, np.ones((7,7), np.uint8))
bgr = cv2.cvtColor(a, cv2.COLOR_RGB2BGR)
fixed = cv2.inpaint(bgr, mask, 25, cv2.INPAINT_TELEA)
full = Image.fromarray(cv2.cvtColor(fixed, cv2.COLOR_BGR2RGB))
full.save(f'{out}/icon-full.png')
for s in (512, 192, 180, 96):
    full.resize((s, s), Image.LANCZOS).save(f'{out}/icon-{s}.png', optimize=True)
# maskable: arte al 80 % sobre fondo verde (zona segura de Android)
G = (98, 198, 11); m = Image.new('RGB', (512, 512), G)
m.paste(full.resize((420, 420), Image.LANCZOS), (46, 46)); m.save(f'{out}/icon-maskable-512.png', optimize=True)
