import os
from pathlib import Path

class Config:
    # Base directory
    BASE_DIR = Path(__file__).resolve().parent

    # Model settings
    MODEL_PATH = os.path.join(BASE_DIR, 'models', 'YOLOv11_SKU.pt')
    
    # Upload settings
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    RESULTS_FOLDER = os.path.join(BASE_DIR, 'results')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'} 