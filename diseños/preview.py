from PIL import Image
import os

SRC = os.path.dirname(__file__)
OUT = os.path.join(SRC, "processed")
PREVIEW = os.path.join(SRC, "preview")
os.makedirs(PREVIEW, exist_ok=True)


def composite(png_name, bg_color, out_name):
    fg = Image.open(os.path.join(OUT, png_name)).convert("RGBA")
    canvas = Image.new("RGB", (fg.width + 80, fg.height + 80), bg_color)
    canvas.paste(fg, (40, 40), fg)
    canvas.save(os.path.join(PREVIEW, out_name))


composite("dolphinflag-transparent.png", (255, 255, 255), "dolphinflag_on_white.png")
composite("dolphinflag-transparent.png", (10, 10, 10), "dolphinflag_on_black.png")
composite("dolphinpizza-transparent.png", (255, 255, 255), "dolphinpizza_on_white.png")
composite("dolphinpizza-transparent.png", (10, 10, 10), "dolphinpizza_on_black.png")
composite("dolphinskate-transparent.png", (255, 255, 255), "dolphinskate_on_white.png")
composite("dolphinskate-transparent.png", (10, 10, 10), "dolphinskate_on_black.png")
composite("logo1-transparent.png", (255, 255, 255), "logo1_on_white.png")
composite("logo1-white-ink.png", (10, 10, 10), "logo1_on_black.png")
composite("logoclassic-opaque.png", (255, 255, 255), "logoclassic_on_white.png")
composite("logoclassic-transparent.png", (10, 10, 10), "logoclassic_on_black.png")

print("done")
