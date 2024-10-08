
import React from 'react'
import AdminHeader from '@/components/admin/adminHeader';
import CurrentDate from '@/components/admin/currentDate';

const AdminDashboard = () => {
  // useState

  return (
    <>
      <div className='w-full'>
        <div className='w-full '>
          <AdminHeader >
            <h1 className='font-semibold text-[20px] text-blackColor'>HELLO ADMIN!</h1>
            <p className=' font-normal text-[15px] '><CurrentDate /></p>
          </AdminHeader>
        </div>
        <div className='w-full p-[2%]'>ADMIN CONTENT</div>
      </div>

    </>

  )
}

export default AdminDashboard
