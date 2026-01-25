import cv2
import numpy as np
import os

def extract_logos(image_path, output_dir):
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Could not load image from {image_path}")
        return

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Threshold to get black logos on white background
    _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter contours based on area to remove noise
    min_area = 1000  # Adjust as needed
    valid_contours = [cnt for cnt in contours if cv2.contourArea(cnt) > min_area]

    print(f"Found {len(valid_contours)} potential logos.")

    # Sort contours top-to-bottom, left-to-right
    # Bounding boxes (x, y, w, h)
    bounding_boxes = [cv2.boundingRect(c) for c in valid_contours]
    
    # Sort by Y first (rows), then X (columns). Using a tolerance for Y rows.
    def sort_key(bbox):
        x, y, w, h = bbox
        return (y // 100, x) # Group by integer division of Y to create "rows"

    bounding_boxes.sort(key=sort_key)

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for i, bbox in enumerate(bounding_boxes):
        x, y, w, h = bbox
        
        # Add some padding
        pad = 20
        y1 = max(0, y - pad)
        y2 = min(img.shape[0], y + h + pad)
        x1 = max(0, x - pad)
        x2 = min(img.shape[1], x + w + pad)
        
        roi = img[y1:y2, x1:x2]
        
        # Save extracted logo
        output_path = os.path.join(output_dir, f"extracted_logo_{i+1}.png")
        cv2.imwrite(output_path, roi)
        print(f"Saved: {output_path}")

if __name__ == "__main__":
    # Install cv2 if not present: pip install opencv-python-headless
    image_path = "/Users/robertdumitriu/.gemini/antigravity/brain/1986eb52-4ae1-456a-b207-e7b28c89f17f/uploaded_media_1769355320302.jpg"
    output_dir = "assets/logos/generated/extracted"
    extract_logos(image_path, output_dir)
