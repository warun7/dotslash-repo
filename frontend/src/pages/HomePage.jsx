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
        mode: "cors",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setProducts(data.detected_products || []);
      setImage(data.processed_image);
    } catch (error) {
      console.error("Error processing image:", error);
      setProducts([]);
      setImage(null);
    } finally {
      setIsProcessing(false);
    }
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
          setProducts={setProducts}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
