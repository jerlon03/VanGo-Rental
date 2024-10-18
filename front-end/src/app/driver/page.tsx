'use client'
import React, { useState } from 'react';
import { FaMapLocationDot, RiErrorWarningFill } from '@/components/icons';
import Image from 'next/image';
import InputField from '@/components/Form/inputfield';

const DriverDashboard = () => {
  // Updated driver data with address
  const [driverInfo, setDriverInfo] = useState({
    name: 'Jerlon Abayon',
    id: 'DR005',
    license: 'S123-456-7890',
    experience: '5 years',
    phone: '(555) 123-4567',
    dateOfBirth: '07, April 1996',
    address: '123 Main St, Anytown, USA', // New address field
  });

  // Handler to update driver information
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setDriverInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handler to simulate saving changes
  const handleSaveChanges = () => {
    alert('Driver information updated!');
    // Here you can add logic to save the updated info to your server or database
  };

  return (
    <div className='w-full'>
      <p className='p-2 tracking-[1px]'>Welcome! <span className='font-semibold'>Driver</span></p>
      <div className='w-full flex gap-[15px]'>
        <div className='w-[80%] flex gap-[25px]'>
          {[
            { title: 'Active Trips', count: 3 },
            { title: 'Upcoming Trips', count: 3 },
            { title: 'Completed Trips', count: 3 },
          ].map((trip, index) => (
            <div key={index} className='border-2 border-primaryColor bg-[#FFFFFF] w-full rounded-[5px] h-[100px] flex justify-center items-center gap-[10px]'>
              <div className='border p-2 bg-primaryColor rounded-[3px]'>
                <FaMapLocationDot size={30} className={`text-white group-hover:text-button`} />
              </div>
              <div className='text-[25px] font-semibold flex flex-col justify-center items-center'>
                {trip.count} <span className='font-medium text-blackColor text-[18px]'>{trip.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div className='w-[20%]'>
          <div className=' border w-full p-1 rounded-[5px]'>
            <div className='flex gap-[5px]'>
              <RiErrorWarningFill size={20} className={`text-primaryColor group-hover:text-button`} />
              <p className='text-[12px] font-semibold'>NEW UPCOMING BOOKINGS</p>
            </div>
            <p className='text-[12px] font-medium pt-2'>There are bookings that has been approved by the admin.</p>
          </div>
        </div>
      </div>


      {/* Driver Information */}
      <div className='w-full pt-[3%] flex gap-[20px]'>
        <div className="flex items-center w-[50%]">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <h1 className="text-[18px] font-bold mb-4 text-blackColor">{driverInfo.name}</h1>
            <form>
              <p className="text-gray-700 flex gap-4"><strong>ID:</strong> {driverInfo.id}</p>
              <label className="block text-gray-700">
                <strong>Driver License #:</strong>
                <input
                  type="text"
                  name="license"
                  value={driverInfo.license}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter driver license"
                />
              </label>
              <label className="block text-gray-700">
                <strong>Driver Experience:</strong>
                <InputField
                  type="text"
                  value={driverInfo.experience}
                  onChange={handleChange}
                  placeholder="Enter experience"
                />
              </label>
              <label className="block text-gray-700">
                <strong>Phone:</strong>
                <InputField
                  type="text"
                  value={driverInfo.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </label>
              <label className="block text-gray-700">
                <strong>Date of Birth:</strong>
                <InputField
                  type="date"
                  value={driverInfo.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
              <label className="block text-gray-700">
                <strong>Address:</strong>
                <InputField
                  type="text"
                  value={driverInfo.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter address"
                />
              </label>
              <button type="button" onClick={handleSaveChanges} className="mt-4 bg-primaryColor text-white rounded-md p-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Van Assigned Section */}
        <div className='w-[50%]'>
          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h1 className="text-xl font-bold mb-4 text-blackColor">Van Assigned</h1>
            <div className="w-full">
              <Image
                src="/png/van/van1.png" // Replace with your image path
                alt="Van"
                className="w-full object-cover rounded-md mr-4"
                width={500}
                height={200}
              />
              <div>
                <p className="text-gray-700"><strong>Model:</strong> Ford Transit</p>
                <p className="text-gray-700"><strong>License Plate:</strong> XYZ 1234</p>
                <p className="text-gray-700"><strong>Color:</strong> White</p>
                <p className="text-gray-700"><strong>Capacity:</strong> 15 passengers</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DriverDashboard;
