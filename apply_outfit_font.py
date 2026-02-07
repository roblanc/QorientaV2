#!/usr/bin/env python3
"""
Apply Outfit font for body text across all pages
"""
import re
from pathlib import Path

base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')

html_files = [
    'index.html',
    'about.html',
    'team.html',
    'pricing.html',
    'quiz.html',
    'logos.html',
]

def add_outfit_css_link(content):
    """Add Outfit CSS link to <head> if not already present"""
    if 'assets/fonts/outfit.css' in content:
        return content
    
    # Find formom.css and add outfit.css after it
    if 'assets/fonts/formom.css' in content:
        content = re.sub(
            r'(\s*<link rel="stylesheet" href="assets/fonts/formom.css">)',
            r'\1\n    <link rel="stylesheet" href="assets/fonts/outfit.css">',
            content,
            count=1
        )
    else:
        # Add before </head>
        content = re.sub(
            r'(\s*</head>)',
            r'    <link rel="stylesheet" href="assets/fonts/outfit.css">\n\1',
            content,
            count=1
        )
    
    return content

def update_tailwind_body_font(content):
    """Update Tailwind config to use Outfit for body font"""
    
    # Pattern to find the body fontFamily in tailwind.config
    # Looking for: "body": ["Inter", "sans-serif"]
    pattern = r'("body":\s*\[)[^\]]+(\])'
    
    # Replace with Outfit
    replacement = r'\1"Outfit", "Inter", sans-serif\2'
    
    content = re.sub(pattern, replacement, content)
    
    return content

def update_google_fonts_link(content):
    """Update or remove Google Fonts link for Inter (since we're using local Outfit)"""
    # We can keep Inter as fallback, or remove it
    # For now, let's keep it as fallback
    return content

def update_html_file(filepath):
    """Update a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Add Outfit CSS link
    content = add_outfit_css_link(content)
    
    # Update Tailwind config for body font
    content = update_tailwind_body_font(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("👕 Outfit Font Integration")
    print("=" * 50)
    
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
        print("   - Headings: ZT Formom (elegant)")
        print("   - Body: Outfit (modern, clean)")
    else:
        print("\n⚠️  No files were updated")

if __name__ == '__main__':
    main()
