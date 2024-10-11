import React from 'react'
import AdminHeader from '@/components/admin/adminHeader';
import CurrentDate from '@/components/admin/currentDate';
import Image from 'next/image';
import {FaVanShuttle } from '@/components/icons/index'
import CustomCalendar from '@/components/date/customCalendat';

const AdminDashboard = () => {
  // useState

  return (
    <>
      <div className='w-full'>
        <div className='w-full '>
          <AdminHeader >
            <h1 className='font-semibold text-[20px] text-blackColor'>HELLO ADMIN!</h1>
            <p className=' font-normal text-[15px] '><CurrentDate /></p>
          </AdminHeader>
        </div>
        <div className='w-full p-[2%] flex gap-[40px] pt-4'>
          <div className='w-[50%] grid grid-cols-2  gap-x-6 items-center justify-center'>
            <div className='p-2 rounded-lg  h-[100px]  bg-primaryColor flex items-center gap-4'>
              <div className='rounded-full bg-white  flex justify-center items-center 2xl:h-[70px] lg:h-[50px] xl:h-[60px] 2xl:w-[70px] xl:w-[60px] lg:w-[50px]'>
                <Image src='/complete_booking-removebg-preview.png' width={50} height={30} alt='Complete Booking' className='w-full ' ></Image>
              </div>
              <p className='font-semibold text-white 2xl:text-[20px] xl:text-[18px] lg:text-[16px]'>55 <span>Completed Booking</span></p>

            </div>
            <div className='p-2 rounded-lg  h-[100px]  bg-primaryColor flex items-center gap-4'>
              <div className='rounded-full bg-white p-1 flex justify-center items-center 2xl:h-[70px] lg:h-[50px] xl:h-[60px] 2xl:w-[70px] xl:w-[60px] lg:w-[50px]'>
                <Image src='/pending-booking.png' width={40} height={30} alt='Complete Booking' className='w-full p-3 xl:p-2 lg:p-1 ' ></Image>
              </div>
              <p className='font-semibold text-white 2xl:text-[20px] xl:text-[18px] lg:text-[16px]'>10 <span>Pending Booking</span></p>

            </div>
            <div>1</div>
            <div className='p-2 rounded-lg  h-[100px]  bg-primaryColor flex items-center gap-4'>
              <div className='rounded-full bg-white p-1 flex justify-center items-center 2xl:h-[70px] lg:h-[50px] xl:h-[60px] 2xl:w-[70px] xl:w-[60px] lg:w-[50px]'>
                {/* <Image src='/complete_booking-removebg-preview.png' width={50} height={30} alt='Complete Booking' className='w-full ' ></Image> */}
                <FaVanShuttle className='text-primaryColor' size={40}/>
              </div>
              <p className='font-semibold text-white 2xl:text-[20px] xl:text-[18px] lg:text-[16px]'>8 <span>Available Van</span></p>

            </div>
          </div>
          <div className='w-[50%]'>
            <CustomCalendar />
          </div>
        </div>
      </div>

    </>

  )
}

export default AdminDashboard
