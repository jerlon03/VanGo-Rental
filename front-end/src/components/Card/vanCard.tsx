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
import ImagesUploader from '../Uplooad/ImagesUploader';
import Select from '@/components/Form/select';
import {cebuData} from '@/components/sampledata/sampleData'; // Import the cebuData
import { fetchAddBooking } from '@/lib/api/booking.api'; // Import the fetchAddBooking function
import { Booking } from '@/lib/types/booking.type';

interface VanCardProps {
  
  van: Van; // Expecting a prop named 'van' of type 'Van'
}

const VanCard: React.FC<VanCardProps> = ({ van }) => {
  const [currentModal, setCurrentModal] = useState<null | 'terms' | 'booking' >(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [reservationImage, setReservationImage] = useState<File | null>(null);

  // State variables for form fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('CEBU');
  const [barangay, setBarangay] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDateTime, setPickupDateTime] = useState<Date | null>(null);

  // State for selected municipality
  const [municipality, setMunicipality] = useState('');
  

  // Get the list of municipalities from cebuData
  const municipalities = Object.keys(cebuData.CEBU.municipality_list);
  // Get the barangays based on the selected municipality
  const barangays = municipality ? cebuData.CEBU.municipality_list[municipality as keyof typeof cebuData.CEBU.municipality_list].barangay_list : [];

  const handleRentNowClick = () => {
    setCurrentModal('terms');
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  const handleNextClick = () => {
    if (currentModal === 'terms') {
      setCurrentModal('booking');
    } 
  };

  const handleBackClick = () => {
    if (currentModal === 'booking') {
      setCurrentModal('terms');
    } 
  };

  const handleSubmit = async () => { // Make this function async
    // Array to hold names of empty fields
    const missingFields: string[] = [];
    const proofOfPayment = reservationImage; // Check if an image is uploaded

    // Check each field and push to missingFields if empty
    if (!firstname) missingFields.push('Firstname');
    if (!lastname) missingFields.push('Lastname');
    if (!email) missingFields.push('Email Address');
    if (!phoneNumber) missingFields.push('Phone Number');
    if (!province) missingFields.push('Province');
    if (!municipality) missingFields.push('City/Municipality');
    if (!barangay) missingFields.push('Barangay');
    if (!pickupLocation) missingFields.push('Pick-up Location');
    if (!pickupDateTime) missingFields.push('Pick-up Date & Time');
    if (!proofOfPayment) missingFields.push('Proof of Payment');

    // If there are missing fields, show an error message
    if (missingFields.length > 0) {
        const fieldsList = missingFields.join(', ');
        SweetAlert.showError(`Please fill up the following fields: ${fieldsList}`);
        return; // Exit the function if validation fails
    }

    // Prepare booking details to send
    const bookingDetails: Booking = {
      first_name: firstname,
      last_name: lastname,
      email,
      phone_number: phoneNumber,
      province,
      city_or_municipality: municipality,
      barangay,
      pickup_location: pickupLocation,
      pickup_date_time: pickupDateTime || new Date(),
      proof_of_payment: reservationImage ? await uploadFile(reservationImage) : '',
      booking_id: 0,
      date_of_birth: new Date(),
      van_id: van.van_id,
      created_at: new Date(),
      status: ''
    };

    try {
        const response = await fetchAddBooking(bookingDetails); // Call fetchAddBooking with booking details
        SweetAlert.showSuccess('Your rental request has been submitted successfully! Wait 24 hours for confirmation to our Business Owner to your Email Account.');
        console.log(response); // Log the response if needed
    } catch (error) {
        SweetAlert.showError('Failed to submit booking. Please try again.');
    }

    // Reset form fields
    setFirstname('');
    setLastname('');
    setEmail('');
    setPhoneNumber('');
    setProvince('');
    setMunicipality('');
    setBarangay('');
    setPickupLocation('');
    setPickupDateTime(null);
    setReservationImage(null); // Reset the uploaded image

    // Optionally close the modal
    setCurrentModal(null); // Close the modal
  };

  const handleImageUpload = (file: File) => {
    setReservationImage(file);
  };

  // Function to handle file upload and return a string (e.g., URL)
  const uploadFile = async (file: File): Promise<string> => {
    // Implement your file upload logic here
    // For example, you might upload the file to a server and return the URL
    // This is a placeholder implementation
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('uploaded_file_url'); // Replace with actual uploaded file URL
        }, 1000);
    });
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
        <Modal onClose={handleCloseModal}  isOpen={currentModal === 'terms'} width="800px" height="530px">
          <div className='w-full flex flex-col gap-[10px] bg-white rounded-[5px]'>
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
                <Button name='CANCEL' onClick={handleCloseModal} width='120px' className="bg-red-500 hover:bg-red-700 text-white" /> 
                <Button name='NEXT' onClick={handleNextClick} width='120px' disabled={!isAgreed} className="bg-primaryColor hover:bg-blue-700 text-white" /> 
              </div>
            </div>

          </div>
        </Modal>

        <Modal onClose={handleCloseModal}  isOpen={currentModal === 'booking'} width="850px" height="530px">
          <div className='w-full h-full flex flex-col justify-between bg-white rounded-[5px]'>
            <div className='w-full bg-primaryColor h-[110px] text-white flex flex-col justify-center px-[10px] rounded-t-[5px]'>
              <h1 className='text-[20px] font-medium'>BOOKING DETAILS</h1>
              <p className='text-[15px] font-light'>Please fill out the form to apply for VANGO Rental services. </p>
            </div>
            <div className='w-full pt-4  p-2 px-[5%]  h-full flex flex-col gap-4  overflow-y-auto max-h-[430px] scrollbar-custom'>
              <h1 className='text-[16px] font-medium  p-2 bg-gray-500 text-white rounded-[3px]'>Personal Details</h1>
              <div className='w-full grid grid-cols-3 gap-[30px] text-[15px]  '>

                <div className='flex flex-col gap-4'>
                  <div>
                    <label htmlFor="">Firstname <span className='text-red-700 font-bold'>*</span></label>
                    <InputField 
                      placeholder='Enter your firstname' 
                      value={firstname} 
                      onChange={(e) => setFirstname(e.target.value)} 
                      className={firstname ? '' : 'border-red-500'} // Change border color if empty
                    />
                  </div>
                  <div>
                    <label htmlFor="">Email Address <span className='text-red-700 font-bold'>*</span></label>
                    <InputField 
                      placeholder='Enter your Email Address' 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className={email ? '' : 'border-red-500'} // Change border color if empty
                    />
                  </div>

                </div>

                <div className='flex flex-col gap-4'>
                  <div>
                    <label htmlFor="">Lastname <span className='text-red-700 font-bold'>*</span></label>
                    <InputField 
                      placeholder='Enter your Lastname' 
                      value={lastname} 
                      onChange={(e) => setLastname(e.target.value)} 
                      className={lastname ? '' : 'border-red-500'} // Change border color if empty
                    />
                  </div>
                  <div>
                    <label htmlFor="">Phone Number <span className='text-red-700 font-bold'>*</span></label>
                    <InputField 
                      placeholder='Enter your Phonenumber' 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)} 
                      className={phoneNumber ? '' : 'border-red-500'} // Change border color if empty
                    />
                  </div>

                </div>
                <div className='flex flex-col gap-4'>
                  <div>
                    <label htmlFor="">Date of Birth</label>
                    <DatePicker />
                  </div>
                </div>

              </div>
              <h1 className='text-[16px] font-medium  p-2 bg-gray-500 text-white rounded-[3px]'>Drop-Off Location</h1>
              <div className='w-full grid grid-cols-3 gap-[30px] text-[15px]'>
                <div className='flex flex-col gap-4'>
                  <div>
                    <label htmlFor="">Province  <span className='text-red-700 font-bold'>*</span></label>
                    <Select 
                      options={[
                        { value: 'CEBU', label: 'CEBU' }, // Fixed value for the select
                      ]}
                      onChange={(value) => setProvince(value)} 
                      value={province} 
                      className={province ? '' : 'border-red-500'} // Change border color if empty
                      disabled={true} // Set to true if you want to disable the select
                    />
                  </div>
                  <div>
                    <label htmlFor="">Pick-up Location/ LandMark<span className='text-red-700 font-bold'>*</span> </label>
                    <InputField 
                      placeholder='Enter Pick-up Location' 
                      value={pickupLocation} 
                      onChange={(e) => setPickupLocation(e.target.value)} 
                      className={pickupLocation ? '' : 'border-red-500'} // Change border color if empty
                    />
                  </div>

                </div>
                <div className='flex flex-col gap-4'>
                  <div>
                    <label htmlFor="">City/Municipality  <span className='text-red-700 font-bold'>*</span>  </label>
                    <Select 
                      options={municipalities.map(muni => ({ value: muni, label: muni }))} // Populate municipalities
                      onChange={(value) => {
                        setMunicipality(value);
                        setBarangay(''); // Reset barangay when municipality changes
                      }} 
                      value={municipality} 
                      className={municipality ? '' : 'border-red-500'} // Change border color if empty
                      disabled={false} // Set to true if you want to disable the select
                    />
                  </div>
                  <div>
                    <label htmlFor="">Pick-up Date & Time <span className='text-red-700 font-bold'>*</span> </label>
                    <DatePickerWithTime 
                      value={pickupDateTime} 
                      onChange={(date) => setPickupDateTime(date as any)} 
                      className={pickupDateTime ? '' : 'border-red-500'} // Change border color if empty
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="">Barangay  <span className='text-red-700 font-bold'>*</span> </label>
                  <Select 
                    options={barangays.map(bgy => ({ value: bgy, label: bgy }))} // Populate barangays based on selected municipality
                    onChange={(value) => setBarangay(value)} 
                    value={barangay} 
                    className={barangay ? '' : 'border-red-500'} // Change border color if empty
                    disabled={false} // Disable if no municipality is selected
                  />
                </div>

              </div>
              <h1 className='text-[16px] font-medium  p-2 bg-gray-500 text-white rounded-[3px]'>Reservation Payment</h1>
              <div className='w-full'>
                <p>Reservation Free Via</p>
                <div className='w-full flex p-2 gap-6 items-center'>
                  <div className='w-[30%] h-[180px] border rounded-md p-2 flex items-center justify-center flex-col '>
                    <Image src='/gcash-logo.svg' width={80} height={20} alt='Gcash Logo'></Image>
                    <Image src='/gcash-qr.png' width={110} height={20} alt='Gcash Logo'></Image>
                    <p className='text-[14px] font-medium'>09-12345-6789</p>
                  </div>
                  <div className='w-[30%] h-[180px] border rounded-md p-2 flex items-center justify-center flex-col '>
                    <Image src='/paypal-logo.png' width={80} height={20} alt='Gcash Logo'></Image>
                    <Image src='/gcash-qr.png' width={110} height={20} alt='Gcash Logo'></Image>
                    <p className='text-[14px] font-medium'>09-12345-6789</p>
                  </div>
                  <div className='flex flex-col w-[40%] gap-2'>
                    <h2>Proof of Payment <span className='text-red-700 font-bold'>*</span></h2>
                    <ImagesUploader onUpload={handleImageUpload} />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[1rem] p-5 w-full justify-end'>
              <Button name='BACK' onClick={handleBackClick} width='120px' className="bg-gray-500 hover:bg-gray-700 text-white" /> 
              <Button name='SUBMIT' onClick={handleSubmit} width='120px' className="bg-green-500 hover:bg-green-700 text-white" /> 
            </div>
          </div>
        </Modal>

      
      </div>
    </>
  );
};

export default VanCard;