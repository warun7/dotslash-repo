import React, { useState } from "react";
import { ImageUploader } from "./components/ImageUploader";
import { ImagePreview } from "./components/ImagePreview";
import { ProductList } from "./components/ProductList";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Stats } from "./components/Stats";
import Hero from "./components/Hero";

// Simulated product detection - in a real app, this would call an API
const detectProducts = async (image) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { name: "Coca-Cola Can", confidence: 0.98 },
    { name: "Lay's Chips", confidence: 0.95 },
    { name: "Oreo Cookies", confidence: 0.92 },
    { name: "Milk Carton", confidence: 0.87 },
  ];
};

function App() {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [products, setProducts] = useState([]);

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsProcessing(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        localStorage.setItem("lastUploadedImage", base64String);
      };
      reader.readAsDataURL(file);

      const detectedProducts = await detectProducts(imageUrl);
      setProducts(detectedProducts);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setProducts([]);
    localStorage.removeItem("lastUploadedImage");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <Hero />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-zinc-100 mb-4">
              Product Recognition
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
              Upload an image of your store products and let our AI identify
              them instantly. Get accurate product recognition with confidence
              scores.
            </p>
          </div>

          <Stats />

          <div className="flex flex-col items-center justify-center space-y-8">
            <ImageUploader
              onImageUpload={handleImageUpload}
              isProcessing={isProcessing}
            />

            {image && (
              <ImagePreview
                image={image}
                onRemove={handleRemoveImage}
                isProcessing={isProcessing}
              />
            )}

            <ProductList products={products} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
