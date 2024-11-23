from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from utils.yolo_detector import YOLOv11Detector
import base64

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

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
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    try:
        # Process image and get results
        results, processed_image_path = detector.process_image(filepath)
        
        # Convert processed image to base64
        with open(processed_image_path, "rb") as img_file:
            processed_image = base64.b64encode(img_file.read()).decode('utf-8')
        
        # Clean up files
        if os.path.exists(filepath):
            os.remove(filepath)
        if os.path.exists(processed_image_path):
            os.remove(processed_image_path)
        
        return jsonify({
            'processed_image': f"data:image/jpeg;base64,{processed_image}",
            'detected_products': results
        })
    except Exception as e:
        # Clean up files in case of error
        if os.path.exists(filepath):
            os.remove(filepath)
        print(f"Error processing image: {str(e)}")
        return jsonify({'error': 'Failed to process image'}), 500

if __name__ == '__main__':
    app.run(debug=True) 