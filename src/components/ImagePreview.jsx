import React from 'react';
import { X } from 'lucide-react';

export function ImagePreview({ image, onRemove, isProcessing }) {
  return (
    <div className="relative w-full max-w-2xl mt-8">
      <div className="relative rounded-xl overflow-hidden shadow-sm">
        <img
          src={image}
          alt="Preview"
          className="w-full h-auto object-cover"
        />
        {isProcessing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}
      </div>
      <button
        onClick={onRemove}
        disabled={isProcessing}
        className="absolute -top-2 -right-2 p-1 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}