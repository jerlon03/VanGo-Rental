import React from 'react';
import Image from 'next/image';

const DriverDashboard = () => {
  // Example driver data
  const driverInfo = {
    name: 'John Doe',
    license: 'ABC123456',
    vehicle: 'Toyota Camry',
    rating: 4.8,
  };

  return (
    <div className='w-full'>
      <div className='p-6 border border-gray-300 rounded-lg shadow-md bg-white m-4'>
        <h2 className="text-xl font-semibold mb-4">Driver Information</h2>
        <p><strong>Name:</strong> {driverInfo.name}</p>
        <p><strong>License Plate:</strong> {driverInfo.license}</p>
        <p><strong>Vehicle:</strong> {driverInfo.vehicle}</p>
        <p><strong>Rating:</strong> {driverInfo.rating} ⭐</p>
      </div>

      <div className='w-full flex items-center justify-center'>
        <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white m-4">
          <h2 className="text-xl font-semibold mb-4">Completed Trips</h2>
          <div className='w-full flex gap-2 justify-center items-center'>
            <Image src='/complete-icon.png' width={50} height={50} alt='Completed Trips' />
            <p className="font-bold text-[24px]">3</p>
          </div>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white m-4">
          <h2 className="text-xl font-semibold mb-4">Active Trips</h2>
          <p className="text-lg">Total Bookings: <span className="font-bold">3</span></p>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white m-4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Trips</h2>
          <p className="text-lg">Total Bookings: <span className="font-bold">3</span></p>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
