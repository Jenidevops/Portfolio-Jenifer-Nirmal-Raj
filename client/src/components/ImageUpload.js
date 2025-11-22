import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const ImageUpload = ({ onUpload, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // For now, just show instructions to manually add the image
      const fileName = file.name;
      alert(
        `📸 Image selected: ${fileName}\n\n` +
        `IMPORTANT - Follow these steps:\n\n` +
        `1. Move/Copy this image file to:\n` +
        `   /client/public/projects/${fileName}\n\n` +
        `2. The URL "/projects/${fileName}" has been set automatically.\n\n` +
        `3. Click "Create Project" or "Update Project" to save.\n\n` +
        `⚠️ Image won't display until you move the file to the projects folder!`
      );
      
      // Set the path that should be used
      onUpload(`/projects/${fileName}`);
    }
  };

  return (
    <div className="space-y-4">
      <label className="w-full bg-primary/10 border-2 border-dashed border-primary/30 rounded-lg p-6 hover:bg-primary/20 hover:border-primary/50 transition-all group cursor-pointer block">
        <div className="flex flex-col items-center justify-center space-y-3">
          <AiOutlineCloudUpload className="text-5xl text-primary group-hover:scale-110 transition-transform" />
          <div>
            <p className="text-primary font-semibold">Click to Select Image</p>
            <p className="text-gray-400 text-xs mt-1">PNG, JPG, JPEG or WEBP</p>
            <p className="text-gray-500 text-xs mt-2">
              Or paste image URL in the field below
            </p>
          </div>
        </div>
        <input
          type="file"
          accept="image/png,image/jpg,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {(preview || currentImage) && (
        <div className="relative">
          <p className="text-sm text-gray-400 mb-2">Preview:</p>
          <img 
            src={preview || currentImage} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border border-primary/20"
            onError={(e) => {
              e.target.src = '/project-placeholder.svg';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
