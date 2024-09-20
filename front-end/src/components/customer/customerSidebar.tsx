'use client'
import React, { useState, CSSProperties, useEffect } from 'react';
import Image from 'next/image';
import { MdDashboard, AiFillBook, FaFileInvoice, FaVanShuttle, IoIosLogOut, IoPerson } from '@/components/icons/index'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface AdminSidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}


const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, toggleSidebar }) => {
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
                        <Link href="/customer" className={getNavLinkClass('/customer')}>
                            <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                                <MdDashboard
                                    size={20}
                                    className={`text-white group-hover:text-button`}
                                    style={getNavLinkStyle('/customer')}
                                />
                                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Dashboard</p>}
                            </div>
                        </Link>
                        <Link href="/customer/van" className={getNavLinkClass('/customer/van')}>
                            <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                                <FaVanShuttle
                                    size={20}
                                    className={`text-white group-hover:text-button`}
                                    style={getNavLinkStyle('/customer/van')}
                                />
                                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Van</p>}
                            </div>
                        </Link>
                        <Link href="/dashboard/invoice" className={getNavLinkClass('/dashboard/invoice')}>
                            <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                                <AiFillBook size={20}
                                    className={`text-white group-hover:text-button`}
                                    style={getNavLinkStyle('/dashboard/invoice')} />
                                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>My Booking</p>}
                            </div>
                        </Link>
                        <Link href="/dashboard/users " className={getNavLinkClass("/dashboard/users")}>
                            <div className='flex items-center gap-[1rem] w-full hover:bg-white  p-2 group'>
                                <FaFileInvoice size={20}
                                    className={`text-white group-hover:text-button`}
                                    style={getNavLinkStyle('/dashboard/users')} />
                                {!isCollapsed && <p className='font-Poppins group-hover:font-medium text-[16px] group-hover:text-button'>Terms of Service</p>}
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
