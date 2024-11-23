import React from "react";
import { FileUpload } from "./ui/FileUpload";

export const ImageUploader = ({ onImageUpload, isProcessing }) => {
  const handleFileChange = (files) => {
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <FileUpload onChange={handleFileChange} />
      {isProcessing && (
        <div className="mt-4 text-center text-gray-400">
          Processing image...
        </div>
      )}
    </div>
  );
};