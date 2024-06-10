import React from 'react'
import Image from 'next/image'

const NofFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Image src="/notfound.png" width={800} height={800} alt='Not Found '></Image>
    </div>
  )
}

export default NofFound
