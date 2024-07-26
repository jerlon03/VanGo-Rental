'use client'
import AdminHeader from '@/components/admin/adminHeader'
import Button from '@/components/Button/button'
import { IoClose } from '@/components/icons'
import Modal from '@/components/modals/modalContainer'
import React, { useState } from 'react'
import InputField from '@/components/Form/inputfield'
import TableForm from '@/components/Form/tableForm'
import SweetAlert from '@/components/alert/alert'
import Drop from '@/components/admin/drop'

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com', role: 'Driver', phoneNumber: '09933711025' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane.smith@example.com', role: 'Admin', phoneNumber: '09933711025' },
    { id: 3, name: 'Jerlon Abayon', age: 20, email: 'jerlon.abayon@example.com', role: 'Customer', phoneNumber: '09933711025' },
  ];

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Full Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Phone Number', key: 'phoneNumber'}
  ];

  const handleEdit = (row: any) => {
    // Handle edit action
    console.log('Edit:', row);
    SweetAlert.showConfirm('Are you sure you want to Edit?')
  };

  const handleDelete = async (row: any) => {
    // Handle delete action
    console.log('Delete:', row);
  
    const confirmed = await SweetAlert.showConfirm('Are you sure you want to Delete?');
    if (confirmed) {
      SweetAlert.showSuccess('You successfully Deleted.');
    } else {
      console.log('Deletion canceled.');
    }
  };
  

  return (
    <div className='w-full'>
      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[18px] border-b-2 border-blackColor text-blackColor'>Users</h1>
        </AdminHeader>
      </div>
      <div className='w-full'>
        <div className='w-full flex gap-2 py-5'>
          <Button name='ADD USER' onClick={openModal} width='180px' height='35px'></Button>
          <Button name='Filter By : ' width='150px' height='35px'></Button>
          <Drop>
            <ul>
              <li>Driver</li>
            </ul>
          </Drop>
          <Modal isOpen={isModalOpen} width='500px'>
            <form action="">
              <div className='w-full flex justify-between items-center'>
                <h2 className="text-[18px] font-semibold text-blackColor">ADD USERS</h2>
                <IoClose onClick={closeModal} className='cursor-pointer font-medium' size={25} />
              </div>
              <div className='w-full py-2 flex flex-col gap-2'>
                <div className='w-full flex gap-2'>
                  <InputField placeholder='First name'></InputField>
                  <InputField placeholder='Last name'/>
                </div>
                <InputField placeholder='Email'></InputField>
                <div className='w-full flex gap-2'>
                  <InputField placeholder='Password'></InputField>
                  <InputField placeholder='Confirm Password'></InputField>
                </div>
                <div className='w-full flex gap-2'>
                  <InputField placeholder='Role'></InputField>
                  <InputField placeholder='PhoneNumber'></InputField>
                </div>
              </div>
              <Button name='Submit'></Button>
            </form>
          </Modal>
          <InputField placeholder="Search ..." height='35px' />
        </div>
        <TableForm data={data} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default UsersPage;
