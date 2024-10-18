// components/Modal.js

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode; // Explicitly define children as ReactNode
  width?: string;
  height?: string;
  onClose: () => void; // Added onClose property
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, width, height, onClose }) => { // Added onClose to destructured props
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center bg-black bg-opacity-50 z-50">
      <div
        className="shadow-sm rounded-[5px] w-full"
        style={{
          width,
          height,
          marginTop: '3rem',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
