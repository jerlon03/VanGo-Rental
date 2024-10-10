'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/modals/modalContainer'; // Adjust the import path if necessary
import { Van } from '@/lib/types/van.type';
import Button from '@/components/Button/button';
import SweetAlert from '@/components/alert/alert';
import { termsAndCons } from '@/components/sampledata/sampleData';
import InputField from '@/components/Form/inputfield';
import { DatePicker, DatePickerWithTime } from '@/components/date/calendar';

interface VanCardProps {
  van: Van; // Expecting a prop named 'van' of type 'Van'
}

const VanCard: React.FC<VanCardProps> = ({ van }) => {
  const [currentModal, setCurrentModal] = useState<null | 'terms' | 'personal' | 'confirmation'>(null);
  const [isAgreed, setIsAgreed] = useState(false);

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
          <Button name='Rent Now' onClick={handleRentNowClick} width='120px'></Button>
        </div>

        {/* Modal Logic */}
        <Modal isOpen={currentModal === 'terms'} width="800px" height="530px">
          <div className='w-full flex flex-col gap-[10px] '>
            <div className='w-full bg-primaryColor h-[80px] text-white flex flex-col justify-center px-[10px] rounded-t-[5px]'>
              <h1 className='text-[20px] font-medium'>TERMS AND CONDITION</h1>
              <p className='text-[15px] font-light'>Please read these terms and condition carefully before using Our Service.</p>
            </div>
            <div className='w-full overflow-y-auto max-h-[430px] pl-4 scrollbar-custom'> {/* Added overflow and max-height */}
              {termsAndCons.map((terms, index) => (
                <div key={index} className='pe-[20px]'>
                  <h1 className='font-semibold pt-4 text-[18px]'>{terms.TermsHeading}</h1>
                  <h1 className='font-semibold pt-4'>{terms.Termstitle}</h1>
                  <ul className='text-[14px]'>
                    <li>{terms.AddedContent}</li>
                    <li>• {terms.TermsContent}</li>
                    <li>{terms.AddedContent1}</li>
                    <li>{terms.AddedContent2}</li>
                  </ul>
                </div>
              ))}
              <div className='flex p-4 gap-4'>
                <input
                  type="radio"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(true)} // Set to true when checked
                />
                <p className='text-[14px]'> I agree that I have read and accept the terms and conditions and privacy policy.</p>
              </div>
              <div className='flex gap-[1rem] p-5 w-full justify-end'>
                <Button name='CANCEL' onClick={handleCloseModal} width='120px' />
                <Button name='NEXT' onClick={handleNextClick} width='120px' disabled={!isAgreed} /> {/* Disable if not agreed */}
              </div>
            </div>

          </div>
        </Modal>

        <Modal isOpen={currentModal === 'personal'} width="850px" height="530px">
          <div className='w-full h-full flex flex-col justify-between'>
            <div className='w-full bg-primaryColor h-[110px] text-white flex flex-col justify-center px-[10px] rounded-t-[5px]'>
              <h1 className='text-[20px] font-medium'>BOOKING DETAILS</h1>
              <p className='text-[15px] font-light'>Please fill out the form to apply for VANGO Rental services. </p>
            </div>
            <div className='w-full grid grid-cols-3 gap-[30px] p-2 px-[5%] text-[15px] justify-evenly h-full pt-8'>

              <div className='flex flex-col gap-4'>
                <div>
                  <label htmlFor="">Firstname <span className='text-red-700 font-bold'>*</span></label>
                  <InputField placeholder='Enter your firstname' />
                </div>
                <div>
                  <label htmlFor="">Email Address <span className='text-red-700 font-bold'>*</span></label>
                  <InputField placeholder='Enter your Email Address' />
                </div>

              </div>

              <div className='flex flex-col gap-4'>
                <div>
                  <label htmlFor="">Lastname <span className='text-red-700 font-bold'>*</span></label>
                  <InputField placeholder='Enter your Lastname' />
                </div>
                <div>
                  <label htmlFor="">Date of Birth</label>
                  <DatePicker />
                </div>

              </div>
              <div className='flex flex-col gap-4'>
                <div>
                  <label htmlFor="">Phone Number <span className='text-red-700 font-bold'>*</span></label>
                  <InputField placeholder='Enter your Phonenumber' />
                </div>
                <div>
                  <label htmlFor="">Age</label>
                  <InputField placeholder='Enter your firstname' />
                </div>
              </div>

              <div>
                <label htmlFor="">State/Province  <span className='text-red-700 font-bold'>*</span></label>
                <InputField placeholder='Enter your firstname' />
              </div>

              <div>
                <label htmlFor="">City/Municipality  <span className='text-red-700 font-bold'>*</span>  </label>
                <InputField placeholder='Enter your firstname' />
              </div>
              <div>
                <label htmlFor="">Barangay  <span className='text-red-700 font-bold'>*</span> </label>
                <InputField placeholder='Enter your firstname' />
              </div>
              <div>
                <label htmlFor="">Pick-up Date & Time <span className='text-red-700 font-bold'>*</span> </label>
                <DatePickerWithTime />
              </div>
              <div>
                <label htmlFor="">Pick-up Location<span className='text-red-700 font-bold'>*</span> </label>
                <InputField />
              </div><div>
                <label htmlFor="">Drop off Location<span className='text-red-700 font-bold'>*</span> </label>
                <InputField />
              </div>

            </div>
            <div className='flex gap-[1rem] p-5 w-full justify-end'>
              <Button name='BACK' onClick={handleBackClick} width='120px' />
              <Button name='NEXT' onClick={handleNextClick} width='120px' />
            </div>
          </div>
        </Modal>

        <Modal isOpen={currentModal === 'confirmation'} width="850px" height="530px">
          <div className='w-full h-full flex flex-col justify-between'>
            <div className='w-full bg-primaryColor h-[80px] text-white flex flex-col justify-center px-[10px] rounded-t-[5px]'>
              <h1 className='text-[20px] font-medium'>PAYMENT RESERVATION FORM</h1>
              <p className='text-[15px] font-light'>Please fill out the form to apply for reservation.</p>
            </div>
            <div className='flex gap-[1rem] p-5 w-full justify-end'>
              <Button name='BACK' onClick={handleBackClick} width='120px'/>
              <Button name='SUBMIT' onClick={handleSubmit} width='120px'/>
            </div>
          </div>
        </Modal>

      </div>
    </>
  );
};

export default VanCard;
