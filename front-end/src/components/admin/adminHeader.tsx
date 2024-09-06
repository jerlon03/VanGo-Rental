'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoNotifications, CgProfile, IoIosLogOut } from '@/components/icons/index';
import Drop from '@/components/admin/drop';
import { useLogoutContext } from '@/Provider/context/contextProvider';
import Link from 'next/link';


interface Props {
    children?: React.ReactNode;
}
interface User {
    name: string;
    email: string;
    role: string;
  }

const AdminHeader: React.FC<Props> = ({ children }) => {
    const { setIsOpen, setIsNotificationOpen } = useLogoutContext();
    const [user, setUser] = useState<User | null>(null); 
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const res = await fetch('http://localhost:8080/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.status === 200) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.log('Failed to fetch user data.')
                }
            } catch (err) {
                console.log('Error fetching user data.')
            }
        };

        fetchUser();
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

                    <div>
                        <h1>Profile</h1>
                        <p>Name: {user?.name}</p>
                        <p>Email: {user?.email}</p>
                        <p>Role: {user?.role}</p>
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
