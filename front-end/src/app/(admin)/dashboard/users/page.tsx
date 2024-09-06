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
import { useFetchAllUser, useFetchAddUser } from '@/lib/hooks/useUser'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatDateRange } from '@/components/date/formatDate'

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
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
  const { data: addingUser } = useFetchAddUser();


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



  const handleSubmit = (event: { preventDefault: () => void }) => {
    SweetAlert.showSuccess('KEY RA MAN')
  };


  return (
    <div className='w-full'>
      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[16px] border-b-2 border-gray-300 text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Users</h1>
        </AdminHeader>
      </div>
      <div className='w-full'>
        <div className='w-full flex gap-2 py-5'>
          <Button name='ADD USER' onClick={openModal} width='180px' height='35px'></Button>
          <Button name='Filter By : ' width='150px' height='35px'></Button>
          <Modal isOpen={isModalOpen} width='500px' height='300px'>
            <form onSubmit={handleSubmit}>
              <div className='w-full flex justify-between items-center'>
                <h2 className="text-[18px] font-semibold text-blackColor">ADD USER</h2>
                <IoClose onClick={closeModal} className='cursor-pointer font-medium' size={25} />
              </div>
              <div className='w-full py-2 flex flex-col gap-2'>
                <div className='w-full flex gap-2'>
                  <InputField
                    placeholder='First name'
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <InputField
                    placeholder='Last name'
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <InputField
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className='w-full flex gap-2'>
                  <InputField
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputField
                    placeholder='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className='w-full flex gap-2'>
                  <div className='border font-Poppins text-[15px] w-full h-[40px] outline-none rounded-[3px] px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px] flex items-center justify-between'>
                    <select
                      className='w-full h-full bg-transparent border-none outline-none text-[inherit] text-[#848897]'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="" disabled>Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Driver</option>
                    </select>
                  </div>
                  <InputField
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <Button type='submit' name='Submit' />
            </form>
          </Modal>
          <InputField placeholder="Search ..." height='35px' />
        </div>
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
            body={(rowData) => `${formatDateRange(rowData.createdAt)}`}
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
  );
};

export default UsersPage;
