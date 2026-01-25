import os
from PIL import Image

def remove_background(image_path, threshold=240):
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is near white
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(image_path, "PNG")
        print(f"Processed: {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def main():
    target_dir = "assets/logos/generated"
    if not os.path.exists(target_dir):
        print(f"Directory not found: {target_dir}")
        return

    for filename in os.listdir(target_dir):
        if filename.lower().endswith(".png"):
            file_path = os.path.join(target_dir, filename)
            remove_background(file_path)

if __name__ == "__main__":
    main()
