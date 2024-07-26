// components/Modal.js

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode; // Explicitly define children as ReactNode
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen,  children, width }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg  "style={{ width }}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
