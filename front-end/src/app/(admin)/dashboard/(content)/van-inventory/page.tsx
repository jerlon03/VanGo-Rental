'use client'
import AdminHeader from '@/components/admin/adminHeader'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { fetchAllVan } from '@/lib/api/van.api'
import { Van } from '@/lib/types/van.type'
import { FaRegEdit, FaEye} from 'react-icons/fa'
import { MdDeleteOutline } from '@/components/icons'
import { formatDateRange } from '@/components/date/formatDate'
import Button from '@/components/Button/button'
import Modal from '@/components/modals/modalContainer'
import { fetchAddVan } from '@/lib/api/van.api';
import SweetAlert from '@/components/alert/alert'
import ImagesUploader from '@/components/Uplooad/ImagesUploader'
import InputField from '@/components/Form/inputfield'

const VanInventory = () => {
  const [vans, setVans] = useState<Van[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVan, setNewVan] = useState({
    van_name: '',
    van_description: '',
    people_capacity: '',
    transmission_type: '',
    things_capacity: '',
  });
  const [vanImage, setVanImage] = useState<File | null>(null);
  const [inputErrors, setInputErrors] = useState({
    people_capacity: '',
    things_capacity: '',
  });

  const initialVanState = {
    van_name: '',
    van_description: '',
    people_capacity: '',
    transmission_type: '',
    things_capacity: '',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'people_capacity' || name === 'things_capacity') {
      if (!/^\d*$/.test(value)) {
        setInputErrors(prev => ({ ...prev, [name]: 'Please enter numbers only' }));
      } else {
        setInputErrors(prev => ({ ...prev, [name]: '' }));
      }
      const numericValue = value.replace(/[^0-9]/g, '');
      setNewVan(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setNewVan(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (file: File) => {
    setVanImage(file);
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (!newVan.van_name || !newVan.van_description || !vanImage || 
        !newVan.people_capacity || !newVan.transmission_type || !newVan.things_capacity) {
      SweetAlert.showError('Please fill out all required fields and upload an image.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        SweetAlert.showError('You are not authorized. Please log in.');
        return;
      }

      const formData = new FormData();
      Object.entries(newVan).forEach(([key, value]) => {
        if (key === 'people_capacity' || key === 'things_capacity') {
          formData.append(key, value ? parseInt(value, 10).toString() : '0');
        } else {
          formData.append(key, value.toString());
        }
      });
      formData.append('status', 'available');
      if (vanImage) {
        formData.append('image', vanImage);
      }

      const res = await fetch('http://localhost:8080/api/van/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        SweetAlert.showSuccess('Van added successfully');
        setNewVan(initialVanState);
        setVanImage(null);
        setIsModalOpen(false);
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
            body={(rowData) => (
              <div className="flex justify-center items-center h-full">
                <img 
                  src={rowData.van_image} 
                  alt={`${rowData.van_name} image`}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/path/to/fallback/image.jpg'
                  }}
                />
              </div>
            )}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' }
            }}
          />
          <Column
            field="van_description"
            header="Description"
            style={{ width: '300px' }}
            body={(rowData) => (
              <div className="line-clamp-2" title={rowData.van_description}>
                {rowData.van_description}
              </div>
            )}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }}
          />
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
                <FaEye
                  onClick={() => onDeleteClick(rowData)}
                  className="text-green-400 cursor-pointer"
                  size={22}
                />
              </div>
            )} />
        </DataTable>
      </div>
      {/* ADD MODAL */}
      <Modal isOpen={isModalOpen} width='500px' height='600px' >
        <div className="h-full flex flex-col">
          <h2 className="text-[20px] font-medium p-3 pb-2">Add New Van</h2>
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-3 pt-2">
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
              <div className="space-y-1">
                <input
                  type="text"
                  name="people_capacity"
                  value={newVan.people_capacity}
                  onChange={handleInputChange}
                  placeholder="People Capacity"
                  className="w-full p-2 border rounded"
                  inputMode="numeric"
                />
                {inputErrors.people_capacity && (
                  <p className="text-red-500 text-sm">{inputErrors.people_capacity}</p>
                )}
              </div>
              <select
                name="transmission_type"
                value={newVan.transmission_type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-gray-700"
              >
                <option value="">Select Transmission Type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
              <div className="space-y-1">
                <input
                  type="text"
                  name="things_capacity"
                  value={newVan.things_capacity}
                  onChange={handleInputChange}
                  placeholder="Things Capacity"
                  className="w-full p-2 border rounded"
                  inputMode="numeric"
                />
                {inputErrors.things_capacity && (
                  <p className="text-red-500 text-sm">{inputErrors.things_capacity}</p>
                )}
              </div>
              <div className='flex flex-col gap-[.5rem]'>
                <p>Van Image</p>
                <ImagesUploader onUpload={handleImageUpload} />
              </div>
            </div>
          </form>
          <div className="py-2 px-6  border-t">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="addVanForm"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Van
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default VanInventory
