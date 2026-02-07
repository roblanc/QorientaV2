#!/usr/bin/env python3
"""
Final fix: Replace ZT Formom with Hedvig Letters Serif in remaining files
"""
import re
from pathlib import Path

base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')

html_files = ['team.html', 'pricing.html', 'quiz.html', 'logos.html']

for filename in html_files:
    filepath = base_path / filename
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace with proper escaping
    content = content.replace(
        '\'"ZT Formom"\'',
        '\'"Hedvig Letters Serif"\''
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filename}")

print("\n🎉 Hedvig Letters Serif migration COMPLETE!")
