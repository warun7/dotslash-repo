from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from utils.yolo_detector import YOLOv11Detector
import base64

app = Flask(__name__)

# Allow all origins for debugging purposes
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'
RESULTS_FOLDER = 'results'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

detector = YOLOv11Detector(
    weights_path="./utils/YOLOv11_SKU.pt",
    base_output_dir=RESULTS_FOLDER
)

@app.route('/api/detect', methods=['POST'])
def detect_products():
    print("=== Starting request processing ===")
    if 'image' not in request.files:
        print("No image in request files")
        return jsonify({'error': 'No image provided'}), 400
        
    file = request.files['image']
    print(f"Received file: {file.filename}")
    if file.filename == '':
        print("Empty filename received")
        return jsonify({'error': 'No selected file'}), 400
        
    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        print(f"Saving file to: {filepath}")
        file.save(filepath)
        
        print("Starting image processing...")
        results, processed_image_path = detector.process_image(filepath)
        print(f"Processing complete. Results: {results}")
        
        print("Converting image to base64...")
        with open(processed_image_path, "rb") as img_file:
            processed_image = base64.b64encode(img_file.read()).decode('utf-8')
        
        print("Cleaning up files...")
        if os.path.exists(filepath):
            os.remove(filepath)
        if os.path.exists(processed_image_path):
            os.remove(processed_image_path)
        
        print("Sending response...")
        return jsonify({
            'processed_image': f"data:image/jpeg;base64,{processed_image}",
            'detected_products': results
        })
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        if os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({'error': f'Failed to process image: {str(e)}'}), 500