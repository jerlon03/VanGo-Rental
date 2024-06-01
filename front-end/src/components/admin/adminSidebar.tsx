import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { MdDashboard } from "react-icons/md";


const adminSidebar = () => {
  return (
    <div className='w-[220px] bg-primaryColor h-screen fixed left-0' >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <div className='flex items-center justify-between px-[3%] py-5 border-b-2'>
            <Image src='/logo.svg' width={45} height={43} alt='Logo'></Image>
            <p className='font-Poppins text-[16px] text-white'>VanGo Rental</p>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </div>
          <div className='w-full text-white py-[80px]  flex-col gap-[1rem] px-2 cursor-pointer '>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white  rounded-[5px] p-2 group'> 
              <MdDashboard color='white'  size={20} />
              <p className='font-Poppins hover:text-black group-hover:font-medium text-[16px] group-hover:text-black'>Dashboard</p>
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white  rounded-[5px] p-2 group'> 
              <MdDashboard color='white'  size={20} />
              <p className='font-Poppins hover:text-black group-hover:font-medium text-[16px] group-hover:text-black'>Inventory</p>
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white  rounded-[5px] p-2 group'> 
              <MdDashboard color='white'  size={20} />
              <p className='font-Poppins hover:text-black group-hover:font-medium text-[16px] group-hover:text-black'>Manage Bookings</p>
            </div>
            <div className='flex items-center gap-[1rem] w-full hover:bg-white rounded-[5px] p-2 group'> 
              <MdDashboard color='white'  size={20} />
              <p className='font-Poppins hover:text-black group-hover:font-medium text-[16px] group-hover:text-black'>Posting</p>
            </div>
           
          </div>
        </div>
        <div className='flex flex-col items-center gap-[0.5rem] border-t-2 py-2 px-2'>
          <div className='flex items-center'>
            <Image src="/logo.svg" width={45} height={45} alt='profile' className='cursor-pointer'></Image>
            <p className='font-Poppins text-white cursor-pointer'>Jerlon Abayon</p>
          </div>
          <div className='flex items-center w-full gap-[1rem] justify-center p-1 transition duration-300 hover:bg-white hover:rounded-[5px] group cursor-pointer'>
            <FontAwesomeIcon icon={faRightFromBracket} className='w-[20px] h-[20px] text-white group-hover:text-black' />
            <p className='font-Poppins group-hover:font-semibold text-white group-hover:text-black '>Log Out</p>
          </div>
        </div>
      </div>
     
      
    </div>
  )
}

export default adminSidebar