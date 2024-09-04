'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/button';
import InputField from '@/components/Form/inputfield';
import { phoneNumberRegex } from '@/components/regex/formRegex'
import SweetAlert from '@/components/alert/alert';
import { useRouter } from 'next/navigation';
import { ResponseData } from '@/lib/types/user.type'

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [response, setResponse] = useState<ResponseData | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // Check if all fields are filled
        if (!firstName || !lastName || !email || !password) {
            SweetAlert.showError('Please fill out all required fields.');
            return;
        }
    
        // Check if passwords match
        if (password !== confirmPassword) {
            SweetAlert.showError('Passwords do not match.');
            return;
        }
    
        const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        };
    
        try {
            const res = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            const data: ResponseData = await res.json();
            if (res.ok) {
                SweetAlert.showSuccess('Successfully created an Account');
                router.push('/login');
            } else {
                if (res.status === 409) { // Conflict status code indicating email already exists
                    SweetAlert.showError('Email already exists.');
                } else {
                    SweetAlert.showError(data.message || 'Failed to create user');
                }
                setResponse(data);
            }
        } catch (error) {
            setResponse({ error: true, message: 'Failed to create user' });
            SweetAlert.showError('Failed to create user');
        }
    };
    

    return (
        <div className='basis-[35%] h-full w-full bg-primaryColor p-2 max-md:basis-[100%] max-lg:basis-[50%] max-sm:justify-center max-sm:items-center max-sm:h-screen'>
            <div className='curson-pointer'>
                <Link href="/">
                    <Image src="/logo.svg" width={80} height={80} alt='logo' className=' max-md:hidden ' />
                </Link>
            </div>
            <div className='flex w-full flex-col px-[15%] max-lg:px-[3%] max-xl:px-0 max-md:px-[20%] max-sm:px-2 max-sm:pt-[1rem] max-2xl:px-3 pt-[10rem] max-2xl:pt-[4rem] max-xl:pt-0'>
                <div className='flex justify-center flex-col items-center w-full'>
                    <Link href="/">
                        <Image src="/logo.svg" width={80} height={80} alt='logo' className='hidden max-md:block' />
                    </Link>
                    <h1 className='text-[25px] font-semibold text-white max-sm:text-[20px]'>CREATE ACCOUNT</h1>
                    <p className='text-[16px] text-white max-sm:text-[14px]'>Please fill out the required fields to begin.</p>
                </div>
                <form onSubmit={handleSubmit} className='py-6 flex flex-col gap-2 max-xl:text-[14px]'>
                    <div className='flex gap-2 max-lg:flex-col max-md:flex-row max-sm:flex-col max-xl:flex-row'>
                        <div className='flex w-full gap-2 border bg-white rounded-md items-center justify-center px-2'>
                            <FontAwesomeIcon icon={faUser} className='text-primaryColor size-[18px] max-sm:size-[20px]' />
                            <InputField
                                type='text'
                                placeholder='Firstname'
                                border='none'
                                onChange={(e) => setFirstName(e.target.value)}
                               
                            />
                        </div>
                        <div className='flex w-full gap-2 border bg-white rounded-md items-center justify-center px-2'>
                            <FontAwesomeIcon icon={faUser} className='text-primaryColor size-[18px] max-sm:size-[20px]' />
                            <InputField
                                type='text'
                                placeholder='Lastname'
                                border='none'
                                onChange={(e) => setLastName(e.target.value)}
                            
                            />
                        </div>
                    </div>
                    <div className='flex w-full border bg-white rounded-md items-center justify-center px-2'>
                        <FontAwesomeIcon icon={faEnvelope} className='text-primaryColor size-[23px] max-sm:size-[20px]' />
                        <InputField
                            type='email'
                            placeholder='Email Address'
                            border='none'
                            onChange={(e) => setEmail(e.target.value)}
                       
                        />
                    </div>
                    <div className='flex gap-2 max-lg:flex-col max-md:flex-row max-sm:flex-col max-xl:flex-col'>
                        <div className='flex w-full gap-2 border bg-white rounded-md items-center justify-center px-2'>
                            <FontAwesomeIcon icon={faUnlock} className='text-primaryColor size-[23px] max-sm:size-[20px]' />
                            <InputField
                                type='password'
                                placeholder='Password'
                                border='none'
                                onChange={(e) => setPassword(e.target.value)}
                               
                            />
                        </div>
                        <div className='flex w-full gap-2 border bg-white rounded-md items-center justify-center px-2'>
                            <FontAwesomeIcon icon={faUnlock} className='text-primaryColor size-[23px] max-sm:size-[20px]' />
                            <InputField
                                type='password'
                                placeholder='Confirm Password'
                                border='none'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            
                            />
                        </div>
                    </div>
                    <div className='flex w-full border bg-white rounded-md items-center justify-center px-2'>
                        <FontAwesomeIcon icon={faPhone} className='text-primaryColor size-[23px] max-sm:size-[20px]' />
                        <InputField
                            type='text'
                            placeholder='Phone Number'
                            border='none'
                            assetCharacter={phoneNumberRegex}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='flex w-full gap-2  rounded-md max-sm:rounded-[2px] items-center justify-center px-2 bg-button'>
                        <Button type='submit' name='SIGN UP' />
                    </div>
                </form>
                <div className='w-full'>
                    <p className='text-white max-sm:text-[14px]'>Already have an account? <Link href="/login"><span className='text-button'>Sign In</span></Link></p>
                </div>
            </div>
        </div>
    )
}