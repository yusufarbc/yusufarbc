#!/usr/bin/env python3
import os
import re

def remove_tables_from_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    original_content = content
    
    # Remove English table blocks
    content = re.sub(r'\[Table Start\].*?\[Table End\]', '', content, flags=re.DOTALL)
    
    # Remove Turkish table blocks
    content = re.sub(r'\[Tablo Başlangıcı\].*?\[Tablo Bitişi\]', '', content, flags=re.DOTALL)
    
    # Clean up double blank lines or trailing blank lines left over
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    if content != original_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Cleaned tables from: {file_path}")
        return True
    return False

def main():
    content_dir = r"c:\Users\yusuf\Github\yusufarbc\website\content"
    if not os.path.exists(content_dir):
        print(f"Error: Content directory '{content_dir}' does not exist.")
        return
        
    count = 0
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.startswith("audio-script-") and file.endswith(".md"):
                file_path = os.path.join(root, file)
                if remove_tables_from_file(file_path):
                    count += 1
                    
    print(f"Finished. Cleaned {count} audio script files.")

if __name__ == "__main__":
    main()
