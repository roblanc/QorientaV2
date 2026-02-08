#!/usr/bin/env python3
"""
Script to update all HTML files to use only Fraunces + Outfit fonts.
- Fraunces: Display font (headings, titles)
- Outfit: Body font (paragraphs, text)
"""

import os
import re
import glob

# New Google Fonts URL with only Fraunces and Outfit
NEW_GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Outfit:wght@300;400;500;600;700;800&display=swap'

# Files to update (all HTML files)
html_files = [
    'about.html',
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
    'admin/index.html',
]

def update_file(filepath):
    """Update a single HTML file with new fonts."""
    if not os.path.exists(filepath):
        print(f"  ⚠️  File not found: {filepath}")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Replace Google Fonts URL
    # Match various patterns of Google Fonts URLs
    patterns = [
        r'href="https://fonts\.googleapis\.com/css2\?family=[^"]+display=swap"',
        r"href='https://fonts\.googleapis\.com/css2\?family=[^']+display=swap'",
    ]
    
    for pattern in patterns:
        content = re.sub(pattern, f'href="{NEW_GOOGLE_FONTS_URL}"', content)
    
    # 2. Replace .font-display declarations to use Fraunces
    # Match: font-family: 'Hedvig Letters Serif', serif !important;
    content = re.sub(
        r"font-family:\s*['\"]Hedvig Letters Serif['\"],\s*serif\s*!important;",
        "font-family: 'Fraunces', serif !important;",
        content
    )
    
    # 3. Replace any Inter references with Outfit in font-family
    content = re.sub(
        r"font-family:\s*['\"]Inter['\"]",
        "font-family: 'Outfit'",
        content
    )
    
    # 4. Update Tailwind config fontFamily settings
    # Replace "display": ["Hedvig Letters Serif", "serif"] with Fraunces
    content = re.sub(
        r'"display":\s*\["Hedvig Letters Serif",\s*"serif"\]',
        '"display": ["Fraunces", "serif"]',
        content
    )
    content = re.sub(
        r"'display':\s*\['Hedvig Letters Serif',\s*'serif'\]",
        "'display': ['Fraunces', 'serif']",
        content
    )
    
    # Replace "body": ["Outfit", "sans-serif"] - keep as is, just ensure it's there
    # Replace any Inter in body font
    content = re.sub(
        r'"body":\s*\["Inter",\s*"sans-serif"\]',
        '"body": ["Outfit", "sans-serif"]',
        content
    )
    
    # 5. Remove Gochi Hand font-family references (replace with Fraunces)
    content = re.sub(
        r"font-family:\s*['\"]Gochi Hand['\"],\s*cursive;?",
        "font-family: 'Fraunces', serif;",
        content
    )
    
    # 6. Remove references to local font CSS files (formom.css)
    content = re.sub(
        r'<link\s+rel="stylesheet"\s+href="assets/fonts/formom\.css"\s*/?>\s*\n?',
        '',
        content
    )
    
    # 7. Replace font-display class definition
    content = re.sub(
        r"\.font-display\s*\{\s*font-family:\s*['\"][^'\"]+['\"],\s*serif\s*!important;\s*\}",
        ".font-display {\n            font-family: 'Fraunces', serif !important;\n        }",
        content
    )
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Updated: {filepath}")
        return True
    else:
        print(f"  ⏭️  No changes needed: {filepath}")
        return False

def main():
    print("🔤 Updating fonts to Fraunces + Outfit...")
    print("=" * 50)
    
    updated_count = 0
    
    for filepath in html_files:
        if update_file(filepath):
            updated_count += 1
    
    print("=" * 50)
    print(f"✅ Updated {updated_count} files")
    print("\nFonts now in use:")
    print("  • Fraunces (display/headings)")
    print("  • Outfit (body text)")

if __name__ == "__main__":
    main()
