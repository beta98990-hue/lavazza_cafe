import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def optimize_image(src_path, dest_path, max_dim=700, quality=86):
    try:
        with Image.open(src_path) as img:
            # Agar RGBA bo'lsa, shaffoflikni saqlaymiz
            has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
            if has_alpha:
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
            
            # O'lchamni kichraytirish (aspect rationi buzmasdan)
            orig_w, orig_h = img.size
            if max(orig_w, orig_h) > max_dim:
                img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
            
            # WebP formatida saqlash
            img.save(dest_path, 'WEBP', quality=quality, method=6)
            
        orig_sz = os.path.getsize(src_path)
        new_sz = os.path.getsize(dest_path)
        return orig_sz, new_sz, True
    except Exception as e:
        print(f"Error processing {src_path}: {e}")
        return 0, 0, False

def process_all():
    base_dirs = ['напитки', 'images/logo']
    total_orig = 0
    total_new = 0
    count = 0
    
    for b_dir in base_dirs:
        for root, dirs, files in os.walk(b_dir):
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in ('.png', '.jpg', '.jpeg') and not file.endswith('.webp'):
                    full_src = os.path.join(root, file)
                    webp_name = os.path.splitext(file)[0] + '.webp'
                    full_dest = os.path.join(root, webp_name)
                    
                    # Logo uchun max_dim 400
                    max_dim = 400 if 'logo' in root.lower() else 700
                    orig_sz, new_sz, success = optimize_image(full_src, full_dest, max_dim=max_dim, quality=86)
                    if success:
                        total_orig += orig_sz
                        total_new += new_sz
                        count += 1
                        print(f"[{count:2d}] {file[:30]:30s} -> {orig_sz/1024:6.1f}KB -> {new_sz/1024:5.1f}KB ({(1 - new_sz/orig_sz)*100:.1f}% off)")
                        
    print("\n" + "="*50)
    print(f"Jami optimallashtirilgan rasmlar soni: {count}")
    print(f"Asl umumiy hajm: {total_orig / (1024*1024):.2f} MB")
    print(f"Yangi umumiy hajm: {total_new / (1024*1024):.2f} MB")
    if total_orig > 0:
        print(f"Iqtisod qilingan trafik: {(total_orig - total_new) / (1024*1024):.2f} MB ({(1 - total_new/total_orig)*100:.1f}% tejash!)")
    print("="*50)

if __name__ == '__main__':
    process_all()
