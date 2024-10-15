import React, { useState, useEffect, useRef } from 'react'
import { IoNotifications, IoPerson, IoChevronDown, IoChevronUp, FaSignOutAlt } from '@/components/icons/index'
import Link from 'next/link'
import { useLogoutContext } from '@/Provider/context/contextProvider';
import { useAuth } from '@/Provider/context/authContext';
interface Props {
    children?: React.ReactNode;
}



const DriverHeader: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();
    const { setIsOpen } = useLogoutContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleLogoutClick = () => {
        setIsOpen(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside); // Add event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup
        };
    }, []);

    return (
        <div className='w-full h-[40px] flex items-center px-[2%] justify-between'>
            <div className='flex items-center gap-[1rem]'>
                {children}
            </div>
            <div className='w-full flex justify-end gap-[1rem]'>
                <div className='flex gap-[.5rem] relative items-center'>
                    <div className='border-2 p-1 rounded-full border-blackColor '>
                        <IoPerson size={20} className='text-blackColor' />
                    </div>
                    
                    {user ? (
                            <div>
                                <p className='font-Poppins text-[16px] text-blackColor'>{user.first_name} {user.last_name}</p>
                            </div>
                        ) : (
                            <p>No user data available</p>
                        )}
                    
                    <button onClick={toggleDropdown}>
                        {isDropdownOpen ? <IoChevronUp className="text-blackColor" /> : <IoChevronDown className="text-blackColor" />}
                    </button>

                    {isDropdownOpen && (
                        <div ref={dropdownRef} className='absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg font-Poppins '>
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

export default DriverHeader
