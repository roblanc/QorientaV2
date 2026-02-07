#!/usr/bin/env python3
"""
Update ALL HTML pages to use Hedvig Letters Serif + Outfit
"""
import re
from pathlib import Path

base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')

# All HTML files with font configs
html_files = [
    'about_backup.html',
    'contact.html',
    'font-test.html',
    'index_original.html',
    'legal.html',
    'logos.html',
    'pricing.html',
    'quiz.html',
    'report_template.html',
    'resources.html',
    'soon.html',
    'team.html',
]

def update_font_config(content):
    """Update fontFamily config to use Hedvig + Outfit"""
    
    # Pattern 1: Replace any "ZT Formom" with "Hedvig Letters Serif"
    content = content.replace('"ZT Formom"', '"Hedvig Letters Serif"')
    content = content.replace("'\"ZT Formom\"'", "'\"Hedvig Letters Serif\"'")
    content = content.replace('\\"ZT Formom\\"', '\\"Hedvig Letters Serif\\"')
    
    # Pattern 2: Replace old display fonts (Source Serif 4 only) with Hedvig
    # Only when display doesn't already have Hedvig
    if 'Hedvig Letters Serif' not in content:
        # Replace Source Serif 4 as primary display font with Hedvig
        content = re.sub(
            r'"display":\s*\[\s*"Source Serif 4",\s*"serif"\s*\]',
            r'"display": [\'"Hedvig Letters Serif"\', \'"Source Serif 4"\', "serif"]',
            content
        )
        content = re.sub(
            r'"display":\s*\{\s*"display":\s*\[\s*"Source Serif 4",\s*"serif"\s*\]',
            r'"display": [\'"Hedvig Letters Serif"\', \'"Source Serif 4"\', "serif"]',
            content
        )
    
    # Pattern 3: Update body font to Outfit if it's still Inter-only
    if '"body":' in content and 'Outfit' not in content:
        content = re.sub(
            r'"body":\s*\[\s*"Inter",\s*"sans-serif"\s*\]',
            r'"body": ["Outfit", "Inter", "sans-serif"]',
            content
        )
    
    return content

def add_hedvig_google_font(content):
    """Add Hedvig to Google Fonts link"""
    if 'Hedvig+Letters+Serif' in content:
        return content
    
    # Find Google Fonts link and add Hedvig
    pattern = r'(href="https://fonts\.googleapis\.com/css2\?[^"]*)(family=Inter[^"]*)'
    
    def replacer(match):
        base = match.group(1)
        rest = match.group(2)
        if '&family=Hedvig+Letters+Serif' not in rest:
            rest = rest + '&family=Hedvig+Letters+Serif:opsz@12..24'
        return base + rest
    
    content = re.sub(pattern, replacer, content)
    
    return content

def add_outfit_css_link(content):
    """Add Outfit CSS link if not present"""
    if 'outfit.css' in content:
        return content
    
    # Add before </head>
    content = re.sub(
        r'(\s*</head>)',
        r'    <link rel="stylesheet" href="assets/fonts/outfit.css">\n\1',
        content
    )
    
    return content

def update_html_file(filepath):
    """Update a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = update_font_config(content)
    content = add_hedvig_google_font(content)
    content = add_outfit_css_link(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔤 Comprehensive Font Update - ALL Pages")
    print("=" * 50)
    print("Updating to: Hedvig Letters Serif + Outfit")
    print()
    
    updated = 0
    for filename in html_files:
        filepath = base_path / filename
        if filepath.exists():
            if update_html_file(filepath):
                print(f"   ✅ {filename}")
                updated += 1
            else:
                print(f"   ⚪ {filename} (already up to date)")
        else:
            print(f"   ⚠️  {filename} (not found)")
    
    print(f"\n📊 Updated {updated}/{len(html_files)} files")
    print("\n🎉 ALL pages now use:")
    print("   - Headings: Hedvig Letters Serif")
    print("   - Body: Outfit")

if __name__ == '__main__':
    main()
