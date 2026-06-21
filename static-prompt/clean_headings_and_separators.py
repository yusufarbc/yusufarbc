#!/usr/bin/env python3
import os
import re

def process_file(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # We need to split the file by lines
    lines = content.splitlines()
    new_lines = []
    
    # Track front matter (first two occurrences of ---)
    front_matter_count = 0
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # Identify front matter boundaries
        if stripped == "---":
            if front_matter_count < 2:
                front_matter_count += 1
                new_lines.append(line)
                i += 1
                continue

        # For normal lines, check if it's a horizontal rule "---"
        if stripped == "---":
            # Look ahead for the next non-empty line
            next_idx = i + 1
            next_line = ""
            while next_idx < len(lines):
                if lines[next_idx].strip():
                    next_line = lines[next_idx].strip()
                    break
                next_idx += 1
            
            # If the next non-empty line starts with '## ' (but not '### '), keep the '---'
            # (Note that we want '## ' specifically, which is H2)
            if next_line.startswith("## ") and not next_line.startswith("### "):
                new_lines.append(line)
            else:
                # Skip this --- line (remove it)
                print(f"Removing separator line on line {i+1} because it is followed by: {next_line}")
                # We do NOT append the line
                pass
            i += 1
            continue

        # If the line is an H2 heading, strip any numbering like "1. ", "11. "
        if stripped.startswith("## "):
            # Pattern to match '## 1. ', '## 10. ', etc.
            match = re.match(r'^##\s+\d+\.\s+(.*)$', stripped)
            if match:
                new_title = match.group(1)
                new_line = f"## {new_title}"
                print(f"Changing header: '{stripped}' -> '{new_line}'")
                new_lines.append(new_line)
            else:
                new_lines.append(line)
            i += 1
            continue

        new_lines.append(line)
        i += 1

    # Write back the cleaned content
    cleaned_content = "\n".join(new_lines) + "\n"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(cleaned_content)
    print(f"Finished processing {file_path}\n")

def main():
    tr_path = r"c:\Users\yusuf\Github\yusufarbc\website\content\owasp\tr.md"
    en_path = r"c:\Users\yusuf\Github\yusufarbc\website\content\owasp\en.md"
    process_file(tr_path)
    process_file(en_path)

if __name__ == "__main__":
    main()
