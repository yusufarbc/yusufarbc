#!/usr/bin/env python3
import os
import re

def clean_file(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' does not exist.")
        return
        
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    # Pattern to match lines starting with A01:, API1:, 1:, CICD-SEC-1:, etc.
    # It must start with uppercase letters, numbers, and hyphens, followed by a colon.
    pattern = re.compile(r'^[A-Z0-9\-]+:')
    
    new_lines = []
    for line in lines:
        stripped = line.strip()
        # Skip if it matches the pattern
        if pattern.match(stripped):
            continue
        new_lines.append(line)
        
    # Clean up double empty lines
    content = "".join(new_lines)
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Successfully cleaned vulnerability list items from: {file_path}")

def main():
    tr_path = r"c:\Users\yusuf\Github\yusufarbc\website\content\owasp\audio-script-tr.md"
    en_path = r"c:\Users\yusuf\Github\yusufarbc\website\content\owasp\audio-script-en.md"
    
    clean_file(tr_path)
    clean_file(en_path)

if __name__ == "__main__":
    main()
