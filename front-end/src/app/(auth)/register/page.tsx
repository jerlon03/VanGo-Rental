import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';


const Register = () => {
  return (
    <div className='w-full  h-screen  flex font-Poppins'>
      <div className='basis-[35%] h-full w-full bg-primaryColor p-2 max-md:basis-[100%] max-lg:basis-[50%]max-sm:justify-center max-sm:items-center max-sm:h-screen'>
        <div className='curson-pointer'>
            <Link href="/"> 
                <Image src="/logo.svg" width={80} height={80} alt='logo' className=' max-md:hidden '></Image>
            </Link>
        </div>
        <div className='flex w-full flex-col  px-[15%]  max-lg:px-[3%] max-xl:px-0 max-md:px-[20%] max-sm:px-2  max-sm:pt-[1rem] max-2xl:px-3 pt-[10rem] max-2xl:pt-[4rem] max-xl:pt-0'>
            <div className=' flex justify-center flex-col items-center w-full'>
                <Link href="/"> 
                  <Image src="/logo.svg" width={80} height={80} alt='logo' className='hidden max-md:block'></Image>
                </Link>
                <h1 className='text-[25px] font-semibold text-white max-sm:text-[20px]'>CREATE ACCOUNT</h1>
                <p className='text-[16px] text-white max-sm:text-[14px]'>Please fill out the required fields to begin.</p>
            </div>
            <form action="" className='py-6 flex flex-col gap-2 max-xl:text-[14px]'>
                <div className='flex gap-2 max-lg:flex-col max-md:flex-row max-sm:flex-col  max-xl:flex-row'>
                    <div className='flex w-full gap-2 border  bg-white  rounded-md items-center justify-center px-2'>
                    <FontAwesomeIcon icon={faUser}  className='text-primaryColor size-[18px] max-sm:size-[20px]'/>
                        <input type="text" placeholder='First Name' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                    </div>
                    <div className='flex w-full gap-2 border  bg-white  rounded-md items-center justify-center px-2'>
                    <FontAwesomeIcon icon={faUser}  className='text-primaryColor size-[18px] max-sm:size-[20px]'/>
                        <input type="text" placeholder='Last Name' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                    </div>
                </div>
                <div className='flex w-full border  bg-white  rounded-md items-center justify-center px-2'>
                    <FontAwesomeIcon icon={faEnvelope}  className='text-primaryColor size-[23px] max-sm:size-[20px]'/>
                    <input type="text" placeholder='Email Address / Username' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                </div>
                <div className='flex gap-2 max-lg:flex-col max-md:flex-row max-sm:flex-col max-xl:flex-col'>
                    <div className='flex w-full gap-2 border  bg-white  rounded-md items-center justify-center px-2'>
                        <FontAwesomeIcon icon={faUnlock} className='text-primaryColor size-[23px] max-sm:size-[20px]'/>
                        <input type="password" placeholder='Password' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                    </div>
                    <div className='flex w-full gap-2 border  bg-white  rounded-md items-center justify-center px-2'>
                        <FontAwesomeIcon icon={faUnlock} className='text-primaryColor size-[23px] max-sm:size-[20px]'/>
                        <input type="password" placeholder='Confirm Password' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                    </div>
                </div>
                <div className='flex w-full border  bg-white  rounded-md items-center justify-center px-2'>
                    <FontAwesomeIcon icon={faLocationDot} className='text-primaryColor size-[23px] max-sm:size-[20px]'/>
                    <input type="text" placeholder='Location' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                </div>
                <div className='flex w-full border  bg-white  rounded-md items-center justify-center px-2'>
                    <FontAwesomeIcon icon={faPhone}  className='text-primaryColor size-[23px] max-sm:size-[20px]'/>
                    <input type="text" placeholder='Phone Number' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]' />
                </div>
                
                <div className='flex w-full gap-2 borde rounded-md max-sm:rounded-[2px] items-center justify-center px-2 bg-button'>
                    
                    <input type="submit" value="Sign Up" className='w-full h-[40px] max-sm:h-[30px] outline-none  px-2 text-[20px] font-semibold  text-white max-sm:text-[18px]'/>
                </div>
            </form>
            <div className='w-full'>
                <p className='text-white max-sm:text-[14px]'>Already have an account?<Link href="/login"><span  className='text-button'> Sign In </span></Link></p>
            </div>
        </div>
      </div>
      <div className='basis-[65%] border h-full w-full flex justify-center flex-col items-center max-md:hidden   '>
        <h1 className='text-[45px] font-bold'>VanGO Rentals</h1>
        <h3 className='text-[25px]'>Hello, Start your journey with us!</h3>
        <div className='max-w-full '>
          <Image 
            src="/png/register.png" 
            layout="responsive" 
            width={800} 
            height={800} 
            alt='LOGIN' 
            className='object-contain'
          />
        </div>
      </div>
    </div>
  )
}

export default Register;
