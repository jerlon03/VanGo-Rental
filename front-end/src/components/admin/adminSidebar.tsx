'use client'
import React, { useState, CSSProperties, useEffect } from 'react';
import Image from 'next/image';
import { MdDashboard, FaCar, AiFillBook, CiSettings, FaFileInvoice, FaUserCog, MdOutlineInventory, MdArrowDropDown } from '@/components/icons/index'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import router from 'next/router';

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}


const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, toggleSidebar }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();


  const getNavLinkClass = (path: string): string => {
    return pathname === path ? 'text-button font-medium bg-white ' : '';
  };
  const getNavLinkStyle = (path: string): CSSProperties => {
    let styles: CSSProperties = {};

    if (pathname === path) {
      styles = {
        color: '#00A8E8',

      };
    }

    return styles;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement && event.target.closest('.dropdown-container'))) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes (assuming Next.js router)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
          <div className='w-full text-white py-[50px] flex flex-col gap-[.3rem] cursor-pointer xl:py-[10px] xl:gap-[2px]'>
            <Link href="/dashboard" className={getNavLinkClass('/dashboard')}>
              <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                <MdDashboard
                  size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle('/dashboard')}
                />
                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Dashboard</p>}
              </div>
            </Link>
            <Link href="/driver" className={getNavLinkClass('/driver')}>
              <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                <FaCar
                  size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle('/driver')}
                />
                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Driver</p>}
              </div>
            </Link>
            <Link href="/manage-booking" className={getNavLinkClass('/manage-booking')}>
              <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                <AiFillBook
                  size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle('/manage-booking')}
                />
                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Manage Booking</p>}
              </div>
            </Link>
            <Link href="/invoice" className={getNavLinkClass('/invoice')}>
              <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                <FaFileInvoice size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle('/invoice')} />
                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Invoice</p>}
              </div>
            </Link>

            <div className={`w-full dropdown-container group ${isOpen ? 'bg-white ' : ''}`}>
              <div
                className='flex items-center justify-between gap-[1rem] w-full hover:bg-white  p-2 group'
                onClick={toggleDropdown}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className='flex gap-[1rem] items-center'>
                  <MdOutlineInventory
                    size={20}
                    className={`${isOpen || isHovering ? 'text-button' : ''}`}
                    style={getNavLinkStyle('')}
                  />
                  <p className={`font-Poppins ${isOpen || isHovering ? 'font-medium' : ''} text-[16px] ${isOpen || isHovering ? 'text-button' : ''}`}>
                    Content
                  </p>
                </div>
                <MdArrowDropDown
                  size={20} 
                  className={`${isOpen || isHovering ? 'text-button' : ''}`}
                  style={getNavLinkStyle('/content')}
                />
              </div>
              {isOpen && (
                <div className="w-full flex flex-col justify-center bg-white rounded-b-md p-1 gap-[2px]">
                  <Link href="/content/post">
                    <div className='flex items-center gap-[1rem] w-full  p-2 group bg-primaryColor ps-[1rem] xl:p-1'>
                      <FaFileInvoice size={15} className='group-hover:text-button text-white' />
                      <p className={`font-Poppins group-hover:font-medium text-white text-[15px] group-hover:text-button`}>Post</p>
                    </div>
                  </Link>
                  <Link href="/content/van-inventory">
                    <div className='flex items-center gap-[1rem] w-full  p-2 group bg-primaryColor ps-[1rem] xl:p-1'>
                      <FaFileInvoice size={15} className={`group-hover:text-button text-white`} />
                      <p className={`font-Poppins group-hover:font-medium text-white text-[15px] group-hover:text-button`}>Van Inventory</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>


            <Link href="/users " className={getNavLinkClass("/users")}>
              <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                <FaUserCog size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle('/users')} />
                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Users</p>}
              </div>
            </Link>
            <Link href="/settings" className={getNavLinkClass("/settings")}>
              <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                <CiSettings size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle('/settings')} />
                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Settings</p>}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
