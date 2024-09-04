// adminHeader.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoNotifications, CgProfile, IoIosLogOut } from '@/components/icons/index';
import Drop from '@/components/admin/drop';
import { useLogoutContext } from '@/Provider/context/contextProvider';
import Link from 'next/link';
import { getUserInfo } from '@/lib/api/user.api';
import { Users } from '@/lib/types/user.type'


interface Props {
    children?: React.ReactNode;
}

const AdminHeader: React.FC<Props> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<Users | null>(null);
    const { setIsOpen, setIsNotificationOpen } = useLogoutContext();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();
                setUserInfo(data);
            } catch (error) {
               console.log('Error fetching user info')

            }
        };

        fetchUserInfo();
    }, []);

    const handleLogoutClick = () => {
        setIsOpen(true);
    };

    const handleNotificationClick = () => {
        setIsNotificationOpen(true);
    };


    return (
        <div className='flex justify-between w-full items-center'>
            <div className='flex items-center gap-[1rem]'>
                {children}
            </div>
            <div className='flex gap-[5px] items-center'>
                <IoNotifications size={25} className='text-button cursor-pointer' onClick={handleNotificationClick} />
                <div className="flex items-center relative">
                    <Image src="/logo.svg" width={30} height={30} alt='Profile' />

                    {userInfo ? (
                        <>
                            <p>Name:{userInfo.first_name} {userInfo.last_name}</p>
                        </>
                    ) : (
                        <p>No user info available</p>
                    )}
                    <Drop>
                        <div className='flex flex-col w-[120px]'>
                            <Link href="/dashboard/profile">
                                <div
                                    className='flex w-full gap-[5px] hover:bg-button p-1 hover:text-button hover:rounded-md cursor-pointer'
                                >
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
