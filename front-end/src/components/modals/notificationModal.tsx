import React, { useRef, useEffect } from 'react';
import { useLogoutContext } from '@/Provider/context/contextProvider';
import Modal from '@/components/modals/modalContainer';

const NotificationModal: React.FC = () => {
  const { isNotificationOpen, setIsNotificationOpen } = useLogoutContext();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside of the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen, setIsNotificationOpen]);

  return (
    <Modal isOpen={isNotificationOpen} width='500px' height='500px'>
      <div ref={modalRef}>
        <h1>Sample Notification Modal</h1>
      </div>
    </Modal>
  );
};

export default NotificationModal;
