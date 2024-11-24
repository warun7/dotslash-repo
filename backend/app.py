from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from utils.yolo_detector import YOLOv11Detector
import base64
from dotenv import load_dotenv
from PIL import Image
from pathlib import Path
import math
import json
import google.generativeai as genai
#comment
load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
RESULTS_FOLDER = 'results'
BATCH_SIZE = 35
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

detector = YOLOv11Detector(
    weights_path="./utils/YOLOv11_SKU.pt",
    base_output_dir=RESULTS_FOLDER
)

# Initialize Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash-8b')

def clean_product_name(name):
    """Clean product name by removing underscores and unwanted text"""
    if not name:
        return None
    
    name = str(name).strip()
    
    # List of terms that indicate an unknown product
    unknown_terms = [
        'unknown', 'error', 'unidentified', 'not clear', 'cannot identify'
    ]
    
    if any(term.lower() in name.lower() for term in unknown_terms):
        return None
    
    if len(name) < 3:
        return None
    
    cleaned_name = name.replace('_', ' ').strip()
    cleaned_name = ' '.join(cleaned_name.split())
    cleaned_name = cleaned_name.title()
    
    return cleaned_name

def process_batch_with_gemini(image_paths):
    """Process a batch of images with Gemini API"""
    try:
        images = []
        prompt = """Analyze these retail product images.
        
        For each image:
        1. Read the product label/text
        2. Identify the brand and product name
        3. Format as "Brand Product Name"
        4. If text is not clear, skip the product

        Return in JSON format:
        {
            "products": [
                {"Product Name": "Brand Product Name"}
            ]
        }"""
        
        images.append(prompt)
        
        for img_path in image_paths:
            try:
                image = Image.open(img_path)
                images.append(image)
            except Exception as e:
                print(f"Error loading image {img_path}: {e}")
                continue
        
        if len(images) <= 1:
            return {"products": []}
        
        response = model.generate_content(images)
        print("Raw Gemini Response:", response.text)
        
        try:
            cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
            result = json.loads(cleaned_text)
            return result
        except json.JSONDecodeError as e:
            print(f"JSON Parse Error: {e}")
            return {"products": []}
        
    except Exception as e:
        print(f"Error in batch processing: {str(e)}")
        return {"products": []}

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
        # Process image and get paths
        bb_path, cropped_paths = detector.process_image(filepath)
        
        # Process cropped images in batches
        all_products = []
        num_batches = math.ceil(len(cropped_paths) / BATCH_SIZE)
        
        for batch_idx in range(num_batches):
            start_idx = batch_idx * BATCH_SIZE
            end_idx = min((batch_idx + 1) * BATCH_SIZE, len(cropped_paths))
            
            batch_paths = cropped_paths[start_idx:end_idx]
            print(f"Processing batch {batch_idx + 1}/{num_batches}")
            
            # Process batch with Gemini
            batch_results = process_batch_with_gemini(batch_paths)
            print("Batch results:", json.dumps(batch_results, indent=2))  # Debug print
            
            if batch_results and 'products' in batch_results:
                for product in batch_results['products']:
                    product_name = clean_product_name(product.get('Product Name'))
                    if product_name:  # Only add valid product names
                        print(f"Adding product: {product_name}")  # Debug print
                        all_products.append({
                            'name': product_name
                        })
        
        # Get unique products
        unique_products = []
        seen = set()
        for product in all_products:
            if product['name'] not in seen:
                seen.add(product['name'])
                unique_products.append(product)
        
        # Sort products alphabetically
        product_list = sorted(unique_products, key=lambda x: x['name'])
        
        print("Final product list:", json.dumps(product_list, indent=2))  # Debug print
        
        # Clean up cropped images
        for path in cropped_paths:
            if os.path.exists(path):
                os.remove(path)
        
        # Convert processed image to base64
        with open(bb_path, "rb") as img_file:
            processed_image = base64.b64encode(img_file.read()).decode('utf-8')
        
        # Clean up original and processed images
        os.remove(filepath)
        os.remove(bb_path)
        
        # Save results
        output_dir = os.path.join(RESULTS_FOLDER, Path(filepath).stem)
        results_file = os.path.join(output_dir, f"{Path(filepath).stem}_results.json")
        final_results = {
            'products': product_list
        }
        with open(results_file, 'w') as f:
            json.dump(final_results, f)
        
        return jsonify({
            'processed_image': f"data:image/jpeg;base64,{processed_image}",
            'detected_products': product_list
        })
        
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        if os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 
