#!/usr/bin/env python3
"""
Fix logo visibility on mobile across all pages
"""
import re
from pathlib import Path

files_to_update = [
    'about.html',
    'team.html',
    'pricing.html',
    'quiz.html',
]

logo_script_replacement = '''            // Live Logo Preview Script
            (function () {
                const defaultLogo = 'assets/logos/generated/child_bear/child_book_1.png';
                const savedLogo = sessionStorage.getItem('qorienta_selected_logo') || localStorage.getItem('qorienta_selected_logo') || defaultLogo;
                
                function setLogo(logoPath) {
                    // Update Navbar Logo
                    const navLogo = document.getElementById('logo-icon-wrapper');
                    if (navLogo) {
                        navLogo.className = 'w-12 h-12 md:w-10 md:h-10 flex items-center justify-center transition-transform group-hover:scale-110';
                        const img = new Image();
                        img.onload = function() {
                            navLogo.innerHTML = `<img src="${logoPath}" class="w-full h-full object-contain filter drop-shadow-sm" alt="QOrienta Logo">`;
                        };
                        img.onerror = function() {
                            console.warn('Logo failed to load:', logoPath, '- using default');
                            if (logoPath !== defaultLogo) {
                                navLogo.innerHTML = `<img src="${defaultLogo}" class="w-full h-full object-contain filter drop-shadow-sm" alt="QOrienta Logo">`;
                                sessionStorage.removeItem('qorienta_selected_logo');
                                localStorage.removeItem('qorienta_selected_logo');
                            } else {
                                navLogo.innerHTML = `<span class="text-primary font-bold text-xl">Q</span>`;
                            }
                        };
                        img.src = logoPath;
                    }

                    // Update Footer Logo
                    const footerLogo = document.getElementById('footer-logo-icon-wrapper');
                    if (footerLogo) {
                        footerLogo.className = 'w-8 h-8 flex items-center justify-center cursor-default select-none';
                        const footerImg = new Image();
                        footerImg.onload = function() {
                            footerLogo.innerHTML = `<img src="${logoPath}" class="w-full h-full object-contain filter drop-shadow-sm" alt="QOrienta Logo">`;
                        };
                        footerImg.onerror = function() {
                            footerLogo.innerHTML = `<img src="${defaultLogo}" class="w-full h-full object-contain filter drop-shadow-sm" alt="QOrienta Logo">`;
                        };
                        footerImg.src = logoPath;
                    }
                }
                
                setLogo(savedLogo);'''

def fix_logo_script(filepath):
    """Fix logo preview script in HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Find and replace the Live Logo Preview Script section
    # Pattern to match the old script
    pattern = r'(\s+// Live Logo Preview Script\s+\(function \(\) \{[\s\S]*?const savedLogo = (?:sessionStorage\.getItem|localStorage\.getItem)[^}]*?\}\s*?\})'
    
    if '// Live Logo Preview Script' in content:
        # More aggressive pattern - find the entire function
        pattern2 = r'([ \t]+)// Live Logo Preview Script\s+\(function \(\) \{[^}]*?const defaultLogo[^}]*?const savedLogo[^}]*?if \(savedLogo\) \{[^}]*?navLogo[^}]*?\}[^}]*?footerLogo[^}]*?\}[^}]*?\}\s*?\})'
        
        def replace_func(match):
            indent = match.group(1) if match.lastindex >= 1 else '            '
            return logo_script_replacement
        
        content = re.sub(pattern2, replace_func, content, flags=re.DOTALL)
    
    # Also update the hardcoded logo size in HTML if present
    content = re.sub(
        r'(<div id="logo-icon-wrapper"\s+class=")w-10 h-10',
        r'\1w-12 h-12 md:w-10 md:h-10',
        content
    )
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    base_path = Path('/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2')
    
    updated = 0
    for filename in files_to_update:
        filepath = base_path / filename
        if filepath.exists():
            if fix_logo_script(filepath):
                print(f'✅ Fixed: {filename}')
                updated += 1
            else:
                print(f'⚠️  No changes: {filename}')
        else:
            print(f'❌ Not found: {filename}')
    
    print(f'\n📊 Updated {updated}/{len(files_to_update)} files')

if __name__ == '__main__':
    main()
