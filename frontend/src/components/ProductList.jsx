import { Trash2 } from "lucide-react";

export function ProductList({ products = [], onDeleteProduct }) {
  if (!products?.length) return null;

  // Initialize products with quantity = 1 if not set
  products.forEach(product => {
    if (typeof product.quantity === 'undefined') {
      product.quantity = 1;
    }
  });

  const units = ["kg", "g", "mg", "L", "mL", "units"];

  const handleExportCSV = () => {
    // Create CSV content with both quantity and amount
    const headers = ["Product Name", "Number of Items", "Amount", "Unit"];
    const csvContent = [
      headers.join(","),
      ...products.map(
        (product) =>
          `"${product.name}",${product.quantity || 0},${product.amount || 0},"${
            product.unit || "units"
          }"`
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

  const handleQuantityChange = (index, value) => {
    products[index].quantity = Math.max(0, parseInt(value) || 0);
  };

  const handleAmountChange = (index, value) => {
    products[index].amount = Math.max(0, parseFloat(value) || 0);
  };

  const handleUnitChange = (index, value) => {
    products[index].unit = value;
  };

  const handleDelete = (indexToDelete) => {
    // Remove the product at the specified index
    products.splice(indexToDelete, 1);
  };

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">
          Detected Products ({products.length})
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
              <button
                onClick={() => onDeleteProduct(index)}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
              <span className="font-medium text-gray-200">{product.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Number of items input */}
              <div className="flex flex-col items-center">
                <label className="text-xs text-gray-400 mb-1">Items</label>
                <input
                  type="number"
                  min="0"
                  defaultValue={product.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="w-20 px-3 py-1 bg-slate-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="Items"
                />
              </div>

              {/* Amount input with units */}
              <div className="flex flex-col items-center">
                <label className="text-xs text-gray-400 mb-1">Amount</label>
                <div className="flex">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={product.amount || 0}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    className="w-24 px-3 py-1 bg-slate-800 border border-gray-700 rounded-l-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Amount"
                  />
                  <select
                    defaultValue={product.unit || "units"}
                    onChange={(e) => handleUnitChange(index, e.target.value)}
                    className="px-2 py-1 bg-slate-800 border border-l-0 border-gray-700 rounded-r-lg text-gray-200 focus:outline-none focus:border-blue-500"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
