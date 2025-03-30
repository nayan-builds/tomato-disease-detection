import os
import time
import sys
from PIL import Image, ImageTk
import tkinter as tk

def display_images(directory):
    # Get all image files in the directory
    image_files = [f for f in os.listdir(directory) if f.lower().endswith(('png', 'jpg', 'jpeg', 'gif', 'bmp'))]
    if not image_files:
        print("No image files found in the specified directory.")
        return

    # Create tkinter window
    window = tk.Tk()
    window.title("Image Slideshow")

    label = tk.Label(window)
    label.pack(fill=tk.BOTH, expand=True)

    def show_image(index):
        if index < len(image_files):
            image_path = os.path.join(directory, image_files[index])
            image = Image.open(image_path)

            # Get window dimensions
            window.update_idletasks()
            window_width = window.winfo_width()
            window_height = window.winfo_height()

            # Maintain aspect ratio
            img_ratio = image.width / image.height
            window_ratio = window_width / window_height

            if img_ratio > window_ratio:
                new_width = window_width
                new_height = int(window_width / img_ratio)
            else:
                new_height = window_height
                new_width = int(window_height * img_ratio)

            image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(image)
            
            label.config(image=photo)
            label.image = photo
            
            window.after(3000, show_image, index + 1)  # Show next image after 3 seconds
        else:
            window.destroy()

    show_image(0)
    window.geometry("800x600")  # Initial window size
    window.mainloop()

if len(sys.argv) != 2:
    print("Usage: python slideshow_images.py <path_to_directory>")
else:
    directory_path = sys.argv[1]
    display_images(directory_path)
