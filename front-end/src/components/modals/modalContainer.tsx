// components/Modal.js

import { usePathname } from 'next/navigation'; // Import useRouter
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode; // Explicitly define children as ReactNode
  width?: string;
  height?: string;
  onClose: () => void; // Added onClose property
  className?: string; // Added className property
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, width, height, onClose, className }) => { 
  const pathname = usePathname(); // Get the router object


  if (!isOpen) return null;

  // Set marginTop based on the current route
  const marginTop = pathname === '/forgot-password' ? '0' : '3rem';

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center bg-blackColor/50 z-50 ${className}`}>
      <div
        className="shadow-sm rounded-[5px] w-full"
        style={{
          width,
          height,
          marginTop, // Use the conditional marginTop
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
