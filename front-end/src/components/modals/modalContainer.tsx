// components/Modal.js

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode; // Explicitly define children as ReactNode
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, width, height }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white shadow-lg rounded-[5px]"
        style={{
          width,
          height,
          marginTop: '5rem',
        }}
      >
        {children}
      </div>
    </div>
  );
};


export default Modal;
