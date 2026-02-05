import os

files = [
    "about.html", "contact.html", "legal.html", "logos.html", 
    "pricing.html", "quiz.html", "resources.html", "soon.html", "team.html"
]

old_font_url = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
new_font_url = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600;8..60,700;8..60,800&display=swap'

old_display = '"display": ["Outfit", "sans-serif"]'
new_display = '"display": ["Source Serif 4", "serif"]'

old_body = '"body": ["Plus Jakarta Sans", "sans-serif"]'
new_body = '"body": ["Inter", "sans-serif"]'

for f in files:
    if os.path.exists(f):
        with open(f, 'r') as file:
            content = file.read()
        
        # Replace URL
        new_content = content.replace(old_font_url, new_font_url)
        
        # Replace Config
        new_content = new_content.replace(old_display, new_display)
        new_content = new_content.replace(old_body, new_body)
        
        if new_content != content:
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Updated {f}")
        else:
            print(f"No changes needed or pattern not found in {f}")
    else:
        print(f"File not found: {f}")
