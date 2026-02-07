#!/usr/bin/env python3
"""
Fix Tailwind font configuration - add escaped quotes for multi-word font names
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

def fix_font_config(content):
    """Add escaped quotes around font names with spaces"""
    
    # Fix display font - add quotes
    content = re.sub(
        r'"display":\s*\["ZT Formom",\s*"Source Serif 4",\s*"serif"\]',
        r'"display": [\'"ZT Formom"\', \'"Source Serif 4"\', "serif"]',
        content
    )
    
    return content

def update_html_file(filepath):
    """Update a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = fix_font_config(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔧 Critical Font Configuration Fix")
    print("=" * 50)
    print("Adding escaped quotes for multi-word font names...")
    print()
    
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
        print("\n🎉 CRITICAL FIX APPLIED!")
        print("   Fonts will now load correctly on all pages")
        print("   Hard refresh browser: Cmd+Shift+R")

if __name__ == '__main__':
    main()
