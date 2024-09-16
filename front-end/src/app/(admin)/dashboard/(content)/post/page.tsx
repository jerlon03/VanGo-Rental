'use client'
import AdminHeader from '@/components/admin/adminHeader'
import SweetAlert from '@/components/alert/alert'
import Button from '@/components/Button/button'
import InputField from '@/components/Form/inputfield'
import TableForm from '@/components/Form/tableForm'
import { IoClose } from '@/components/icons'
import Modal from '@/components/modals/modalContainer'
import Pagination from '@/components/pagination/pagination'
import Link from 'next/link'
import React, { useState } from 'react'

const AdminPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const active = 'ACTIVE';
  const notActive = 'INACTIVE';
  // API DATA
  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com', role: 'Driver', phoneNumber: '09933711025', status: `${active}` },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane.smith@example.com', role: 'Admin', phoneNumber: '09933711025', status: `${notActive}` },
    { id: 3, name: 'Jerlon Abayon', age: 20, email: 'jerlon.abayon@example.com', role: 'Customer', phoneNumber: '09933711025', status: `${active}` },
  ];

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Full Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Status', key: `status` }
  ];


  // actions
  const handleEdit = (row: any) => {
    // Handle edit action
    console.log('Edit:', row);
    SweetAlert.showConfirm('Are you sure you want to Edit?')
  };

  const handleDelete = async (row: any) => {
    console.log('Delete:', row);
    const confirmed = await SweetAlert.showConfirm('Are you sure you want to Delete?');
    if (confirmed) {
      SweetAlert.showSuccess('You successfully Deleted.');
    } else {
      console.log('Deletion canceled.');
    }
  };

  // pagination
  const totalPages = 10;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* modal */}
      <Modal isOpen={isModalOpen} width='500px'>
        <form action="">
          <div className='w-full flex justify-between items-center'>
            <h2 className="text-[18px] font-semibold text-blackColor">ADD POST</h2>
            <IoClose onClick={closeModal} className='cursor-pointer font-medium' size={25} />
          </div>
          <div>sample modal</div>
        </form>
      </Modal>

      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[16px] border-b-2 border-gray-300 text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Posting</h1>
        </AdminHeader>
      </div>
      <div className='w-full'>
        <div className='w-full flex gap-2 py-5 justify-end'>
          <Button name='ADD POST' onClick={openModal} width='180px' height='35px'></Button>
          <Button name='Filter By : ' width='150px' height='35px'></Button>
          <InputField placeholder="Search ..." height='35px' width='220px'/>
        </div>
        <TableForm data={data} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default AdminPost
