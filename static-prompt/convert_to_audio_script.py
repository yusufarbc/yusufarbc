#!/usr/bin/env python3
import sys
import os
import re

def clean_inline_formatting(text):
    # Remove HTML comments on a single line
    text = re.sub(r'<!--.*?-->', '', text)
    # Remove markdown link syntax [text](url) -> text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    # Remove image syntax ![alt](url) -> ""
    text = re.sub(r'!\[[^\]]*\]\([^)]+\)', '', text)
    # Remove raw URLs
    text = re.sub(r'https?://\S+', '', text)
    # Remove bold/italic formatting
    text = re.sub(r'\*\*([^*]+)\*\*|__([^_]+)__', r'\1\2', text)
    text = re.sub(r'\*([^*]+)\*|_([^_]+)_', r'\1\2', text)
    # Remove inline code backticks
    text = re.sub(r'`([^`]+)`', r'\1', text)
    # Remove HTML tags (e.g. <div>, </div>, <p>, etc.)
    text = re.sub(r'</?[a-zA-Z][^>]*>', '', text)
    # Remove blockquote angle brackets at the start of text
    text = re.sub(r'^\s*>\s*', '', text)
    # Remove markdown alerts (e.g., [!WARNING], [!IMPORTANT], [!NOTE], [!CAUTION], [!TIP])
    text = re.sub(r'\[!(WARNING|IMPORTANT|NOTE|CAUTION|TIP)\]', '', text, flags=re.IGNORECASE)
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
    in_style_block = False
    in_html_comment = False
    in_html_table = False
    in_references_section = False
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

        # 1b. Style block parsing
        if stripped.startswith("<style") or stripped.startswith("<style>"):
            if "</style>" in stripped:
                i += 1
                continue
            in_style_block = True
            i += 1
            continue
            
        if in_style_block:
            if "</style>" in stripped:
                in_style_block = False
            i += 1
            continue
            
        # 1c. HTML comment block parsing
        if "<!--" in stripped:
            if "-->" in stripped:
                # If it's a single line HTML comment, we skip it
                if stripped.startswith("<!--") and stripped.endswith("-->"):
                    i += 1
                    continue
            else:
                in_html_comment = True
                i += 1
                continue
                
        if in_html_comment:
            if "-->" in stripped:
                in_html_comment = False
            i += 1
            continue

        # 1cc. HTML table block parsing (skipped in audio)
        if "<table" in stripped:
            in_html_table = True
            if "</table>" in stripped:
                in_html_table = False
            i += 1
            continue
            
        if in_html_table:
            if "</table>" in stripped:
                in_html_table = False
            i += 1
            continue

        # 2. Code blocks and Mermaid blocks (skipped in audio)
        if stripped.startswith("```"):
            if in_code_block or in_mermaid_block:
                # Exiting block
                if in_mermaid_block:
                    in_mermaid_block = False
                else:
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
            
        # 1d. Symbol/Emoji check (skip lines without any alphanumeric characters in their CLEANED text)
        clean_text = clean_inline_formatting(line)
        if stripped and not any(c.isalnum() for c in clean_text):
            i += 1
            continue
            
        # 1e. Look ahead for skipped blocks to avoid reading captions/intros to skipped blocks
        next_idx = i + 1
        next_non_empty = None
        while next_idx < len(lines):
            next_line = lines[next_idx].strip()
            if next_line:
                next_non_empty = next_line
                break
            next_idx += 1
            
        if next_non_empty and (next_non_empty.startswith("```") or next_non_empty.startswith("|") or "<table" in next_non_empty):
            is_bold = (stripped.startswith("**") and stripped.endswith("**")) or (stripped.startswith("__") and stripped.endswith("__"))
            is_short = len(clean_text) < 55
            if is_bold or is_short:
                i += 1
                continue
            
        # 4. Tables parsing (skipped in audio)
        # A table line starts and ends with '|' or contains multiple '|'
        is_table_line = stripped.startswith("|") and stripped.endswith("|") and len(stripped.split("|")) > 2
        
        if is_table_line:
            in_table = True
            i += 1
            continue
        elif in_table:
            # Table ended, reset state. Don't increment i so current line is processed.
            in_table = False
            continue

        # 5. Markdown Headings
        if stripped.startswith("#"):
            heading_match = re.match(r'^(#+)\s+(.*)$', stripped)
            if heading_match:
                level = len(heading_match.group(1))
                text = clean_inline_formatting(heading_match.group(2))
                
                # Check if this heading starts the references/further reading section
                text_lower = text.lower()
                if "ileri okuma" in text_lower or "further reading" in text_lower or "kaynaklar" in text_lower or "references" in text_lower:
                    in_references_section = True
                else:
                    in_references_section = False
                
                if not in_references_section:
                    if level == 1:
                        prefix = "Başlık: " if is_turkish else "Title: "
                    elif level == 2:
                        prefix = "Bölüm: " if is_turkish else "Chapter: "
                    else:
                        prefix = "Bölüm Detayı: " if is_turkish else "Section: "
                    output_lines.append(f"\n{prefix}{text}\n\n")
            i += 1
            continue

        if in_references_section:
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
            
        # 7. Images (skipped in audio)
        if stripped.startswith("!["):
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
