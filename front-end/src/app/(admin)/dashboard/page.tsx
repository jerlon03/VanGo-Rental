
import React from 'react'
import CurrentDate from '@/components/admin/currentDate'
import Image from 'next/image'
import { IoNotifications, CgProfile ,IoIosLogOut } from "@/components/icons/index"
import Drop from '@/components/admin/drop'

const AdminDashboard = () => {
  // useState

  return (
    <>
      <div className='w-full'>
        {/* header */}
        <div>
          <div className='flex justify-between w-full items-center'>
            <div className='flex items-center gap-[1rem]'>
              <h1 className='font-semibold text-[20px] '>HELLO ADMIN!</h1>
              <p className=' font-normal text-[15px] border-b'><CurrentDate /></p>
            </div>
            <div className='flex gap-[5px] items-center'>
              <IoNotifications size={25} className='text-button' />
              <div className="flex items-center ">
                <Image src="/logo.svg" width={30} height={30} alt='Profile'></Image>
                <p className=' '>Jerlon Abayon</p>
                <Drop>
                  <div className='w-full flex flex-col'>
                    <div className='flex w-full gap-[5px] hover:bg-primaryColor p-1 hover:text-button hover:font-medium'>
                      <CgProfile size={20} className='text-button'/>
                      <a href="#" className="text-[15px] text-button" >Profile</a>
                    </div>
                    <div className='flex w-full gap-[5px] hover:bg-primaryColor p-1 hover:text-button hover:font-medium'>
                      <IoIosLogOut size={20} className='text-button'/>
                      <a href="#" className=" text-[15px] text-button" >Log Out</a>
                    </div>
                  </div>
                </Drop>
              </div>
            </div>

          </div>
        </div>


      </div>

    </>

  )
}

export default AdminDashboard
