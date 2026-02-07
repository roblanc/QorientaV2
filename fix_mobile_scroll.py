#!/usr/bin/env python3
"""
Fix horizontal scroll issue on mobile by updating overflow and aurora blob styles
"""
import re
from pathlib import Path

# Files to update (excluding backups and originals)
files_to_update = [
    'quiz.html',
    'pricing.html',
    'about.html',
    'team.html',
]

def fix_html_file(filepath):
    """Fix overflow and aurora blob issues in an HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix 1: Add html overflow-x rule if not present
    if 'html {' not in content or 'html {\n            overflow-x: hidden;' not in content:
        # Find the closing of :root and add html rule
        content = re.sub(
            r'(\s+)(})\s+(body\s*{)',
            r'\1\2\n\n\1html {\n\1    overflow-x: hidden;\n\1    max-width: 100vw;\n\1}\n\n\1\3',
            content
        )
    
    # Fix 2: Add overflow-x to body if not present
    body_pattern = r'(body\s*{\s*(?:background-color:[^}]*?)?)(})'
    if 'overflow-x: hidden;' not in content.split('body {')[1].split('}')[0]:
        content = re.sub(
            r'(body\s*{[^}]*?)(color:\s*[^;]+;)',
            r'\1\2\n            overflow-x: hidden;\n            max-width: 100vw;',
            content
        )
    
    # Fix 3: Update aurora-blob width/height to responsive
    content = re.sub(
        r'(\.aurora-blob\s*{[^}]*?width:\s*)(\d+px)(;[^}]*?height:\s*)(\d+px)(;)',
        lambda m: f'{m.group(1)}min({m.group(2)}, 150vw){m.group(3)}min({m.group(4)}, 150vw){m.group(5)}',
        content
    )
    
    # Fix 4: Add max-width to aurora-blob
    content = re.sub(
        r'(\.aurora-blob\s*{[^}]*?filter:\s*blur\([^)]+\);)',
        r'\1\n            max-width: 900px;',
        content
    )
    
    # Fix 5: Update aurora-blob-2 width/height to responsive
    content = re.sub(
        r'(\.aurora-blob-2\s*{[^}]*?width:\s*)(\d+px)(;[^}]*?height:\s*)(\d+px)(;)',
        lambda m: f'{m.group(1)}min({m.group(2)}, 140vw){m.group(3)}min({m.group(4)}, 140vw){m.group(5)}',
        content
    )
    
    # Fix 6: Add max-width to aurora-blob-2
    content = re.sub(
        r'(\.aurora-blob-2\s*{[^}]*?filter:\s*blur\([^)]+\);)',
        r'\1\n            max-width: 800px;',
        content
    )
    
    # Fix 7: Update aurora-blob-3 if present (only in some files)
    if '.aurora-blob-3' in content:
        content = re.sub(
            r'(\.aurora-blob-3\s*{[^}]*?width:\s*)(\d+px)(;[^}]*?height:\s*)(\d+px)(;)',
            lambda m: f'{m.group(1)}min({m.group(2)}, 120vw){m.group(3)}min({m.group(4)}, 120vw){m.group(5)}',
            content
        )
        content = re.sub(
            r'(\.aurora-blob-3\s*{[^}]*?filter:\s*blur\([^)]+\);)',
            r'\1\n            max-width: 600px;',
            content
        )
    
    # Only write if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')
    
    updated_count = 0
    for filename in files_to_update:
        filepath = base_path / filename
        if filepath.exists():
            if fix_html_file(filepath):
                print(f'✅ Fixed: {filename}')
                updated_count += 1
            else:
                print(f'⚠️  No changes needed: {filename}')
        else:
            print(f'❌ Not found: {filename}')
    
    print(f'\n📊 Updated {updated_count}/{len(files_to_update)} files')

if __name__ == '__main__':
    main()
