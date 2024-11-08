'use client'
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot, RiErrorWarningFill } from '@/components/icons';
import Image from 'next/image';
import InputField from '@/components/Form/inputfield';
import { getDriver, updateDriver } from '@/lib/api/driver.api';
import { ApiResponse } from '@/lib/types/driver.type';
import { useAuth } from '@/Provider/context/authContext';
import Button from '@/components/Button/button';
import Modal from '@/components/modals/modalContainer';
import { BsPencilSquare } from "react-icons/bs";
import SweetAlert from '@/components/alert/alert';
import { Van } from '@/lib/types/van.type';
import { getVanDetailsById } from '@/lib/api/van.api';
import { formatDatePublicRange } from '@/components/date/formatDate';


const DriverDashboard = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  const [error, setError] = useState<string | null>(null); // Added error state
  const { user, loading: authLoading } = useAuth();
  const userId = user?.user_id;
  const [vanData, setVanData] = useState<Van | null>(null);
  const [firstName, setFirstName] = useState<string>(data?.user.first_name || ''); // Added state for first name
  const [lastName, setLastName] = useState<string>(data?.user.last_name || ''); // Added state for last name
  const [email, setEmail] = useState<string>(data?.user.email || ''); // Added state for email
  const [location, setLocation] = useState<string>(data?.driver.Location || ''); // Added state for location
  const [phoneNumber, setPhoneNumber] = useState<string>(data?.driver.phoneNumber || ''); // Added state for phone number
  const [experience, setExperience] = useState<string>(''); // Added state for experience
  const [vanId, setVanId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && userId) {
      const fetchData = async () => {
        try {
          const result = await getDriver(userId as any);
          setData(result);
          console.log('Driver Data:', result); // Log the entire driver data
        } catch (err) {
          setError('Error fetching user and driver details');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userId, authLoading]);

  useEffect(() => {
    if (data) {
      console.log('Driver Data:', data); // Log the entire driver data
      setFirstName(data.user.first_name);
      setLastName(data.user.last_name);
      setEmail(data.user.email);
      setLocation(data.driver.Location);
      setPhoneNumber(data.driver.phoneNumber);
      setExperience(data.driver.experience_years === 0 ? '' : `${data.driver.experience_years}`);
      setVanId(data.driver.van_id as any);
    }
  }, [data]);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setExperience(value);
    }
  };

  const handleUpdateDriver = async () => {
    // Confirmation before submission
    const confirmUpdate = SweetAlert.showConfirm("Are you sure you want to update your information?");
    if (!confirmUpdate) return; // Exit if the user cancels

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      experience_years: experience ? parseInt(experience) : 0,
      vehicle_assigned: 'VAN-05',
      phoneNumber: phoneNumber,
      location: location,
    };

    try {
      await updateDriver(userId as any, updatedData);
      setIsModalOpen(false);
      const result = await getDriver(userId as any);
      setData(result);
    } catch (err) {
      setError('Error updating driver information');
      console.error(err);
    }
  };


  useEffect(() => {
    const fetchVanDetails = async () => {
      if (!vanId) return;
      try {
        const data = await getVanDetailsById(vanId as any);
        setVanData(data.data);
      } catch (error: any) {
        console.error('Error fetching van details:', error);
        setError('Failed to fetch van details');
      }
    };

    fetchVanDetails();
  }, [vanId]);


  return (
    <div className='w-full'>
      {error && <p className='text-red-500'>{error}</p>}
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
        <div className="flex  w-[50%]">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <h1 className="text-[18px] font-bold mb-4 text-blackColor">{data?.user.first_name} {data?.user.last_name}</h1>
            <p className="text-gray-700 flex gap-4"><strong>ID:</strong>DR-0{data?.driver.driver_id}</p>
            <div className="table w-full">
              <div className="table-row">
                <p className="table-cell font-semibold">Email:</p>
                <span className="table-cell">{data?.user.email}</span>
              </div>
              <div className="table-row">
                <p className="table-cell font-semibold">Van Assigned:</p>
                <span className="table-cell">VAN-O{data?.driver.van_id || 'N/A'}</span>
              </div>
              <div className="table-row">
                <p className="table-cell font-semibold">Driver Experience:</p>
                <span className="table-cell">
                  {data?.driver.experience_years === 0 ? 'N/A' : `${data?.driver.experience_years} years of Experience`}
                </span>
              </div>
              <div className="table-row">
                <p className="table-cell font-semibold">Phone Number:</p>
                <span className="table-cell">{data?.driver.phoneNumber || 'N/A'}</span>
              </div>
              <div className="table-row">
                <p className="table-cell font-semibold">Location:</p>
                <span className="table-cell">{data?.driver.Location || 'N/A'}</span>
              </div>
            </div>
            <div className='pt-4 flex justify-end'>
              <Button name='Update Your Info' width='180px' onClick={handleOpenModal} icon={BsPencilSquare} />
            </div>
          </div>
        </div>

        {/* Van Assigned Section */}
        <div className='w-[50%]'>
          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h1 className="text-xl font-bold mb-4 text-blackColor">Van Assigned</h1>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <Image
                src={vanData?.van_image || "/png/van/van1.png"}
                alt="Van"
                className=" object-cover rounded-md mr-4"
                width={300}
                height={200}
              />
              <div className="table w-[80%]">
                <div className="table-row">
                  <p className="table-cell font-semibold">Van ID:</p>
                  <span className="table-cell">VAN-O{vanData?.van_id || 'N/A'}</span>
                </div>
                <div className="table-row">
                  <p className="table-cell font-semibold">Model:</p>
                  <span className="table-cell">{vanData?.van_name || 'N/A'}</span>
                </div>
                <div className="table-row">
                  <p className="table-cell font-semibold">Things Capacity:</p>
                  <span className="table-cell truncate">{`${vanData?.things_capacity} kg`}</span>
                </div>
                <div className="table-row">
                  <p className="table-cell font-semibold">Number of Passenger  :</p>
                  <span className="table-cell truncate">{`${vanData?.people_capacity} `}</span>
                </div>
                <div className="table-row">
                  <p className="table-cell font-semibold">Assigned Date:</p>
                  <span className="table-cell truncate">{formatDatePublicRange(vanData?.createdAt || 'N/A')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} width="500px" >
        <div className='w-full bg-white rounded-[5px]'>
          <div className='w-full h-[60px] flex pl-4 items-start justify-center bg-primaryColor rounded-t-[5px] flex-col text-white'>
            <h2 className="text-[20px] text-white font-medium">Update Your Information</h2>
            <p className='font-normal text-[14px]'>Here you can update your information.</p>
          </div>
          <div className='w-full p-4 flex flex-col gap-2'>
            <div className='flex w-full gap-4'>
              <div className='w-full'>
                <label htmlFor="" className='text-[14px]'>First Name</label>
                <InputField value={firstName} onChange={(e) => setFirstName(e.target.value)}></InputField>
              </div>
              <div className='w-full'>
                <label htmlFor="" className='text-[14px]'>Last Name</label>
                <InputField value={lastName} onChange={(e) => setLastName(e.target.value)}></InputField>
              </div>
            </div>
            <div className='w-full'>
              <label htmlFor="" className='text-[14px]'>Email </label>
              <InputField value={email} onChange={(e) => setEmail(e.target.value)}></InputField>
            </div>
            <div className='w-full'>
              <label htmlFor="" className='text-[14px]'>Location  </label>
              <InputField value={location} onChange={(e) => setLocation(e.target.value)}></InputField>
            </div>
            <div className='w-full'>
              <label htmlFor="" className='text-[14px]'>Phone Number </label>
              <InputField
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={11}
              ></InputField>
            </div>
            <div className='w-full'>
              <label htmlFor="" className='text-[14px]'>How many years or months of driving experience do you have?</label>
              <InputField value={experience} onChange={handleExperienceChange} placeholder='Enter a number only'></InputField>
            </div>
          </div>
          <div className='w-full flex gap-4 p-2 px-[2rem]'>
            <Button name='CANCEL' onClick={handleCloseModal} ></Button>
            <Button name='SUBMIT INFO' onClick={handleUpdateDriver} ></Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DriverDashboard;
