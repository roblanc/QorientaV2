#!/usr/bin/env python3
"""
Fix Tailwind font configuration syntax across all pages
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

def fix_tailwind_font_config(content):
    """Fix the fontFamily config to properly quote serif and sans-serif"""
    
    # Fix display font
    content = re.sub(
        r'"display":\s*\["ZT Formom",\s*"Source Serif 4",\s*serif\]',
        r'"display": ["ZT Formom", "Source Serif 4", "serif"]',
        content
    )
    
    # Fix body font
    content = re.sub(
        r'"body":\s*\["Outfit",\s*"Inter",\s*sans-serif\]',
        r'"body": ["Outfit", "Inter", "sans-serif"]',
        content
    )
    
    return content

def update_html_file(filepath):
    """Update a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = fix_tailwind_font_config(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔧 Fixing Tailwind Font Configuration")
    print("=" * 50)
    
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
        print("\n🎉 Configuration fixed!")
        print("   Hard refresh your browser (Cmd+Shift+R) to see changes")

if __name__ == '__main__':
    main()
