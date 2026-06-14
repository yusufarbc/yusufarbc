#!/usr/bin/env python3
import sys
import os
import re

def clean_inline_formatting(text):
    # Remove markdown link syntax [text](url) -> text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    # Remove image syntax ![alt](url) -> [Görsel: alt] (handled separately or stripped)
    text = re.sub(r'!\[([^\]]*)\]\([^)]+\)', r'[Görsel: \1]', text)
    # Remove bold/italic formatting
    text = re.sub(r'\*\*([^*]+)\*\*|__([^_]+)__', r'\1\2', text)
    text = re.sub(r'\*([^*]+)\*|_([^_]+)_', r'\1\2', text)
    # Remove inline code backticks
    text = re.sub(r'`([^`]+)`', r'\1', text)
    return text.strip()

def convert_markdown_to_audio(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' does not exist.")
        return

    # Detect language based on file path or content
    is_turkish = "tr" in os.path.basename(file_path).lower() or "tr" in file_path.lower()
    
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    output_lines = []
    
    # State tracking
    in_frontmatter = False
    frontmatter_count = 0
    in_code_block = False
    in_mermaid_block = False
    in_table = False
    table_headers = []
    table_rows = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # 1. Frontmatter parsing
        if stripped == "---":
            if frontmatter_count < 2:
                in_frontmatter = not in_frontmatter
                frontmatter_count += 1
                i += 1
                continue
        
        if in_frontmatter:
            i += 1
            continue
            
        # 2. Code blocks and Mermaid blocks
        if stripped.startswith("```"):
            if in_code_block or in_mermaid_block:
                # Exiting block
                if in_mermaid_block:
                    if is_turkish:
                        output_lines.append("[Mermaid Diyagramı: Burada bir mimari veya akış şeması bulunmaktadır. Şema detayları görsel olarak mevcuttur.]\n")
                    else:
                        output_lines.append("[Mermaid Diagram: An architectural or flow diagram is present here. Diagram details are visually represented.]\n")
                    in_mermaid_block = False
                else:
                    if is_turkish:
                        output_lines.append("[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]\n")
                    else:
                        output_lines.append("[Code Block: A code example is present here. Code contents are skipped in the voiceover.]\n")
                    in_code_block = False
            else:
                # Entering block
                if stripped.startswith("```mermaid"):
                    in_mermaid_block = True
                else:
                    in_code_block = True
            i += 1
            continue
            
        if in_code_block or in_mermaid_block:
            i += 1
            continue
            
        # 3. HTML comments
        if stripped.startswith("<!--") and stripped.endswith("-->"):
            i += 1
            continue
            
        # 4. Tables parsing
        # A table line starts and ends with '|' or contains multiple '|'
        is_table_line = stripped.startswith("|") and stripped.endswith("|") and len(stripped.split("|")) > 2
        
        if is_table_line:
            if not in_table:
                in_table = True
                table_headers = [cell.strip() for cell in stripped.split("|")[1:-1]]
                table_rows = []
            else:
                # Check if it's the separator line like |---|---|
                if re.match(r'^\|[\s:-|-]*\|$', stripped):
                    pass # Skip separator
                else:
                    cells = [cell.strip() for cell in stripped.split("|")[1:-1]]
                    table_rows.append(cells)
            i += 1
            continue
        elif in_table:
            # Table ended, process table into natural spoken sentences
            in_table = False
            if table_headers and table_rows:
                output_lines.append("\n")
                if is_turkish:
                    output_lines.append("[Tablo Başlangıcı]\n")
                else:
                    output_lines.append("[Table Start]\n")
                    
                for row in table_rows:
                    sentence_parts = []
                    # Match headers and cell values
                    for col_idx, cell_val in enumerate(row):
                        if col_idx < len(table_headers):
                            header = clean_inline_formatting(table_headers[col_idx])
                            val = clean_inline_formatting(cell_val)
                            if val and val != "-" and val != "—":
                                sentence_parts.append(f"{header}: {val}")
                    if sentence_parts:
                        output_lines.append(". ".join(sentence_parts) + ".\n")
                
                if is_turkish:
                    output_lines.append("[Tablo Bitişi]\n\n")
                else:
                    output_lines.append("[Table End]\n\n")
            # Don't increment i yet, process current line in next iteration
            continue

        # 5. Markdown Headings
        if stripped.startswith("#"):
            heading_match = re.match(r'^(#+)\s+(.*)$', stripped)
            if heading_match:
                level = len(heading_match.group(1))
                text = clean_inline_formatting(heading_match.group(2))
                if level == 1:
                    prefix = "Başlık: " if is_turkish else "Title: "
                elif level == 2:
                    prefix = "Bölüm: " if is_turkish else "Chapter: "
                else:
                    prefix = "Bölüm Detayı: " if is_turkish else "Section: "
                output_lines.append(f"\n{prefix}{text}\n\n")
            i += 1
            continue
            
        # 6. Bullet lists and numbered lists
        # Clean bullet lists but keep their verbatim text
        list_match = re.match(r'^[\s\t]*([-*+]|\d+\.)\s+(.*)$', line)
        if list_match:
            content = clean_inline_formatting(list_match.group(2))
            # Ensure list items end with standard sentence punctuation
            if content and not content[-1] in ['.', '!', '?']:
                content += "."
            output_lines.append(content + "\n")
            i += 1
            continue
            
        # 7. Images
        if stripped.startswith("!["):
            img_match = re.match(r'^!\[([^\]]*)\]\([^)]+\)', stripped)
            if img_match:
                alt_text = img_match.group(1).strip()
                if not alt_text:
                    alt_text = "Görsel açıklaması yok" if is_turkish else "No image description"
                prefix = "Görsel: " if is_turkish else "Image: "
                output_lines.append(f"\n[{prefix}{alt_text}]\n\n")
            i += 1
            continue
            
        # 8. Regular text lines (prose)
        if stripped:
            clean_text = clean_inline_formatting(line)
            output_lines.append(clean_text + "\n")
        else:
            output_lines.append("\n")
            
        i += 1
        
    # Final cleanup of double spacing or empty parts
    final_output = []
    prev_empty = False
    for out_line in output_lines:
        is_empty = out_line.strip() == ""
        if is_empty:
            if not prev_empty:
                final_output.append("\n")
                prev_empty = True
        else:
            final_output.append(out_line)
            prev_empty = False
            
    return "".join(final_output).strip() + "\n"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_to_audio_script.py <path_to_markdown_file> [<path_to_output_file>]")
        sys.exit(1)
        
    input_file = sys.argv[1]
    
    if len(sys.argv) >= 3:
        output_file = sys.argv[2]
    else:
        # Default output naming: replace tr.md with audio-script-tr.md or prepend audio-script-
        dir_name = os.path.dirname(input_file)
        base_name = os.path.basename(input_file)
        name, ext = os.path.splitext(base_name)
        if name in ["tr", "en"]:
            output_file = os.path.join(dir_name, f"audio-script-{name}{ext}")
        else:
            output_file = os.path.join(dir_name, f"audio-script-{name}{ext}")
            
    audio_content = convert_markdown_to_audio(input_file)
    if audio_content:
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(audio_content)
        print(f"Successfully generated audio script: {output_file}")
