import argparse
import os
import time
from PIL import Image
from pycoral.adapters.common import input_size
from pycoral.adapters.detect import get_objects
from pycoral.utils.edgetpu import make_interpreter
from pycoral.adapters import common

def load_image(path, target_size):
    image = Image.open(path).convert('RGB').resize(target_size)
    return image

def run_inference(interpreter, image):
    common.set_input(interpreter, image)
    start_time = time.perf_counter()
    interpreter.invoke()
    inference_time = time.perf_counter() - start_time
    objs = get_objects(interpreter, score_threshold=0.4)
    return objs, inference_time

def main():
    parser = argparse.ArgumentParser(description='YOLO inference on Coral Edge TPU.')
    parser.add_argument('--model', type=str, required=True, help='Path to .tflite model file (compiled for Edge TPU)')
    parser.add_argument('--source', type=str, required=True, help='Path to folder containing input images')
    args = parser.parse_args()

    if not os.path.isfile(args.model):
        print(f"Error: model file '{args.model}' not found.")
        return
    if not os.path.isdir(args.source):
        print(f"Error: source folder '{args.source}' not found.")
        return

    # Load model
    interpreter = make_interpreter(args.model)
    interpreter.allocate_tensors()
    size = input_size(interpreter)

    # Get image paths
    image_paths = [os.path.join(args.source, f) for f in os.listdir(args.source)
                   if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    if not image_paths:
        print("No image files found in the source folder.")
        return

    total_time = 0.0
    for i, image_path in enumerate(image_paths):
        image = load_image(image_path, size)
        objs, inf_time = run_inference(interpreter, image)
        total_time += inf_time

        print(f"[{i+1}/{len(image_paths)}] {os.path.basename(image_path)}: "
              f"{len(objs)} objects, {inf_time:.4f} sec")

    avg_fps = len(image_paths) / total_time if total_time > 0 else 0
    print(f"\n✅ Inference complete. Average FPS: {avg_fps:.2f}")

if __name__ == '__main__':
    main()
