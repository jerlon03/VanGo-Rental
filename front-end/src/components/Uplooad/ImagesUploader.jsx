'use client'
import React, { useState } from 'react';
// Check if these imports are correct
import { IoCloudUploadOutline, IoMdCloseCircle } from "@/components/icons/index"; // Ensure these are named exports
import Image from 'next/image'; // Import the Image component from next/image

const ImagesUploader = ({ onUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        onUpload(file); // Ensure the file is passed to the parent component after loading
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null); // Reset the preview image
    document.getElementById('file-input').value = null; // Clear the file input
    onUpload(null); // Notify parent component that the image has been removed
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[120px] border-2 border-dashed border-gray-300 rounded-lg mb-4 flex items-center justify-center">
        {previewImage ? (
          <>
            <Image src={previewImage} alt="Preview" layout="fill" className="object-contain" width={300} height={300} />
            <IoMdCloseCircle onClick={handleRemoveImage} className=' text-red-500 hover:text-red-800 absolute top-[-10px] right-[-10px] size-[25px]' />
          </>
        ) : (
          <div className="text-gray-400 text-center">
            <label htmlFor="file-input" className="cursor-pointer">
              <p className='flex gap-[1rem]'><IoCloudUploadOutline size={20} />Click to upload Image</p>
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
