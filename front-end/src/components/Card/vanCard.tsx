import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/modals/modalContainer'; // Adjust the import path if necessary
import { Van } from '@/lib/types/van.type';
import Button from '@/components/Button/button';
import SweetAlert from '@/components/alert/alert';

interface VanCardProps {
  van: Van; // Expecting a prop named 'van' of type 'Van'
}

const VanCard: React.FC<VanCardProps> = ({ van }) => {
  const [currentModal, setCurrentModal] = useState<null | 'terms' | 'personal' | 'confirmation'>(null);

  const handleRentNowClick = () => {
    setCurrentModal('terms');
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  const handleNextClick = () => {
    if (currentModal === 'terms') {
      setCurrentModal('personal');
    } else if (currentModal === 'personal') {
      setCurrentModal('confirmation');
    }
  };

  const handleBackClick = () => {
    if (currentModal === 'personal') {
      setCurrentModal('terms');
    } else if (currentModal === 'confirmation') {
      setCurrentModal('personal');
    }
  };

  const handleSubmit = () => {
    SweetAlert.showSuccess('Your rental request has been submitted successfully! Wait 24 hours for confirmation to our Business Owner to your Email Account.');
    setCurrentModal(null); // Close the modal
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center">
        <Image
          src={van.van_image}
          alt={van.van_name}
          width={300}
          height={200}
          className="w-70 h-auto rounded-lg"
        />
        <div className="ml-0 md:ml-6 mt-100 md:mt-0 flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold uppercase">{van.van_name}</h4>
            <span className="text-xl font-bold text-gray-700">{van.price}</span>
          </div>
          <p className="text-gray-600 mt-2">
            {van.van_description} {/* Use the actual description */}
          </p>
          <div className="mt-7">
            <h5 className="font-medium">Details</h5>
            <div className="flex flex-wrap items-center mt-2 text-gray-600">
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-user-friends mr-1"></i>
                <span>{van.people_capacity} People</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-cogs mr-1"></i>
                <span>{van.transmission_type}</span>
              </div>
              <div className="flex items-center mb-2">
                <i className="fas fa-suitcase-rolling mr-1"></i>
                <span>{van.things_capacity} Bags</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }, (_, index) => (
                  <i key={index} className={`fas fa-star${index < Math.floor(van.reviews) ? '' : '-half-alt'}`}></i>
                ))}
              </div>
              <span className="ml-2 text-gray-600">{van.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end mt-40 md:ml-6">
          <button
            onClick={handleRentNowClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            RENT NOW!
          </button>
        </div>

        {/* Modal Logic */}
        <Modal isOpen={currentModal === 'terms'} width="400px" height="300px">
          <div>
            <h2 className="text-xl font-semibold">Terms and Conditions</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero animi dolorem minus dignissimos? Dolorum, officiis obcaecati eligendi temporibus deleniti dolorem nisi doloremque, labore iste, et quaerat. Aperiam, neque porro.</p>
            <div className='flex gap-[1rem]'>
              <Button name='CANCEL' onClick={handleCloseModal} />
              <Button name='NEXT' onClick={handleNextClick} />
            </div>
          </div>
        </Modal>

        <Modal isOpen={currentModal === 'personal'} width="400px" height="300px">
          <div>
            <h2 className="text-xl font-semibold">Personal Details</h2>
            <p>This is the content of the second modal.</p>
            <div className='flex justify-end'>
              <Button name='BACK' onClick={handleBackClick} />
              <Button name='NEXT' onClick={handleNextClick} />
            </div>
          </div>
        </Modal>

        <Modal isOpen={currentModal === 'confirmation'} width="400px" height="300px">
          <div>
            <h2 className="text-xl font-semibold">Reservation Payment</h2>
            <p>Your rental request is about to be submitted!</p>
            <div className='flex justify-end'>
              <Button name='BACK' onClick={handleBackClick} />
              <Button name='SUBMIT' onClick={handleSubmit} />
            </div>
          </div>
        </Modal>

      </div>
    </>
  );
};

export default VanCard;
