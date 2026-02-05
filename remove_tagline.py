import os
import re

files = ["about.html", "pricing.html", "team.html", "quiz.html", "soon.html", "logos.html"]

def update_file(filepath):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (not found)")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Regex to find the tagline span (robust against whitespace)
    # Pattern: <span class="...text-slate-500...">Găsește-ți Nordul[\s\S]*?Profesional</span>
    # And remove it.
    
    # Also update QOrienta text size to 2xl
    content = content.replace('text-xl tracking-tight text-primary', 'text-2xl tracking-tight text-primary')
    
    # Remove tagline
    # This specific block usually follows the QOrienta span.
    # We can try to replace the whole block if possible, or just the span.
    
    # Pattern matching the span precisely as seen in common files
    pattern = r'<span class="text-\[10px\] md:text-xs text-slate-500 font-medium tracking-wide">\s*Găsește-ți Nordul\s*Profesional</span>'
    
    new_content = re.sub(pattern, '', content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No match in {filepath}")

for f in files:
    update_file(f)
