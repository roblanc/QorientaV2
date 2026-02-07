#!/usr/bin/env python3
"""
Fix Hedvig Letters Serif - add escaped quotes for multi-word font name
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

def fix_hedvig_quotes(content):
    """Add escaped quotes around Hedvig Letters Serif"""
    
    # Fix display font - add quotes
    content = re.sub(
        r'"display":\s*\["Hedvig Letters Serif",\s*"Source Serif 4",\s*"serif"\]',
        r'"display": [\'"Hedvig Letters Serif"\', \'"Source Serif 4"\', "serif"]',
        content
    )
    
    return content

def update_html_file(filepath):
    """Update a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = fix_hedvig_quotes(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔧 Fixing Hedvig Letters Serif - Adding Quotes")
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
        print("\n🎉 Quote fix applied!")
        print("   Hedvig Letters Serif will now load correctly")
        print("   Hard refresh: Cmd+Shift+R")

if __name__ == '__main__':
    main()
