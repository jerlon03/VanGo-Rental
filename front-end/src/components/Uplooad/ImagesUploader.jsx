import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";

const ImagesUploader = ({ onUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[120px] border-2 border-dashed border-gray-300 rounded-lg mb-4 flex items-center justify-center">
        {previewImage ? (
          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 text-center">
            <label  htmlFor="file-input">
                <p className='flex gap-[1rem]'><IoCloudUploadOutline size={20} />{previewImage ? 'Change Picture' : 'Click to upload Image'}</p>
            </label>
          </div>
        )}
      </div>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImagesUploader;
