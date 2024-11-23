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
    // Add your image processing logic here
    // For now, just simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setProducts([
        { name: "Sample Product", confidence: 0.95 }
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