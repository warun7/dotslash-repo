import { Package } from 'lucide-react';

export function ProductList({ products = [] }) {
  if (!products?.length) return null;

  return (
    <div className="w-full max-w-2xl mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Detected Products</h2>
      <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-medium text-gray-700">{product.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {(product.confidence * 100).toFixed(1)}% confidence
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}