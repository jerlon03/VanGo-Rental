'use client'
import React, { useState, useRef } from 'react';
import { IoCloudUploadOutline, IoMdCloseCircle } from "@/components/icons/index"; // Ensure these are named exports
import Image from 'next/image'; // Import the Image component from next/image

const ImagesUploader = ({ onUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input
  const [proofOfPayment, setProofOfPayment] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofOfPayment(file);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Clear the file input using ref
    }
    onUpload(null); // Notify parent component that the image has been removed
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-full h-[200px] border-2 ${previewImage ? 'border-gray-300' : ''} border-dashed rounded-lg mb-4 flex items-center justify-center`}>
        {previewImage ? (
          <>
            <Image src={previewImage} alt="Preview" className="object-fill w-full  h-full" width={100} height={80} />
            <IoMdCloseCircle onClick={handleRemoveImage} className='text-red-500 hover:text-red-800 absolute top-[-10px] right-[-10px] size-[25px]' />
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
        ref={fileInputRef} // Attach the ref to the file input
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImagesUploader;
