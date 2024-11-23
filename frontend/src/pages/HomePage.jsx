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
    // Simulate processing with dummy data
    setTimeout(() => {
      setIsProcessing(false);
      setProducts([
        { name: "Coca-Cola Can", confidence: 0.95, category: "Beverages", price: "$1.99" },
        { name: "Lay's Classic Chips", confidence: 0.88, category: "Snacks", price: "$3.49" },
        { name: "Snickers Bar", confidence: 0.92, category: "Candy", price: "$0.99" },
        { name: "Pepsi Bottle", confidence: 0.85, category: "Beverages", price: "$2.49" },
        { name: "Doritos Nacho Cheese", confidence: 0.91, category: "Snacks", price: "$3.99" }
      ]);
    }, 2000);
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