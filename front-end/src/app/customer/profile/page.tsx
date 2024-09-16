'use client'
import React from 'react'
import Image from 'next/image';
import { useAuth } from '@/Provider/context/authContext';
import InputField from '@/components/Form/inputfield';
import Button from '@/components/Button/button';
import { IoPerson, MdEmail, CiCalendarDate, CiPhone, CiLocationOn, FaRegEdit } from '@/components/icons/index'
import { formatDateRange } from '@/components/date/formatDate';

const ProfilePage = () => {
    const { user, loading } = useAuth();

    return (
        <div className='w-full'>

            <div className='w-full flex flex-col py-4'>
                <h1 className='text-[18px] text-center tracking-[2px]'>My Profile</h1>
                <form action="" className='w-full flex pt-[2rem] md:flex-col xl:flex-row sm:flex-col'>
                    <div className=' flex items-center basis-1/4 justify-center flex-col '>
                        <Image
                            src='/logo.svg'
                            width={200}
                            height={200}
                            alt='Logo'
                            className='border border-gray-300 p-1 rounded-full shadow-lg'
                        />
                    </div>
                    <div className='w-full grid grid-cols-2 gap-x-[3rem] basis-3/4 md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 gap-y-[1rem]'>
                        <div className='flex items-center gap-[1rem]'>
                            <div className='border p-3 rounded-[50%] bg-primaryColor'>
                                <IoPerson className='text-[24px] text-white' />
                            </div>
                            <div className='sm:w-full md:w-full xl:w-[300px]'>
                                <label htmlFor="" className='text-[14px] font-medium tracking-[1px]'>Full Name</label>
                                <InputField
                                    id="email"
                                    value={`${user?.first_name || ''} ${user?.last_name || ''}`}
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-[1rem]'>
                            <div className='border p-3 rounded-[50%] bg-primaryColor'>
                                <MdEmail className='text-[24px] text-white' />
                            </div>
                            <div className='sm:w-full md:w-full xl:w-[300px]'>
                                <label htmlFor="" className='text-[14px] font-medium tracking-[1px]'>Email</label>
                                <InputField
                                    id="email"
                                    value={user?.email}
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-[1rem]'>
                            <div className='border p-3 rounded-[50%] bg-primaryColor'>
                                <CiLocationOn className='text-[24px] text-white' />
                            </div>
                            <div className='sm:w-full md:w-full xl:w-[300px]'>
                                <label htmlFor="" className='text-[14px] font-medium tracking-[1px]'>Location</label>
                                <InputField
                                    id="email"
                                    value={user?.Location}
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-[1rem]'>
                            <div className='border p-3 rounded-[50%] bg-primaryColor'>
                                <CiPhone className='text-[24px] text-white' />
                            </div>
                            <div className='sm:w-full md:w-full xl:w-[300px]'>
                                <label htmlFor="" className='text-[14px] font-medium tracking-[1px]'>Phone Number</label>
                                <InputField
                                    id="email"
                                    value={user?.phoneNumber}
                                />
                            </div>

                        </div>
                        <div className='flex items-center gap-[1rem]'>
                            <div className='border p-3 rounded-[50%] bg-primaryColor'>
                                <CiCalendarDate className='text-[24px] text-white' />
                            </div>
                            <div className='sm:w-full md:w-full xl:w-[300px]'>
                                <label htmlFor="" className='text-[14px] font-medium tracking-[1px]'>Date Created</label>
                                <InputField
                                    id="email"
                                    value={formatDateRange(user?.createdAt as any)}
                                />
                            </div>

                        </div>
                    </div>
                </form>
                <div className='pt-[3rem] w-full flex justify-end md:justify-center sm:justify-center'>
                    <Button name='Edit Profile' width='160px' icon={FaRegEdit} iconSize='20px'></Button>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage
