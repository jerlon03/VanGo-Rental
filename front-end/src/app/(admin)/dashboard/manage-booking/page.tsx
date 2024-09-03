import AdminHeader from '@/components/admin/adminHeader'
import Link from 'next/link'
import React from 'react'

const ManageBooking = () => {
  return (
    <div>
       <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[16px] border-b-2 border-gray-300 text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Manage Booking</h1>
        </AdminHeader>
      </div>
    </div>
  )
}

export default ManageBooking
