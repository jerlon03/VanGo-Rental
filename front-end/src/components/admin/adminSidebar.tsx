'use client'
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { MdDashboard } from 'react-icons/md';

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`bg-primaryColor h-screen fixed left-0 transition-width duration-300 ${isCollapsed ? 'w-[60px]' : 'w-[220px]'}`}>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-[3%] py-5 border-b-2`}>
            {!isCollapsed && (
              <div className='flex items-center'>
                <Image src='/logo.svg' width={45} height={43} alt='Logo' />
                <p className='font-Poppins text-[16px] text-white ml-2'>VanGo Rental</p>
              </div>
            )}
            <button onClick={toggleSidebar}>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>
          <div className='w-full text-white py-[50px] flex flex-col gap-[.3rem] px-2 cursor-pointer'>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white rounded-[5px] p-2 group'>
              <MdDashboard size={20} color='white' />
              {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-black'>Dashboard</p>}
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white rounded-[5px] p-2 group'>
              <MdDashboard size={20} color='white' />
              {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-black'>Inventory</p>}
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white rounded-[5px] p-2 group'>
              <MdDashboard size={20} color='white' />
              {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-black'>Manage Bookings</p>}
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white rounded-[5px] p-2 group'>
              <MdDashboard size={20} color='white' />
              {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-black'>Posting</p>}
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white rounded-[5px] p-2 group'>
              <MdDashboard size={20} color='white' />
              {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-black'>Users</p>}
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white rounded-[5px] p-2 group'>
              <MdDashboard size={20} color='white' />
              {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-black'>Invoice</p>}
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-[0.5rem] border-t-2 py-2 px-2'>
          <div className='flex items-center'>
            {!isCollapsed && <Image src='/logo.svg' width={45} height={45} alt='profile' className='cursor-pointer' />}
            {!isCollapsed && <p className='font-Poppins text-white cursor-pointer'>Jerlon Abayon</p>}
          </div>
          <div className='flex items-center w-full gap-[1rem] justify-center p-1 transition duration-300 hover:bg-white hover:rounded-[5px] group cursor-pointer'>
            <FontAwesomeIcon icon={faRightFromBracket} className='w-[20px] h-[20px] text-white group-hover:text-black' />
            {!isCollapsed && <p className='font-Poppins group-hover:font-semibold text-white group-hover:text-black'>Log Out</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
