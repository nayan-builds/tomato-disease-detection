import time
import argparse
from ultralytics import YOLO
import cv2
import os

def run_inference(model_path, image_folder):
    # Load the YOLO model
    model = YOLO(model_path)

    # List all images in the folder
    image_files = [f for f in os.listdir(image_folder) if f.lower().endswith(('png', 'jpg', 'jpeg'))]
    if not image_files:
        print("No images found in the specified folder.")
        return

    total_time = 0.0
    total_images = len(image_files)

    for image_file in image_files:
        image_path = os.path.join(image_folder, image_file)
        image = cv2.imread(image_path)
        if image is None:
            print(f"Failed to load image: {image_file}")
            continue

        # Perform inference
        start_time = time.time()
        results = model(image)
        elapsed_time = time.time() - start_time
        total_time += elapsed_time

        # Extract and print detected classes
        print(f"Results for {image_file}:")
        for result in results:
            for box in result.boxes:
                class_name = result.names[int(box.cls)]
                print(f"  Class: {class_name}, Confidence: {box.conf:.2f}")

    # Calculate and print average FPS
    avg_fps = total_images / total_time if total_time > 0 else 0
    print(f"\nProcessed {total_images} images in {total_time:.2f} seconds.")
    print(f"Average FPS: {avg_fps:.2f}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run YOLO inference on test images.")
    parser.add_argument('--model', type=str, required=True, help='Path to the YOLO model (.pt)')
    parser.add_argument('--source', type=str, required=True, help='Path to the folder containing test images')

    args = parser.parse_args()
    run_inference(args.model, args.source)
