import AdminHeader from '@/components/admin/adminHeader'
import Link from 'next/link'
import React from 'react'


const Profile = () => {
  return (
    <div className='w-full'>
       <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[16px] border-b-2 border-gray-300 text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Profile</h1>
        </AdminHeader>
      </div>
      <div className='w-full'></div>
    </div>
  )
}

export default Profile
