'use client'
import AdminHeader from '@/components/admin/adminHeader'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { fetchAllVan } from '@/lib/api/van.api'
import { Van } from '@/lib/types/van.type'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from '@/components/icons'
import { formatDateRange } from '@/components/date/formatDate'
import Button from '@/components/Button/button'
import Modal from '@/components/modals/modalContainer'
import { fetchAddVan } from '@/lib/api/van.api';
import SweetAlert from '@/components/alert/alert'

const VanInventory = () => {
  const [vans, setVans] = useState<Van[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVan, setNewVan] = useState({
    van_name: '',
    van_description: '',
    van_image: '',
    people_capacity: 0,
    transmission_type: '',
    things_capacity: 0,
  });

  const initialVanState = {
    van_name: '',
    van_description: '',
    van_image: '',
    people_capacity: 0,
    transmission_type: '',
    things_capacity: 0,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVan(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (!newVan.van_name || !newVan.van_description || !newVan.van_image || 
        !newVan.people_capacity || !newVan.transmission_type || !newVan.things_capacity) {
      SweetAlert.showError('Please fill out all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Adjust this based on how you store the token
      if (!token) {
        SweetAlert.showError('You are not authorized. Please log in.');
        return;
      }

      const res = await fetch('http://localhost:8080/api/van/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the Authorization header
        },
        body: JSON.stringify({
          ...newVan,
          status: 'available' // Add default status
        }),
      });

      const data = await res.json();
      if (res.ok) {
        SweetAlert.showSuccess('Van added successfully');
        setNewVan(initialVanState); // Reset the form
        setIsModalOpen(false); // Close the modal after success
        // Refresh the van list
        const updatedVans = await fetchAllVan();
        setVans(updatedVans.data);
      } else {
        SweetAlert.showError(data.message || 'Failed to add van');
      }
    } catch (error) {
      SweetAlert.showError('Failed to add van');
      console.error('Error:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchVans = async () => {
      try {
        const vanData = await fetchAllVan();
        setVans(vanData.data); // Assuming the data comes in the `data` field
      } catch (error) {
        setError('Failed to fetch vans.');
      }
    };

    fetchVans();
  }, []);


  function onEditClick(rowData: any): void {
    throw new Error('Function not implemented.')
  }
  function onDeleteClick(rowData: any): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className='w-full'>
      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[14px] flex items-end  text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Van Inventory</h1>
        </AdminHeader>
      </div>
      <div className='w-full p-[2%]'>
        <div className='flex justify-end py-[1rem]'>
          <Button name='ADD VAN' onClick={openModal} width='180px' height='35px'></Button>
        </div>
        <div>
          
        </div>
        <DataTable
          value={vans}
          tableStyle={{ minWidth: '50rem' }}
          pt={{
            thead: { className: 'bg-primaryColor text-white' },
            tbody: { className: 'border ' },
            headerRow: { className: 'h-[40px] ' },
          }}
        >
          <Column
            header="Van Name"
            field="van_name"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' }
            }}
          />
          <Column
            header="Image"
            field="van_image"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' }
            }}
          />
          <Column
            field="van_description"
            header="Description"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="people_capacity"
            header="People Capacity" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] text-center' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="things_capacity"
            header="Things Capacity" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="transmission_type"
            header="Transmission Type" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            body={(rowData) => `${formatDateRange(rowData.createdAt)}`}
            header="Date Created"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="status"
            header="Status"
            body={(rowData) => {
              let statusClass = '';

              // Apply different styles based on the status value
              switch (rowData.status) {
                case 'available':
                  statusClass = 'bg-green-100 text-green-800';
                  break;
                case 'booked':
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
      </div>

      <Modal isOpen={isModalOpen} width='500px' height='600px'>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Van</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="van_name"
              value={newVan.van_name}
              onChange={handleInputChange}
              placeholder="Van Name"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="van_description"
              value={newVan.van_description}
              onChange={handleInputChange}
              placeholder="Van Description"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="van_image"
              value={newVan.van_image}
              onChange={handleInputChange}
              placeholder="Van Image URL"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="people_capacity"
              value={newVan.people_capacity}
              onChange={handleInputChange}
              placeholder="People Capacity"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="transmission_type"
              value={newVan.transmission_type}
              onChange={handleInputChange}
              placeholder="Transmission Type"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="things_capacity"
              value={newVan.things_capacity}
              onChange={handleInputChange}
              placeholder="Things Capacity"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Van
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default VanInventory
