from PIL import Image
import numpy as np
import os

SRC = os.path.dirname(__file__)
OUT = os.path.join(SRC, "processed")
os.makedirs(OUT, exist_ok=True)


def remove_near_color_bg(im, target=(255, 255, 255), tol=18, feather=25):
    """Turn pixels close to `target` transparent, with a soft feather band."""
    im = im.convert("RGB")
    arr = np.array(im).astype(np.int16)
    dist = np.sqrt(((arr - np.array(target)) ** 2).sum(axis=2))
    alpha = np.clip((dist - tol) / feather, 0, 1) * 255
    out = np.dstack([arr.astype(np.uint8), alpha.astype(np.uint8)])
    return Image.fromarray(out, mode="RGBA")


def black_lineart_to_white_ink(im, tol=60):
    """For a black-line-art-on-white image: output white ink where the art was
    dark, transparent elsewhere. Meant for printing on black garments."""
    im = im.convert("RGB")
    arr = np.array(im).astype(np.int16)
    luminance = arr.mean(axis=2)  # 0 = black, 255 = white
    # alpha: fully opaque where luminance is low (was black ink), fades out by `tol`
    alpha = np.clip((255 - luminance - (255 - tol - 30)) / 30 * 255, 0, 255)
    # actually simpler: opaque where dark, transparent where light
    alpha = np.clip((150 - luminance) / 60 * 255, 0, 255)
    white_rgb = np.full(arr.shape, 255, dtype=np.uint8)
    out = np.dstack([white_rgb, alpha.astype(np.uint8)])
    return Image.fromarray(out, mode="RGBA")


def crop_to_content(im, bg_check=lambda p: p[3] < 10):
    arr = np.array(im)
    alpha = arr[:, :, 3]
    ys, xs = np.where(alpha > 10)
    if len(xs) == 0:
        return im
    pad = 4
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, im.width)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, im.height)
    return im.crop((x0, y0, x1, y1))


jobs_white_bg = ["dolphinflag", "dolphinpizza", "dolphinskate", "logo1"]

for name in jobs_white_bg:
    im = Image.open(os.path.join(SRC, f"{name}.jpeg"))
    out = remove_near_color_bg(im, target=(255, 255, 255), tol=15, feather=20)
    out = crop_to_content(out)
    out.save(os.path.join(OUT, f"{name}-transparent.png"))
    print(name, "->", out.size)

# White-ink version of logo1, for black garments
im = Image.open(os.path.join(SRC, "logo1.jpeg"))
white_ink = black_lineart_to_white_ink(im)
white_ink = crop_to_content(white_ink)
white_ink.save(os.path.join(OUT, "logo1-white-ink.png"))
print("logo1-white-ink ->", white_ink.size)

# logoclassic: black background version needs the black made transparent for black tees
im = Image.open(os.path.join(SRC, "logoclassic.jpeg"))
transparent_bg = remove_near_color_bg(im, target=(0, 0, 0), tol=25, feather=25)
transparent_bg = crop_to_content(transparent_bg)
transparent_bg.save(os.path.join(OUT, "logoclassic-transparent.png"))
print("logoclassic-transparent ->", transparent_bg.size)

# logoclassic as-is (opaque) works fine on white tees, just re-save as PNG
im.convert("RGB").save(os.path.join(OUT, "logoclassic-opaque.png"))
