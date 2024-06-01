import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { MdDashboard } from "react-icons/md";


const adminSidebar = () => {
  return (
    <div className='w-[250px] bg-primaryColor h-screen sticky left-0' >
      <div>
        <div className='flex items-center justify-between px-[3%] py-5 border-b-2'>
          <Image src='/logo.svg' width={45} height={43} alt='Logo'></Image>
          <p className='font-Poppins text-[16px] text-white'>VanGo Rental</p>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
        <div className='w-full text-white py-[50px] flex justify-start px-[50px] flex-col gap-[1rem]'>
          <ul className='flex items-center gap-[1rem] w-full hover:bg-white'> 
            <MdDashboard color='white'  size={20}  />
            <li className=''>DASHBOARD</li>
          </ul>
          <ul className='flex items-center gap-[1rem]'> 
            <Image src="/dashboard.svg" width={18} height={18} alt='DASHBOARD'></Image>
            <li>DASHBOARD</li>
          </ul>
          <ul className='flex items-center gap-[1rem]'> 
            <Image src="/dashboard.svg" width={18} height={18} alt='DASHBOARD'></Image>
            <li>DASHBOARD</li>
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default adminSidebar