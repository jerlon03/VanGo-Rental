import React from "react";
import Modal from "@/components/modals/modalContainer"; // Ensure you have react-modal installed

interface LoaderModalProps {
  isOpen: boolean;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      width="300px"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center ">
        <h2 className="text-lg font-semibold">Loading...</h2>
        <div className="mt-4 flex justify-center items-center w-full">
          <div className="loader"></div>
        </div>
      </div>
    </Modal>
  );
};

export default LoaderModal;
