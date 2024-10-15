'use client'
import React, { useState, CSSProperties, useEffect } from 'react';
import Image from 'next/image';
import { MdDashboard, AiFillBook, FaFileInvoice, FaMapLocationDot, LuCalendarCheck, IoNotifications, MdKeyboardArrowDown, MdKeyboardArrowUp } from '@/components/icons/index'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogoutContext } from '@/Provider/context/contextProvider';


interface AdminSidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}


const DriverSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const pathname = usePathname();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Added state for modal visibility
    const [isScheduleDropdownOpen, setIsScheduleDropdownOpen] = useState(false); // Added state for dropdown visibility

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
    const handleNotificationClick = () => {
        setIsNotificationOpen(true); // Open the notification modal
    };

    const closeModal = () => {
        setIsNotificationOpen(false); // Close the notification modal
    };

    const toggleScheduleDropdown = () => {
        setIsScheduleDropdownOpen(prev => !prev); // Toggle dropdown visibility
    };

    // New function to handle menu item clicks
    const handleMenuItemClick = () => {
        if (isScheduleDropdownOpen) {
            setIsScheduleDropdownOpen(false); // Close dropdown if it's open
        }
    };

    // New useEffect to handle dropdown state based on pathname
    useEffect(() => {
        if (!pathname.startsWith('/driver/schedule')) {
            setIsScheduleDropdownOpen(false); // Close dropdown if not in schedule routes
        }
    }, [pathname]); // Dependency on pathname

    return (
        <div className={`bg-primaryColor h-screen fixed left-0 transition-width duration-300 ${isCollapsed ? 'w-[60px]' : 'w-[220px]'}`}>
            <div className='flex flex-col justify-between h-full'>
                <div className='w-full'>
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
                    <div>

                    </div>
                    <div className='w-full text-white py-[50px] flex flex-col gap-[.3rem] cursor-pointer xl:py-[10px] xl:gap-[2px]'>
                        <Link href="/driver" className={getNavLinkClass('/driver')}>
                            <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                                <MdDashboard
                                    size={20}
                                    className={`text-white group-hover:text-button`}
                                    style={getNavLinkStyle('/driver')}
                                />
                                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px]'>Dashboard</p>}
                            </div>
                        </Link>
                        <div className='flex items-center gap-[1rem] w-full p-2 group' onClick={() => { toggleScheduleDropdown(); handleMenuItemClick(); }}>
                            <LuCalendarCheck
                                size={20}
                                className={`text-white group-hover:text-button`}
                                style={getNavLinkStyle('/customer')}
                            />
                            {!isCollapsed && (
                                <>
                                    <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px]'>View Schedule</p>
                                    {isScheduleDropdownOpen ? (
                                        <MdKeyboardArrowUp size={20} className={`text-white group-hover:text-button`} />
                                    ) : (
                                        <MdKeyboardArrowDown size={20} className={`text-white group-hover:text-button`} />
                                    )}
                                </>
                            )}
                        </div>
                        {isScheduleDropdownOpen && ( // Render dropdown if open
                            <div className='ml-8 flex flex-col bg-white rounded-l shadow-md'>
                                <Link href="/driver/schedule/calendar" className={`flex  gap-2  rounded-l p-2 hover:bg-gray-200 text-blackColor font-medium ${getNavLinkClass('/driver/schedule/calendar')}`}>
                                    <LuCalendarCheck
                                        size={20}
                                        className={`text-blackColor group-hover:text-button`}
                                        style={getNavLinkStyle('/driver/schedule/calendar')}
                                    />
                                    {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px]'>My Calendar</p>}
                                </Link>
                                <Link href="/driver/schedule/assigned-trips" className={` flex  gap-2 rounded-l p-2 hover:bg-gray-200 text-blackColor font-medium ${getNavLinkClass('/driver/schedule/assigned-trips')}`}>

                                    <FaMapLocationDot
                                        size={20}
                                        className={`text-blackColor group-hover:text-button`}
                                        style={getNavLinkStyle('/driver/schedule/assigned-trips')}
                                    />
                                    {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px]'>Assigned Trips</p>}
                                </Link>
                            </div>
                        )}
                        {/* <Link href="/driver/assigned-trips" className={getNavLinkClass('/driver/assigned-trips')}>
                            <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                                <FaMapLocationDot
                                    size={20}
                                    className={`text-white group-hover:text-button`}
                                    style={getNavLinkStyle('/driver/assigned-trips')}
                                />
                                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px]'>Assigned Trips</p>}
                            </div>
                        </Link> */}
                        <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group ' onClick={() => { handleMenuItemClick(); handleNotificationClick(); }}>
                            <IoNotifications
                                size={20}
                                className={`text-white group-hover:text-button`}
                            />
                            {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px]'>Notification</p>}
                        </div>

                    </div>
                </div>
            </div>
            {isNotificationOpen && ( // Render the modal if open
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-lg font-bold">Notifications</h2>
                        {/* Add your notification content here */}
                        <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverSidebar;
