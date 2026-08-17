import shutil
import os
from pathlib import Path

src = Path("C:/Users/Acer/OneDrive/Desktop/lavaza img")
dst = Path("C:/Users/Acer/Documents/kimi/workspace/lavazza-site/images")

mappings = {
    "coffee": (src / "coffee", dst / "coffee"),
    "tea": (src / "choylar", dst / "tea"),
    "lemonades": (src / "limonadlar", dst / "lemonades"),
    "ice-coffee": (src / "ice coffeelar", dst / "ice-coffee"),
    "fresh": (src / "freshlar", dst / "fresh"),
    "milk-cocktails": (src / "molochniy ichimliklar", dst / "milk-cocktails"),
    "matcha": (src / "matchalar", dst / "matcha"),
}

for name, (s, d) in mappings.items():
    d.mkdir(parents=True, exist_ok=True)
    files = sorted(s.glob("*.png"))
    for i, f in enumerate(files, 1):
        dest_file = d / f"{name}_{i}.png"
        shutil.copy2(f, dest_file)
        print(f"Copied: {f.name} -> {dest_file}")

# Copy logo
logo_src = src / "logo" / "photo_2026-08-16_16-49-48.jpg"
logo_dst = dst / "logo" / "logo.jpg"
logo_dst.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(logo_src, logo_dst)
print(f"Copied logo -> {logo_dst}")

# Copy menu images
menu1_src = src / "menyu1" / "ChatGPT Image 16 авг. 2026 г., 20_07_43.png"
menu2_src = src / "menyu2" / "ChatGPT Image 16 авг. 2026 г., 21_12_32.png"
shutil.copy2(menu1_src, dst / "main-menu.png")
shutil.copy2(menu2_src, dst / "matcha-menu.png")
print("Copied menu images")
