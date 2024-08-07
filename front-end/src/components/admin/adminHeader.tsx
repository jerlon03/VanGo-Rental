// adminHeader.tsx
'use client'
import React from 'react';
import Image from 'next/image';
import { IoNotifications, CgProfile, IoIosLogOut } from '@/components/icons/index';
import Drop from '@/components/admin/drop';
import { useLogoutContext } from '@/Provider/context/contextProvider'; 

interface Props {
    children?: React.ReactNode;
}

const AdminHeader: React.FC<Props> = ({ children }) => {
    const { setIsOpen } = useLogoutContext();

    const handleLogoutClick = () => {
        setIsOpen(true); 
    };

    return (
        <div className='flex justify-between w-full items-center'>
            <div className='flex items-center gap-[1rem]'>
                {children}
            </div>
            <div className='flex gap-[5px] items-center'>
                <IoNotifications size={25} className='text-button' />
                <div className="flex items-center relative">
                    <Image src="/logo.svg" width={30} height={30} alt='Profile' />
                    <p className='ml-1'>Jerlon Abayon</p>
                    <Drop>
                        <div className='flex flex-col w-[120px]'>
                            <div
                                className='flex w-full gap-[5px] hover:bg-button p-1 hover:text-button hover:rounded-md cursor-pointer'
                            >
                                <CgProfile size={20} className='text-primaryColor' />
                                <span className="text-[14px] text-black">Profile</span>
                            </div>
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
