import React, { useState } from "react";
import ModalContainer from "@/components/modals/modalContainer"; // Import the ModalContainer
import Button from "@/components/Button/button"; // Import Button component
import SweetAlert from "@/components/alert/alert"; // Import SweetAlert
import TextArea from "@/components/Form/textarea"; // Import the TextArea component

interface DeclineReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void; // Callback for confirming decline
}

const DeclineReasonModal: React.FC<DeclineReasonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [declineReason, setDeclineReason] = useState<string>("");

  const handleConfirm = async () => {
    if (declineReason.trim() === "") {
      SweetAlert.showError("Please provide a reason for declining.");
      return;
    }
    const isConfirmed = await SweetAlert.showConfirm(
      "Do you want to decline this booking?"
    );
    if (isConfirmed) {
      onConfirm(declineReason); // Call the confirm function with the reason
      setDeclineReason(""); // Reset the reason
      onClose(); // Close the modal
    }
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className=" bg-white shadow-lg rounded-lg max-w-lg mx-auto">
        <div className="w-full h-[50px] flex pl-4 items-center bg-primaryColor rounded-t-[5px]">
          <h2 className="text-[20px] text-white font-medium">
            REASON TO DECLINE A BOOKING
          </h2>
        </div>
        <div className="w-full p-2">
          <TextArea
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder="Enter reason for decline"
            rows={4} // You can adjust the rows as needed
            maxLength={500} // Set maxLength if needed
          />
          <div className="flex justify-end gap-6">
            <Button
              name="Cancel"
              onClick={onClose}
              width="120px"
              backgroundColor="alert"
            />
            <Button
              name="Confirm Decline"
              onClick={handleConfirm}
              width="180px"
              backgroundColor="error"
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeclineReasonModal;
