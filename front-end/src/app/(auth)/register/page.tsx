import React from 'react'
import Image from 'next/image'
import RegisterComponents from '@/components/landing/register'


export default function RegisterPage() {

  return (
    <div className='w-full  h-screen  flex font-Poppins'>
      <RegisterComponents />
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

