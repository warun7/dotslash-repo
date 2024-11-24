import { ImageUploader } from "./ImageUploader";
import { ImagePreview } from "./ImagePreview";
import { ProductList } from "./ProductList";
import { Stats } from "./Stats";

function MainContent({
  handleImageUpload,
  handleRemoveImage,
  image,
  isProcessing,
  products,
  setProducts,
}) {
  const handleDeleteProduct = (indexToDelete) => {
    setProducts(products.filter((_, index) => index !== indexToDelete));
  };

  const handleDuplicateProduct = (index) => {
    const newProducts = [...products];
    const productToDuplicate = { ...newProducts[index] };
    newProducts.splice(index + 1, 0, productToDuplicate);
    setProducts(newProducts);
  };

  return (
    <main className="flex-grow bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-zinc-100 mb-4">
            Product Recognition
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Upload an image of your store products and let our AI identify them
            instantly. Get accurate product recognition with confidence scores.
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

          <ProductList 
            products={products} 
            onDeleteProduct={handleDeleteProduct}
            onDuplicateProduct={handleDuplicateProduct}
          />
        </div>
      </div>
    </main>
  );
}

export default MainContent;
