import { Package } from "lucide-react";

export function ProductList({ products = [] }) {
  if (!products?.length) return null;

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ["Product Name", "Confidence"];
    const csvContent = [
      headers.join(","),
      ...products.map((product) =>
        [`"${product.name}"`, `${(product.confidence * 100).toFixed(1)}%`].join(
          ","
        )
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "product_recognition_results.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">
          Detected Products
        </h2>
        {products.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Export CSV
          </button>
        )}
      </div>
      <div className="bg-slate-900 rounded-xl shadow-sm divide-y divide-gray-800">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-medium text-gray-200">{product.name}</span>
            </div>
            <span className="text-sm text-gray-400">
              {(product.confidence * 100).toFixed(1)}% confidence
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
