#!/usr/bin/env python3
"""
Final Safe-Mode Update: Ensuring Hedvig Letters Serif is forced on all pages via explicit CSS.
"""
import re
from pathlib import Path

base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')

html_files = [
    'about.html',
    'about_backup.html',
    'contact.html',
    'index.html',
    'legal.html',
    'logos.html',
    'pricing.html',
    'quiz.html',
    'report_template.html',
    'resources.html',
    'soon.html',
    'team.html',
]

def apply_safe_font_fix(content):
    # 1. Update Google Fonts link to be clean
    pattern_gf = r'href="https://fonts\.googleapis\.com/css2\?family=Inter[^"]*"'
    new_gf = 'href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Hedvig+Letters+Serif:opsz@12..24&display=swap"'
    content = re.sub(pattern_gf, new_gf, content)

    # 2. Fix Tailwind config syntax inside the script tag
    content = re.sub(
        r'"display":\s*\[.*?\]',
        r'"display": ["Hedvig Letters Serif", "serif"]',
        content
    )
    content = re.sub(
        r'"body":\s*\[.*?\]',
        r'"body": ["Outfit", "sans-serif"]',
        content
    )

    # 3. Add explicit CSS override if not present
    if '.font-display' not in content:
        style_fix = "\n    <style>\n        .font-display {\n            font-family: 'Hedvig Letters Serif', serif !important;\n        }\n    </style>"
        content = re.sub(r'</head>', f'{style_fix}\n</head>', content)
    
    return content

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = apply_safe_font_fix(content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    print("🔒 Applying Safe-Mode Font Changes...")
    for filename in html_files:
        filepath = base_path / filename
        if filepath.exists():
            if update_file(filepath):
                print(f"  ✅ {filename} fixed.")
            else:
                print(f"  ⚪ {filename} already fixed.")
    print("✨ Finished!")

if __name__ == '__main__':
    main()
