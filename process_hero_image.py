from rembg import remove
from PIL import Image
import io
import os

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    
    try:
        with open(input_path, 'rb') as i:
            input_data = i.read()
            output_data = remove(input_data)
            
        with open(output_path, 'wb') as o:
            o.write(output_data)
            
        print(f"Successfully saved to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    input_file = "assets/image-2.jpg"
    output_file = "assets/QOrienta_hero_transparent.png"
    
    if os.path.exists(input_file):
        process_image(input_file, output_file)
    else:
        print(f"Input file not found: {input_file}")
