from PIL import Image
import os
import shutil

# Ensure output directory exists
output_dir = "assets/logos"
if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir)

def split_image(filename, cols, rows, concept_name):
    print(f"Processing {filename}...")
    try:
        img = Image.open(filename)
        width, height = img.size
        cell_width = width // cols
        cell_height = height // rows
        
        count = 1
        for r in range(rows):
            for c in range(cols):
                left = c * cell_width
                top = r * cell_height
                right = left + cell_width
                bottom = top + cell_height
                
                # Crop
                # Add small margin cropping to remove border artifacts if needed? 
                # For now exact grid.
                crop = img.crop((left, top, right, bottom))
                
                # Check if crop is empty/white (optional, but good for irregular grids)
                # We save all for now.
                
                save_name = f"{output_dir}/{concept_name}_v{count}.png"
                crop.save(save_name)
                print(f"Saved {save_name}")
                count += 1
                
    except Exception as e:
        print(f"Error processing {filename}: {e}")

# Process Concept 1 (5x4)
split_image("logo_concept_1.png", 5, 4, "concept1")

# Process Concept 2 (4x3)
split_image("logo_concept_2.png", 4, 3, "concept2")

# Process Concept 3 (4x3)
split_image("logo_concept_3.png", 4, 3, "concept3")

print("Done splitting images.")
