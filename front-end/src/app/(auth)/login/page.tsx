import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUnlock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  return (
    <div className='w-full  h-screen  flex font-Poppins'>
      <div className='basis-[35%] border h-full w-full bg-primaryColor p-2 max-md:basis-[100%] max-lg:basis-[45%]max-sm:justify-center max-sm:items-center'>
        <div>
            <Image src="/logo.svg" width={80} height={80} alt='logo' className=' max-md:hidden '></Image>
        </div>
        <div className='flex w-full flex-col  px-[15%]  max-lg:px-[3%] max-xl:px-[5%] max-md:px-[20%] max-sm:px-2  pt-[10rem] max-sm:pt-[5rem]'>
            <div className=' flex justify-center flex-col items-center w-full'>
                <Image src="/logo.svg" width={80} height={80} alt='logo' className='hidden max-md:block'></Image>
                <h1 className='text-[25px] font-semibold text-white max-sm:text-[20px]'>LOGIN</h1>
                <p className='text-[16px] text-white max-sm:text-[14px]'>Enter your details below to begin</p>
            </div>
            <form action="" className='py-6 flex flex-col gap-4'>
                <div className='flex w-full gap-2 border  bg-white  rounded-md items-center justify-center px-2'>
                    <FontAwesomeIcon icon={faCircleUser} className='text-black size-[30px] max-sm:size-[20px]'/>
                    <input type="text" placeholder='Enter your Username' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                </div>
                <div className='flex w-full gap-2 border  bg-white  rounded-md items-center justify-center px-2'>
                    <FontAwesomeIcon icon={faUnlock} className='text-black size-[30px] max-sm:size-[20px]'/>
                    <input type="text" placeholder='Password' className='w-full h-[40px] outline-none  px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]'/>
                </div>
                <div className='flex w-full gap-2 borde rounded-md max-sm:rounded-[2px] items-center justify-center px-2 bg-button'>
                    
                    <input type="submit" value="Login" className='w-full h-[40px] max-sm:h-[30px] outline-none  px-2 text-[20px] font-semibold  text-white max-sm:text-[18px]'/>
                </div>
            </form>
            <div className='w-full'>
                <p className='text-button max-sm:text-[14px]'>Forgot Password?</p>
                <div className='flex w-full gap-2 borde rounded-sm py-4'>
                   <button className='bg-white w-full max-sm:text-[14px]'>Login with Google</button>
                   <button className='bg-white w-full max-sm:text-[14px]'>Login with Facebook</button>
                </div>
                <p className='text-white max-sm:text-[14px]'>Doesnt have account? <span  className='text-button'>  Create an account </span></p>
            </div>
        </div>
      </div>
      <div className='basis-[65%] border h-full w-full flex justify-center flex-col items-center max-md:hidden'>
        <h1 className='text-[45px] font-bold'>VanGO Rentals</h1>
        <h3 className='text-[25px]'>Welcome back, its great to have you here again!</h3>
        <Image src="/login.png" height={816} width={800} alt='LOGIN'></Image>
      </div>
    </div>
  )
}

export default Login
