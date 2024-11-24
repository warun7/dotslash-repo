import torch
import ultralytics
from ultralytics import YOLO
import os
import numpy as np
from PIL import Image
from pathlib import Path
import cv2
from ultralytics import YOLO  # For YOLOv11
from flask import request

class YOLOv11Detector:
    def __init__(self, weights_path, base_output_dir):
        """
        Initialize YOLOv11 detector

        Args:
            weights_path (str): Path to YOLOv11 weights
            base_output_dir (str): Base directory for outputs
        """
        self.model = self._load_model(weights_path)
        self.base_output_dir = base_output_dir
        os.makedirs(base_output_dir, exist_ok=True)

    def _load_model(self, weights_path):
        """Load YOLOv11 model with specified weights"""
        model = YOLO(weights_path)
        model.conf = 0.25  # confidence threshold
        model.iou = 0.45   # NMS IoU threshold
        return model

    def create_output_directory(self, image_name):
        """Create output directory structure for an image"""
        image_dir = os.path.join(self.base_output_dir, image_name)
        os.makedirs(image_dir, exist_ok=True)
        return image_dir
    
    def draw_boxes(self, image, detections):
        """Draw bounding boxes and confidence scores on image"""
        img = np.array(image)
        boxes = detections.boxes.data.cpu().numpy()

        for box in boxes:
            x1, y1, x2, y2 = map(int, box[:4])
            conf = box[4]

            # Draw rectangle
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # Add confidence score
            conf_text = f'{conf:.2f}'
            cv2.putText(img, conf_text, (x1, y1-10),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        return Image.fromarray(img)

    def crop_detections(self, image, detections, output_dir, image_name):
        """Crop and save detected products"""
        saved_paths = []

        # Get detections
        boxes = detections.boxes.data.cpu().numpy()

        for i, box in enumerate(boxes):
            x1, y1, x2, y2 = map(int, box[:4])

            # Crop detection
            cropped = image.crop((x1, y1, x2, y2))

            # Save cropped image
            save_path = os.path.join(output_dir, f"{image_name}_P_{i+1}.jpg")
            cropped.save(save_path)
            saved_paths.append(save_path)

        return saved_paths
    
    #  def filter_non_products(self, image_path, min_size=50, aspect_ratio_range=(0.5, 2.0)):
    #     """Filter out likely non-product images"""
    #     img = Image.open(image_path)
    #     width, height = img.size

    #     if width < min_size or height < min_size:
    #         return False

    #     aspect_ratio = width / height
    #     if not (aspect_ratio_range[0] <= aspect_ratio <= aspect_ratio_range[1]):
    #         return False

    #     return True

    def process_image(self, image_path):
        """Process single image with YOLOv11"""
        try:
            # Load image
            image = Image.open(image_path)
            image_name = Path(image_path).stem

            print(f"Processing {image_name}...")

            # Create output directory
            output_dir = self.create_output_directory(image_name)

            # Detect products
            detections = self.model(image)[0]

            # Save image with bounding boxes
            bb_image = self.draw_boxes(image, detections)
            bb_path = os.path.join(output_dir, f"{image_name}_BB.jpg")
            bb_image.save(bb_path)

            # Crop and save individual products
            cropped_paths = self.crop_detections(image, detections, output_dir, image_name)

            print(f"Finished processing {image_name}")
            print(f"Detected {len(cropped_paths)} products")

            return bb_path, cropped_paths  # Return annotated image path and cropped paths

        except Exception as e:
            print(f"Error in process_image: {str(e)}")
            raise
    def process_directory(self, input_dir):
        """Process all images in directory"""
        total_images = len([f for f in os.listdir(input_dir)
                          if f.lower().endswith(('.jpg', '.jpeg'))])
        processed = 0

        print(f"Found {total_images} images to process")

        for image_file in os.listdir(input_dir):
            if image_file.lower().endswith(('.jpg', '.jpeg')):
                image_path = os.path.join(input_dir, image_file)
                self.process_image(image_path)
                processed += 1
                print(f"Progress: {processed}/{total_images} images processed")

def main():
    # Configuration
    input_dir = request.files['image']  # Get image from frontend
    base_output_dir = "YOLOv11_results"
    yolov11_weights = "./YOLOv11_SKU.pt"

    # Initialize detector
    detector = YOLOv11Detector(
        weights_path=yolov11_weights,
        base_output_dir=base_output_dir
    )

    # Process image
    detector.process_image(input_dir)

if __name__ == "__main__":
    main()