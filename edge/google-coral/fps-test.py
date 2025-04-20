import argparse
import os
import time
from PIL import Image
import numpy as np
from pycoral.utils.edgetpu import make_interpreter
from pycoral.adapters import common

def load_image(path, size):
    image = Image.open(path).convert('RGB').resize(size)
    return image

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def run_yolo_inference(interpreter, image, conf_thresh=0.4):
    common.set_input(interpreter, image)
    start_time = time.perf_counter()
    interpreter.invoke()
    inference_time = time.perf_counter() - start_time

    output_details = interpreter.get_output_details()[0]
    output = interpreter.get_tensor(output_details['index'])[0]  # shape: (N, 7) or similar

    detections = []
    for pred in output:
        x, y, w, h = pred[0:4]
        objectness = sigmoid(pred[4])
        class_scores = pred[5:]
        class_id = np.argmax(class_scores)
        class_conf = sigmoid(class_scores[class_id])
        score = objectness * class_conf

        if score >= conf_thresh:
            detections.append({
                'bbox': [x, y, w, h],
                'score': score,
                'class_id': class_id
            })

    return detections, inference_time

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', required=True, help='Path to EdgeTPU-compiled .tflite model')
    parser.add_argument('--source', required=True, help='Path to folder with images')
    args = parser.parse_args()

    interpreter = make_interpreter(args.model)
    interpreter.allocate_tensors()
    input_w, input_h = common.input_size(interpreter)

    image_paths = [os.path.join(args.source, f) for f in os.listdir(args.source)
                   if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

    if not image_paths:
        print("No images found.")
        return

    total_time = 0.0
    for i, path in enumerate(image_paths):
        image = load_image(path, (input_w, input_h))
        detections, inf_time = run_yolo_inference(interpreter, image)
        total_time += inf_time

        print(f"[{i+1}/{len(image_paths)}] {os.path.basename(path)}: "
              f"{len(detections)} objects, {inf_time:.4f} sec")

    avg_fps = len(image_paths) / total_time
    print(f"\n✅ Inference complete. Average FPS: {avg_fps:.2f}")

if __name__ == '__main__':
    main()
