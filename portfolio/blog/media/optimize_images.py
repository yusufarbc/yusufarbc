import os
from PIL import Image

MEDIA_DIR = r"c:\Users\WORKSTATION\Documents\AntiGravity\yusufarbc\portfolio\blog\media"

def optimize_images():
    print(f"Scanning {MEDIA_DIR}...")
    for filename in os.listdir(MEDIA_DIR):
        if filename.lower().endswith(".png"):
            filepath = os.path.join(MEDIA_DIR, filename)
            basename = os.path.splitext(filename)[0]
            webp_path = os.path.join(MEDIA_DIR, f"{basename}.webp")
            
            try:
                with Image.open(filepath) as img:
                    # Special handling for the large cover image
                    if filename == "silicon-logic.png":
                        print(f"Resizing and converting {filename}...")
                        # Resize to max width 1920, keep aspect ratio
                        if img.width > 1920:
                            ratio = 1920 / img.width
                            new_height = int(img.height * ratio)
                            img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
                        
                        img.save(webp_path, "WEBP", quality=85)
                        print(f"Saved {webp_path}")
                        
                    else:
                        print(f"Converting {filename} to WebP...")
                        img.save(webp_path, "WEBP", quality=80)
                        print(f"Saved {webp_path}")
            except Exception as e:
                print(f"Failed to process {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
