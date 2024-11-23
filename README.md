# Process

- We started with using yolov5 with large parameters but then switched to `yolov11nano` for faster inference time
- We used `yolov11nano` model to segment products from the shelf image into images of each product
- Results from `yolov11nano`:
  ![store 1](store_21_BB.jpg)
  ![store 2](store_6_BB.jpg)
  ![store 3](store_19_BB.jpg)
- We then used OCR to decipher the text on the individual product images to identify them, using `opencv` and `easyocr`
# OCR Results

![ocr image 1](<WhatsApp Image 2024-11-23 at 21.37.48_6e949558.jpg>)
![ocr image 2](<WhatsApp Image 2024-11-23 at 21.38.14_cabe2e7a.jpg>)
![ocr image 3](<WhatsApp Image 2024-11-23 at 21.38.23_a96b1102.jpg>)
