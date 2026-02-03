from PIL import Image, ImageOps
import numpy as np

def process_image():
    input_path = "assets/journey_illustration_v2.png"
    output_path = "assets/journey_illustration_v2_transparent.png"
    
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        # Simple threshold for white background
        for item in datas:
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                # Fade out white pixels instead of hard cut
                # Calculate alpha based on how "white" it is
                avg = (item[0] + item[1] + item[2]) / 3
                alpha = int(255 - ((avg - 240) * 17)) # 240->255 scales to alpha 255->0 roughly
                if alpha < 0: alpha = 0
                newData.append((item[0], item[1], item[2], alpha))
            else:
                newData.append(item)
        
        img.putdata(newData)
        
        # Add a soft radial alpha mask to fade edges
        width, height = img.size
        center_x, center_y = width / 2, height / 2
        max_dist = min(width, height) / 2 * 0.9 # 90% of radius
        
        pixels = img.load()
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                # Calculate distance from center
                dist = ((x - center_x)**2 + (y - center_y)**2)**0.5
                
                # Apply vignette fade at edges
                if dist > max_dist:
                    factor = 1.0 - (dist - max_dist) / (min(width, height) / 2 - max_dist + 1)
                    factor = max(0, min(1, factor))
                    pixels[x, y] = (r, g, b, int(a * factor))
                    
        img.save(output_path, "PNG")
        print(f"Successfully processed image to {output_path}")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    process_image()
