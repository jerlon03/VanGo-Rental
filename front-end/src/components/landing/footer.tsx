import React from 'react'
import Image from 'next/image'


const Footer = () => {
  return (
    <div className='bg-primaryColor  w-full px-[3%] p-[1%] flex flex-col gap-[10px] '>
      <div className='flex justify-between max-sm:justify-evenly'>
        <div className=' flex items-center gap-[1rem ] max-sm:pt-[1%]'>
          <Image src="/logo.svg" width={200} height={150} alt="footer image" className='max-sm:hidden'></Image>
          <div className='text-white font-Poppins text-[14px] cursor-pointer'>
            <h2 className='font-semibold text-[18px] max-sm:text-[16px]'>Quick Links</h2>
            <p>Home</p>
            <p>About Us</p>
            <p>Van</p>
            <p>Blog</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div className=' flex flex-col items-center justify-center gap-[7px] pe-[1%]'>
          <h2 className='text-[20px] font-semibold text-white font-Poppins max-sm:text-[16px]'>Follow us</h2>
          <div className='text-[35px] flex gap-[1rem]'>
            <Image src="/icon-facebook.svg" width={40} height={35} alt='FACEBOOK' className='max-sm:w-[30px]'></Image>
            <Image src="/icon-instagram.svg" width={40} height={35} alt='FACEBOOK' className='max-sm:w-[30px]'></Image>
            <Image src="/icon-twitter.svg" width={40} height={35} alt='FACEBOOK' className='max-sm:w-[30px]'></Image>
          </div>
        </div>
      </div>
      <div className='border-t w-full  p-[1%]'>
        <div className='flex justify-between items-center text-white font-Poppins text-[14px]  max-sm:flex-col max-sm:text-[12px]'>
          <p>VanGO Rental: Effortless Van Hire at Your Fingertips</p>
          <p>© 2024 | VanGo Rentals| All Rights Reserved.</p>
        </div>
      </div>
    </div>
   
  )
}

export default Footer
