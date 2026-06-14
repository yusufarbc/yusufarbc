#!/usr/bin/env python3
import os
import sys
import argparse
from PIL import Image

def optimize_images(directory, quality=80, delete_original=False):
    if not os.path.isdir(directory):
        print(f"Error: Directory '{directory}' does not exist.")
        return

    print(f"Scanning directory: {directory}")
    print(f"WebP Quality: {quality}%")
    print(f"Delete original images: {'Yes' if delete_original else 'No'}")
    print("-" * 50)

    image_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.tiff')
    converted_count = 0
    failed_count = 0

    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(image_extensions) and not file.lower().endswith('.webp'):
                filepath = os.path.join(root, file)
                basename = os.path.splitext(file)[0]
                webp_path = os.path.join(root, f"{basename}.webp")

                print(f"Processing: {file}...")
                try:
                    with Image.open(filepath) as img:
                        # Special handling for potentially huge images to prevent layout breaks or bloat
                        if img.width > 2000:
                            ratio = 2000 / img.width
                            new_height = int(img.height * ratio)
                            print(f"  Resizing from {img.width}x{img.height} to 2000x{new_height}")
                            img = img.resize((2000, new_height), Image.Resampling.LANCZOS)
                        
                        img.save(webp_path, "WEBP", quality=quality)
                        print(f"  Saved WebP to: {webp_path}")
                        converted_count += 1

                    if delete_original:
                        os.remove(filepath)
                        print(f"  Deleted original file: {file}")

                except Exception as e:
                    print(f"  Error processing {file}: {e}")
                    failed_count += 1

    print("-" * 50)
    print(f"Done! Converted: {converted_count}, Failed: {failed_count}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Optimize blog post images by converting them to WebP.")
    parser.add_argument("directory", help="Path to the directory containing images (e.g. blog post media folder)")
    parser.add_argument("-q", "--quality", type=int, default=80, help="WebP quality (default: 80)")
    parser.add_argument("-d", "--delete", action="store_true", help="Delete the original image files after successful conversion")

    args = parser.parse_args()
    optimize_images(args.directory, args.quality, args.delete)
