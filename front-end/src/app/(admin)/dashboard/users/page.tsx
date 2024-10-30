'use client'
import AdminHeader from '@/components/admin/adminHeader'
import Button from '@/components/Button/button'
import { FaRegEdit, IoClose, MdDeleteOutline } from '@/components/icons'
import Modal from '@/components/modals/modalContainer'
import React, { useState } from 'react'
import InputField from '@/components/Form/inputfield'
import SweetAlert from '@/components/alert/alert'
import Pagination from '@/components/pagination/pagination'
import Link from 'next/link'
import { useFetchAllUser } from '@/lib/hooks/useUser'
import {addUser} from '@/lib/api/user.api'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatDateRange, formatDatePublicRange } from '@/components/date/formatDate'

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('driver'); // Set default value to 'driver'
  const [phoneNumber, setPhoneNumber] = useState('');
  const itemPerPage = 10;


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // API DATA
  const { data: users = [], isLoading, error } = useFetchAllUser();

  // actions
  const onEditClick = (row: any) => {
    // Handle edit action
    console.log('Edit:', row);
    SweetAlert.showConfirm('Are you sure you want to Edit?')
  };

  const onDeleteClick = async (row: any) => {
    console.log('Delete:', row);
    const confirmed = await SweetAlert.showConfirm('Are you sure you want to Delete?');
    if (confirmed) {
      SweetAlert.showSuccess('You successfully Deleted.');
    } else {
      console.log('Deletion canceled.');
    }
  };
  // pagination
  const totalPages = Math.ceil(users.length / itemPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = users.slice(startIndex, endIndex);



  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) { // Check if passwords match
        SweetAlert.showError('Passwords do not match.'); // Show error message
        return; // Exit the function if they do not match
    }
    try {
        const newUser = {
            first_name,
            last_name,
            email,
            password,
            role: 'driver', 
            phoneNumber: phoneNumber
        };
        await addUser(newUser as any); // Call the addUser function with the new user data
        SweetAlert.showSuccess('User added successfully!'); // Show success message
        
        // Clear input fields after successful submission
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber(''); // Clear phone number field
        setRole('user'); // Reset role to default
        
        closeModal(); // Close the modal after successful submission
    } catch (error: any) {
        // Check if the error response has a status code of 400
        if (error.response && error.response.status === 400) {
            SweetAlert.showError(error.response.data.message || 'Failed to add user.'); // Show specific error message
        } else {
            SweetAlert.showError('Failed to add user.'); // Show generic error message for other errors
        }
    }
  };


  return (
    <div className='w-full'>
      <Modal isOpen={isModalOpen} width='500px' height='auto' onClose={closeModal}>
        <div className='bg-white rounded-[5px] w-full shadow-lg'>
          <div className='w-full h-[50px] flex px-4 items-center justify-between bg-primaryColor rounded-t-[5px]'>
            <h2 className="text-[20px] text-white font-medium">ADD DRIVERS</h2>
            <IoClose onClick={closeModal} className='text-white cursor-pointer font-medium' size={25} />
          </div>
          <form onSubmit={handleSubmit} className='w-full p-4'>
            <div className='flex gap-4 mb-4'>
              <InputField
                placeholder='First name'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className={`flex-1 w-full ${!first_name && 'border-red-500'}`} // Add red border if empty
                required 
              />
              <InputField
                placeholder='Last name'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className={`flex-1 w-full ${!last_name && 'border-red-500'}`} // Add red border if empty
                required // Make field required
              />
            </div>
            <InputField
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mb-4 w-full ${!email && 'border-red-500'}`} // Add red border if empty
              required // Make field required
            />
            <div className='flex gap-4 mb-4'>
              <InputField
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`flex-1 w-full ${!password && 'border-red-500'}`} // Add red border if empty
                required // Make field required
              />
              <InputField
                placeholder='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`flex-1 w-full ${!confirmPassword && 'border-red-500'}`} // Add red border if empty
                required // Make field required
              />
            </div>
            <div className='flex gap-4 mb-4'>
              <div className='flex-1'>
                <select
                  className={`w-full h-[40px] border rounded-[3px] px-2 ${!role && 'border-red-500'}`} // Add red border if empty
                  value={role} // Set value to the state variable 'role'
                  onChange={(e) => setRole(e.target.value)}
                  disabled // Keep the select input disabled
                  required // Make field required
                >
                  <option value="driver">Driver</option> {/* Default value displayed */}
                  <option value="admin">Admin</option>
                </select>
              </div>
              {/* Removed Phone Number Input Field */}
            </div>
            <Button type='submit' name='Submit' className='w-full mt-4' />
          </form>
        </div>
      </Modal>
      <div className='w-full pb-3'>
        <AdminHeader>
          <h1 className='text-[14px] flex h-full items-end text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Users</h1>
        </AdminHeader>
      </div>
      <div className='w-full p-[2%]'>
        <div className='w-full flex gap-2 py-5'>
          <Button name='ADD DRIVERS ACCOUNT' onClick={openModal} width='200px' height='35px'></Button>
          <Button name='Filter By : ' width='150px' height='35px'></Button>
          <InputField placeholder="Search ..." height='35px' />
        </div>
        <div className='w-full'>
          <DataTable
            value={currentItems}
            tableStyle={{ minWidth: '50rem' }}
            pt={{
              thead: { className: 'bg-primaryColor text-white' },
              tbody: { className: 'border ' },
              headerRow: { className: 'h-[40px] ' },
            }}
          >
            <Column
              header="Full Name"
              body={(rowData) => `${rowData.first_name} ${rowData.last_name}`}
              pt={{
                bodyCell: { className: 'border text-blackColor p-2' },
                headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' }
              }}
            />
            <Column
              field="email"
              header="Email"
              pt={{
                bodyCell: { className: 'border text-blackColor p-2' },
                headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
              }} />
            <Column
              field="role"
              header="Role" pt={{
                bodyCell: { className: 'border text-blackColor p-2' },
                headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
              }} />
            <Column
              body={(rowData) => `${formatDatePublicRange(rowData.createdAt)}`}
              header="Date Created"
              pt={{
                bodyCell: { className: 'border text-blackColor p-2' },
                headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
              }} />
            <Column
              field="status"
              header="Status"
              body={(rowData) => {
                let statusClass = '';

                // Apply different styles based on the status value
                switch (rowData.status) {
                  case 'active':
                    statusClass = 'bg-green-100 text-green-800';
                    break;
                  case 'inactive':
                    statusClass = 'bg-red-100 text-red-800';
                    break;
                  // case 'pending':
                  //   statusClass = 'bg-yellow-100 text-yellow-800';
                  //   break;
                  default:
                    statusClass = 'bg-gray-100 text-gray-800';
                }

                return (
                  <span className={`px-2 py-1 rounded ${statusClass}`}>
                    {rowData.status}
                  </span>
                );
              }}
              pt={{
                bodyCell: { className: 'border text-blackColor p-2' },
                headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
              }}
            />
            <Column
              header="Actions"
              pt={{
                bodyCell: { className: 'border-b text-blackColor p-2' },
                headerCell: { className: 'rounded-tr-[3px] px-3 font-medium text-[16px] border-r' }
              }}
              body={(rowData) => (
                <div className="flex space-x-2">
                  <FaRegEdit
                    onClick={() => onEditClick(rowData)}
                    className="text-primaryColor cursor-pointer"
                    size={18}
                  />
                  <MdDeleteOutline
                    onClick={() => onDeleteClick(rowData)}
                    className="text-red-400 cursor-pointer"
                    size={22}
                  />
                </div>
              )} />
          </DataTable>
          {totalPages > 1 && (
            <div className='w-full justify-end flex mt-4'>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default UsersPage;
