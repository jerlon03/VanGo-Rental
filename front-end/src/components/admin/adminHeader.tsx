'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoNotifications, CgProfile, IoIosLogOut } from '@/components/icons/index';
import Drop from '@/components/admin/drop';
import { useLogoutContext } from '@/Provider/context/contextProvider';
import Link from 'next/link';
import { useAuth } from '@/Provider/context/authContext';


interface Props {
    children?: React.ReactNode;
}


const AdminHeader: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();
    const { setIsOpen, setIsNotificationOpen } = useLogoutContext();

    const handleLogoutClick = () => {
        setIsOpen(true);
    };

    const handleNotificationClick = () => {
        setIsNotificationOpen(true);
    };

    return (
        <div className='flex justify-between w-full items-center px-[2%] h-[60px] shadow-md'>
            <div className='flex items-center gap-[1rem]'>
                {children}
            </div>
            <div className='flex gap-[5px] items-center'>
                <IoNotifications size={25} className='text-button cursor-pointer' onClick={handleNotificationClick} />
                <div className="flex items-center relative">
                    <Image src="/logo.svg" width={30} height={30} alt='Profile' />
                    <div>
                        {user ? (
                            <div>
                                <h1 className=''>{user.first_name} {user.last_name}  </h1>
                            </div>
                        ) : (
                            <p>No user data available</p>
                        )}
                    </div>
                    <Drop>
                        <div className='flex flex-col w-[120px]'>
                            <Link href="/dashboard/profile">
                                <div className='flex w-full gap-[5px] hover:bg-button p-1 hover:text-button hover:rounded-md cursor-pointer'>
                                    <CgProfile size={20} className='text-primaryColor' />
                                    <span className="text-[14px] text-black">Profile</span>
                                </div>
                            </Link>
                            <div
                                onClick={handleLogoutClick}
                                className='flex w-full gap-[5px] hover:bg-button p-1 hover:text-button hover:rounded-md cursor-pointer'
                            >
                                <IoIosLogOut size={20} className='text-primaryColor' />
                                <span className="text-[14px] text-black">Log Out</span>
                            </div>
                        </div>
                    </Drop>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
