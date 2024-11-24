# Process

- We started with using yolov5 with large parameters but then switched to `yolov11nano` for faster inference time
- We used `yolov11nano` model to segment products from the shelf image into images of each product
- Results from `yolov11nano`:
  ![store 1](images/store_21_BB.jpg)
  ![store 2](images/store_6_BB.jpg)
  ![store 3](images/store_19_BB.jpg)
- After getting the bounding boxes on the products, we cropped them and fed the images to `GEMINI API` with propmts for it to identify the product in the image
- Made calls to the model and the api using flask and the results are as follows: 
![product detection on website]()

# Setting up Locally
- Clone the repository
```bash
git clone https://github.com/
cd cloned-repo/frontend
npm install
cd ..
cd backend
pip install -r requirements.txt
```
To run the `frontend` run this command in the frontend directory
```bash
npm run dev
```
To run the `backend` run this command in the backend directory
```bash
python app.py
```

# Tech Used
- For frontend reactjs with tailwind was used
- The backend runs using flask to make requests to the model and the Gemini API
- The model utilizes YOLO v11n for nearly instant and fairly accurate object detection and cropping in the shelf image.
- Gemini 1.5 flash with 8 billion parameters was used for quick item recognition with added benefits of formatting, filtering unique items, fuzzy identification and context awareness at a low cost both computationally and in terms of API cost.
  ![YOLO v11 stats](images/yolo11n.png)
  
