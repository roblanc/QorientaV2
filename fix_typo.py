import os

files = ["about.html", "pricing.html", "team.html", "index.html", "quiz.html", "soon.html"]

target = "Test Vocacional"
replacement = "Test Vocațional"

for f in files:
    if os.path.exists(f):
        with open(f, 'r') as file:
            content = file.read()
        
        if target in content:
            new_content = content.replace(target, replacement)
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Fixed typo in {f}")
        else:
            print(f"Target not found in {f}")
