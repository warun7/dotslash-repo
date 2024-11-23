import { useState } from "react";
import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

const HomePage = () => {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [products, setProducts] = useState([]);

  const handleImageUpload = async (file) => {
    setImage(URL.createObjectURL(file));
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:5000/api/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const data = await response.json();
      setProducts(data.detected_products);
      setImage(data.processed_image);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }

    // // Simulate processing with dummy data
    // setTimeout(() => {
    //   setIsProcessing(false);
    //   setProducts([
    //     { name: "Coca-Cola Can", confidence: 0.95, category: "Beverages", price: "$1.99" },
    //     { name: "Lay's Classic Chips", confidence: 0.88, category: "Snacks", price: "$3.49" },
    //     { name: "Snickers Bar", confidence: 0.92, category: "Candy", price: "$0.99" },
    //     { name: "Pepsi Bottle", confidence: 0.85, category: "Beverages", price: "$2.49" },
    //     { name: "Doritos Nacho Cheese", confidence: 0.91, category: "Snacks", price: "$3.99" }
    //   ]);
    // }, 2000);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setProducts([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MainContent
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
          image={image}
          isProcessing={isProcessing}
          products={products}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
