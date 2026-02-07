#!/usr/bin/env python3
"""
Apply ZT Formom font to QOrienta website
Run this AFTER placing font files in assets/fonts/
"""
import re
from pathlib import Path

base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')

# HTML files to update
html_files = [
    'index.html',
    'about.html',
    'team.html',
    'pricing.html',
    'quiz.html',
    'logos.html',
]

def add_font_link(content):
    """Add font CSS link to <head> if not already present"""
    if 'assets/fonts/formom.css' in content:
        return content
    
    # Find </head> and insert before it
    font_link = '    <link rel="stylesheet" href="assets/fonts/formom.css">\n'
    content = re.sub(
        r'(\s*</head>)',
        f'{font_link}\\1',
        content,
        count=1
    )
    return content

def update_tailwind_config(content):
    """Update Tailwind config to use ZT Formom for display font"""
    
    # Pattern to find the fontFamily section in tailwind.config
    pattern = r'(fontFamily:\s*\{[^}]*"display":\s*\[)[^\]]+(\])'
    
    # Replace with ZT Formom
    replacement = r'\1"ZT Formom", "Source Serif 4", serif\2'
    
    content = re.sub(pattern, replacement, content)
    
    return content

def update_html_file(filepath):
    """Update a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Add font link
    content = add_font_link(content)
    
    # Update Tailwind config
    content = update_tailwind_config(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def check_font_files():
    """Check if font files exist"""
    fonts_dir = base_path / 'assets' / 'fonts'
    required_files = ['ZT-Formom-Regular.ttf']
    
    missing = []
    for font_file in required_files:
        if not (fonts_dir / font_file).exists():
            missing.append(font_file)
    
    return missing

def main():
    print("🔤 ZT Formom Font Integration")
    print("=" * 50)
    
    # Check if font files exist
    print("\n📂 Checking font files...")
    missing = check_font_files()
    
    if missing:
        print(f"\n❌ Missing font files:")
        for f in missing:
            print(f"   - assets/fonts/{f}")
        print("\n⚠️  Please download and place font files first!")
        print("   See: FORMOM_FONT_GUIDE.md")
        return
    
    print("✅ Font files found!")
    
    # Update HTML files
    print("\n🔧 Updating HTML files...")
    updated = 0
    
    for filename in html_files:
        filepath = base_path / filename
        if filepath.exists():
            if update_html_file(filepath):
                print(f"   ✅ {filename}")
                updated += 1
            else:
                print(f"   ⚪ {filename} (no changes)")
        else:
            print(f"   ⚠️  {filename} (not found)")
    
    print(f"\n📊 Updated {updated}/{len(html_files)} files")
    
    if updated > 0:
        print("\n🎉 Font integration complete!")
        print("   - Headings now use: ZT Formom")
        print("   - Body text uses: Inter")
    else:
        print("\n⚠️  No files were updated")

if __name__ == '__main__':
    main()
