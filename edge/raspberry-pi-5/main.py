import cv2
import time
import os
import sys
import argparse
from ultralytics import YOLO
from notify.notifications import send_push_notification
from gps.randomcoordinatess import get_random_coordinates

# --- Parse command-line arguments ---
parser = argparse.ArgumentParser(description="YOLO detection with push notifications.")
parser.add_argument("--model", type=str, default="models/yolo11n_trained_ncnn_model",
                    help="Path to YOLO model (default: ../models/yolo11n_trained_ncnn_model)")

args = parser.parse_args()
model_path = args.model

# Validate model path
if not os.path.exists(model_path):
    print(f"❌ Error: Model not found at {model_path}")
    sys.exit(1)

# Initialize YOLO model
model = YOLO(model_path)

# Open webcam
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

# FPS tracking
fps = 0.0
frame_count = 0
start_time = time.time()

# Detection tracking
cooldown_seconds = 3
class_cooldowns = {}
detected_data = []

# Push timing
last_push_time = time.time()
push_interval = 60  # 1 minute in seconds

# Main loop
while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture image")
        break

    results = model(frame)

    current_time = time.time()

    for result in results:
        for box in result.boxes:
            class_id = int(box.cls)
            class_name = model.names[class_id]

            # Skip if class is "Healthy"
            if class_name == "Healthy":
                continue

            # Cooldown check
            last_detected = class_cooldowns.get(class_name, 0)
            if current_time - last_detected >= cooldown_seconds:
                print(f"Detected: {class_name}")
                gps_coords = get_random_coordinates()

                # Add to data
                detected_data.append({
                    "class": class_name,
                    "gps": gps_coords,
                    "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
                })

                # Start cooldown for this class
                class_cooldowns[class_name] = current_time

    # Draw results
    annotated_frame = results[0].plot()

    # FPS calculation
    frame_count += 1
    elapsed_time = time.time() - start_time
    if elapsed_time > 0:
        fps = frame_count / elapsed_time

    cv2.putText(annotated_frame, f"FPS: {fps:.2f}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow('YOLO11 Real-Time Inference', annotated_frame)

    # Send push notification every 5 minutes if data exists
    if current_time - last_push_time >= push_interval and detected_data:
        print("Sending push notification with detected data...")
        send_push_notification(
            title="Tomato Disease Alert",
            body=f"{len(detected_data)} detections in last 5 minutes",
            data={"detections": detected_data}
        )
        detected_data.clear()
        last_push_time = current_time

    # Exit on 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
