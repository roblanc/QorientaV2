#!/usr/bin/env python3
"""
Replace ZT Formom with Hedvig Letters Serif from Google Fonts
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

def add_hedvig_font_link(content):
    """Add Google Fonts link for Hedvig Letters Serif"""
    
    # Check if already added
    if 'Hedvig+Letters+Serif' in content:
        return content
    
    # Find the existing Google Fonts link and add Hedvig to it
    # Pattern: Find the Inter + Source Serif link
    pattern = r'(href="https://fonts\.googleapis\.com/css2\?family=Inter[^"]+)(")'
    
    # Add Hedvig Letters Serif to the font list
    replacement = r'\1&family=Hedvig+Letters+Serif:opsz@12..24\2'
    
    content = re.sub(pattern, replacement, content)
    
    return content

def update_tailwind_config(content):
    """Update Tailwind config to use Hedvig Letters Serif"""
    
    # Replace ZT Formom with Hedvig Letters Serif in display font
    pattern = r'"display":\s*\[[\'"]?\"?ZT Formom\"?[\'"]?,\s*[\'"]?\"?Source Serif 4\"?[\'"]?,\s*"serif"\]'
    
    replacement = r'"display": ["Hedvig Letters Serif", "Source Serif 4", "serif"]'
    
    content = re.sub(pattern, replacement, content)
    
    return content

def remove_formom_css_link(content):
    """Remove the local ZT Formom CSS link (no longer needed)"""
    
    # Remove formom.css link
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
    
    # Add Hedvig font link
    content = add_hedvig_font_link(content)
    
    # Update Tailwind config
    content = update_tailwind_config(content)
    
    # Remove old formom CSS link
    content = remove_formom_css_link(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔄 Replacing ZT Formom with Hedvig Letters Serif")
    print("=" * 50)
    print("Switching to Google Fonts for better performance...")
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
        print("\n🎉 Font switch complete!")
        print("   Headings now use: Hedvig Letters Serif (Google Fonts)")
        print("   Body still uses: Outfit (local)")
        print("   Hard refresh browser to see changes!")

if __name__ == '__main__':
    main()
