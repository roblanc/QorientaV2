#!/usr/bin/env python3
"""
Replace any serif font with Hedvig Letters Serif (with proper quotes)
"""
import re
from pathlib import Path

base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')

html_files = [
    'about.html',
    'team.html',
    'pricing.html',
    'quiz.html',
    'logos.html',
]

def replace_display_font(content):
    """Replace ZT Formom or any display font with Hedvig Letters Serif"""
    
    # Pattern to match any display font configuration
    patterns = [
        # Pattern 1: ZT Formom with quotes
        (r'"display":\s*\[[\'"]?\\"?ZT Formom\\"?[\'"]?,\s*[\'"]?\\"?Source Serif 4\\"?[\'"]?,\s*["\']serif["\']\]',
         r'"display": [\'"Hedvig Letters Serif"\', \'"Source Serif 4"\', "serif"]'),
        
        # Pattern 2: Regular without escaped quotes
        (r'"display":\s*\["Hedvig Letters Serif",\s*"Source Serif 4",\s*"serif"\]',
         r'"display": [\'"Hedvig Letters Serif"\', \'"Source Serif 4"\', "serif"]'),
    ]
    
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content)
    
    return content

def add_hedvig_to_google_fonts(content):
    """Add Hedvig to Google Fonts link if not present"""
    if 'Hedvig+Letters+Serif' in content:
        return content
    
    # Find Google Fonts link and add Hedvig
    pattern = r'(href="https://fonts\.googleapis\.com/css2\?family=Inter[^"]+)(")'
    replacement = r'\1&family=Hedvig+Letters+Serif:opsz@12..24\2'
    content = re.sub(pattern, replacement, content)
    
    return content

def remove_formom_link(content):
    """Remove formom.css link"""
    content = re.sub(
        r'\s*<link rel="stylesheet" href="assets/fonts/formom\.css">\n?',
        '',
        content
    )
    return content

def update_html_file(filepath):
    """Update a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = replace_display_font(content)
    content = add_hedvig_to_google_fonts(content)
    content = remove_formom_link(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔄 Completing Hedvig Letters Serif Migration")
    print("=" * 50)
    
    updated = 0
    for filename in html_files:
        filepath = base_path / filename
        if filepath.exists():
            if update_html_file(filepath):
                print(f"   ✅ {filename}")
                updated += 1
            else:
                print(f"   ⚪ {filename}")
        else:
            print(f"   ⚠️  {filename} (not found)")
    
    print(f"\n📊 Updated {updated}/{len(html_files)} files")
    print("\n🎉 ALL pages now use Hedvig Letters Serif!")

if __name__ == '__main__':
    main()
