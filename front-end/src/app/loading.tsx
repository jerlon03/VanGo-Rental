import React from 'react'
import Image from 'next/image'

const LoadingComponents = () => {
  return (
    <div className=' flex h-screen w-full justify-center items-center flex-col'>
      <Image src='/van_gif.gif' width={200} height={50} alt='Loading Components' />
      <p className='text-primaryColor text-[24px]  mt-[-2rem] animate-loading font-semibold'>
        Van<span className=' font-bold'>GO</span> Rental <span className=''>.....</span>
      </p>
    </div>
  )
}

export default LoadingComponents
