// components/Modal.js

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode; // Explicitly define children as ReactNode
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen,  children, width ,height}) => {
  if (!isOpen) return null;

  return (
     <div className="fixed top-0 left-0 w-full h-full flex justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-4 rounded shadow-lg"
        style={{
          width,
          height,
          marginTop: '5rem', // Ensure modal is centered with extra margin-top
          boxSizing: 'border-box', // Ensure padding is included in width and height
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
