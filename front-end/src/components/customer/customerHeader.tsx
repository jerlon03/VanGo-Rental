import React, { useState } from 'react'
import { IoNotifications, IoPerson, IoChevronDown, IoChevronUp, FaSignOutAlt } from '@/components/icons/index'
import Link from 'next/link'
import { useLogoutContext } from '@/Provider/context/contextProvider';
import { useAuth } from '@/Provider/context/authContext';
interface Props {
    children?: React.ReactNode;
}



const CustomerHeader: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();
    const { setIsOpen, setIsNotificationOpen } = useLogoutContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleLogoutClick = () => {
        setIsOpen(true);
    };
    const handleNotificationClick = () => {
        setIsNotificationOpen(true);
    };
    return (
        <div className='w-full bg-primaryColor h-[40px] flex items-center px-[2%] justify-between'>
            <div className='flex items-center gap-[1rem]'>
                {children}
            </div>
            <div className='w-full flex justify-end gap-[1rem]'>
                <div className='border-r px-2'>
                    <IoNotifications className='text-[18px] text-white'  onClick={handleNotificationClick}/>
                </div>
                <div className='flex gap-[.5rem] relative'>
                    <IoPerson size={20} className='text-white' />
                    {user ? (
                            <div>
                                <p className='font-Poppins text-[16px] text-white'>{user.first_name} {user.last_name}</p>
                            </div>
                        ) : (
                            <p>No user data available</p>
                        )}
                    
                    <button onClick={toggleDropdown}>
                        {isDropdownOpen ? <IoChevronUp className="text-white" /> : <IoChevronDown className="text-white" />}
                    </button>

                    {isDropdownOpen && (
                        <div className='absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg font-Poppins '>
                            <div className='w-full flex px-4 items-center hover:bg-gray-300'>
                                <IoPerson />
                                <Link href="/customer/profile" className='block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-300'>
                                    Manage Profile
                                </Link>
                            </div>
                            <div className='w-full flex px-4 py-2 items-center text-gray-700 hover:bg-gray-300 gap-[1rem]'>
                                <FaSignOutAlt />
                                <button onClick={handleLogoutClick} className='block w-full text-left  text-sm '>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomerHeader
