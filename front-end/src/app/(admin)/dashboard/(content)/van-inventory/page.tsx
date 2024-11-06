'use client'
import AdminHeader from '@/components/admin/adminHeader'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { fetchAllVan, fetchUpdateVan } from '@/lib/api/van.api'
import { Van } from '@/lib/types/van.type'
import { FaRegEdit, FaEye } from 'react-icons/fa'
import { IoClose, MdDeleteOutline } from '@/components/icons'
import { formatDateRange } from '@/components/date/formatDate'
import Button from '@/components/Button/button'
import Modal from '@/components/modals/modalContainer'
import { fetchAddVan } from '@/lib/api/van.api';
import SweetAlert from '@/components/alert/alert'
import ImagesUploader from '@/components/Uplooad/ImagesUploader'
import InputField from '@/components/Form/inputfield'
import Select from '@/components/Form/select';
import Image from 'next/image'
import { getAllDriver } from '@/lib/api/driver.api'
import { Driver } from '@/lib/types/driver.type'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// import { fetchAllDrivers } from '@/lib/api/driver.api'

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
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedVan, setSelectedVan] = useState<Van | null>(null); // State to hold the selected van for details
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State to control the details modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control the edit modal

  const initialVanState = {
    van_name: '',
    van_description: '',
    people_capacity: '',
    transmission_type: '',
    things_capacity: '',
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driverData = await getAllDriver();
        console.log('Fetched Drivers:', driverData); // Log the fetched driver data

        // Access the data property to get the array of drivers
        const driversArray = driverData.data; // Access the array of drivers

        // Check if driversArray is an array
        if (Array.isArray(driversArray)) {
          // Create a new array with fullName property
          const driversWithFullName = driversArray.map(driver => ({
            ...driver,
            fullName: `DR-O${driver.driver_id}  ${driver.first_name} ${driver.last_name}` // Combine first_name and driver_id
          }));
          setDrivers(driversWithFullName); // Set the drivers state
        } else {
          console.error('Driver data is not an array:', driversArray);
          console.error('Driver data structure:', JSON.stringify(driversArray, null, 2));
          setDrivers([]); // Set to empty array if not an array
        }
      } catch (err) {
        console.error('Error fetching drivers:', err); // Log the error
        setDrivers([]); // Set to empty array on error
      }
    };

    fetchDrivers();
  }, []);

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
      !newVan.people_capacity || !newVan.transmission_type || !newVan.things_capacity || !selectedDriver) {
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
      // formData.append('driver_id', selectedDriver);
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
        // setSelectedDriver('');
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
    // No need to fetch drivers for now
  };

  const handleDriverChange = (e: DropdownChangeEvent) => {
    console.log('Selected Driver:', e.value); // Log the selected driver
    setSelectedDriver(e.value as Driver);
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

  console.log(selectedDriver, 'Selected Driver');


  function onDeleteClick(rowData: any): void {
    throw new Error('Function not implemented.')
  }

  const onViewDetailsClick = (rowData: Van): void => {
    setSelectedVan(rowData); // Set the selected van to display in the modal
    setIsDetailsModalOpen(true); // Open the details modal
  };

  // Function to handle the edit submission
  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Add your validation logic here if needed

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        SweetAlert.showError('You are not authorized. Please log in.');
        return;
      }

      const formData = new FormData();
      Object.entries(newVan).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // // {{ edit_1 }} - Call the new fetchUpdateVan function
      // const updatedVan = await fetchUpdateVan(selectedVan?.van_id as any, newVan as any);
      // // {{ edit_1 }}

      SweetAlert.showSuccess('Van updated successfully');
      setIsEditModalOpen(false);
      const updatedVans = await fetchAllVan();
      setVans(updatedVans.data);

    } catch (error) {
      SweetAlert.showError('Failed to update van');
      console.error('Error:', error);
    }
  };

  const handleEditConfirmation = (rowData: Van) => {
    const confirmed = SweetAlert.showConfirm("Are you sure you want to edit this van?");
    if (!confirmed) { // Change this condition to check if confirmed
      setSelectedVan(rowData); // Set the selected van to edit
      setIsEditModalOpen(true); // Open the edit modal
    }
  };

  const itemTemplate = (driver: Driver) => {
    return (
      <div className=" bg-white px-4 p-1">
        <div className='flex justify-between rounded-[5px] '>
          <span className='text-gray-500'>{driver.full_name}</span>
          <span className="text-gray-500">DR-O{driver.driver_id}</span> 
        </div>
      </div>
    );
  };

  return (
    <div className='w-full'>
      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[14px] flex items-end  text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Van Inventory</h1>
        </AdminHeader>
      </div>
      <div className='w-full px-[2%]'>
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
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] xl:text-[15px] truncate rounded-tl-[3px] border-r' }
            }}
          />
          <Column
            header="Image"
            body={(rowData) => (
              <div className="flex justify-center items-center h-full">
                <img
                  src={rowData.van_image || '/default-image.png'}
                  alt={`${rowData.van_name} image`}
                  className="object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/default-image.png';
                  }}
                />
              </div>
            )}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] xl:text-[15px] border-r' }
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
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium lg:text-[14px] xl:text-[15px] text-[16px] border-r' }
            }}
          />
          <Column
            field="people_capacity"
            header="People Capacity" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] text-center lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium lg:text-[14px] text-[16px] xl:text-[15px] border-r' }
            }} />
          <Column
            field="things_capacity"
            header="Things Capacity" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium lg:text-[14px] text-[16px] xl:text-[15px] border-r' }
            }} />
          <Column
            field="transmission_type"
            header="Transmission Type" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium lg:text-[14px] text-[16px] xl:text-[15px] border-r' }
            }} />
          <Column
            body={(rowData) => `${formatDateRange(rowData.createdAt)}`}
            header="Date Created"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium lg:text-[14px] text-[16px] xl:text-[15px] border-r' }
            }} />
          <Column
            field="status"
            header="Status"
            body={(rowData) => {
              let statusClass = '';

              // Apply different styles based on the status value
              switch (rowData.status) {
                case 'available':
                  statusClass = 'bg-green-100 text-green-800 lg:text-[14px]';
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
                  onClick={() => handleEditConfirmation(rowData)} // Updated to use the new confirmation function
                  className="text-primaryColor cursor-pointer"
                  size={18}
                />
                <MdDeleteOutline
                  onClick={() => onDeleteClick(rowData)}
                  className="text-red-400 cursor-pointer"
                  size={22}
                />
                <FaEye
                  onClick={() => onViewDetailsClick(rowData)}
                  className="text-green-400 cursor-pointer"
                  size={22}
                />
              </div>
            )} />
        </DataTable>
      </div>
      {/* ADD MODAL */}
      <Modal isOpen={isModalOpen} width='500px' height='600px' onClose={() => setIsModalOpen(false)}>
        <div className="h-full flex flex-col bg-white">
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
              <div>
                <p>Driver Assignee</p>
                <Dropdown
                  id="driver"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.value)}
                  options={drivers}
                  optionLabel="full_name" // Use the correct property for display
                  optionValue="driver_id" // This should match the unique identifier
                  placeholder="Select a Driver"
                  itemTemplate={itemTemplate} // Use the custom item template
                  className="w-full p-2 bg-gray-100 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

            </div>
          </form>
          <div className="py-2 px-6 border-t">
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
      {/* Details Modal */}
      <Modal isOpen={isDetailsModalOpen} width='600px' onClose={() => setIsDetailsModalOpen(false)}>
        <div className="flex flex-col bg-white rounded-[5px] justify-between">
          <div className="flex justify-between items-center bg-primaryColor rounded-t-[5px] p-2">
            <h2 className="text-[18px] font-semibold text-white">VAN DETAILS</h2>
          </div>
          {selectedVan && (
            <div className="p-3">
              <div className="flex flex-col">
                <div className='w-full flex justify-center'>
                  {selectedVan.van_image ? ( // Check if van_image is valid
                    <Image
                      src={selectedVan.van_image} // Display the van image
                      alt={`${selectedVan.van_name} image`}
                      className="w-[200px] object-cover rounded mb-4"
                      width={300}
                      height={500}
                    />
                  ) : (
                    <img
                      src="/default-image.png" // Fallback to a default image
                      alt="Default image"
                      className="w-[200px] object-cover rounded mb-4"
                    />
                  )}
                </div>

                <p><strong>Van Name:</strong> {selectedVan.van_name}</p>
                <p><strong>Description:</strong> {selectedVan.van_description}</p>
                <p><strong>People Capacity:</strong> {selectedVan.people_capacity}</p>
                <p><strong>Things Capacity:</strong> {selectedVan.things_capacity}</p>
                <p><strong>Transmission Type:</strong> {selectedVan.transmission_type}</p>
                <p><strong>Status:</strong> {selectedVan.status}</p>
                <p><strong>Date Created:</strong> {formatDateRange(selectedVan.createdAt)}</p>
                {/* Add more fields as necessary */}
              </div>
            </div>
          )}
          <div className="py-2 px-6 border-t">
            <div className="flex justify-end space-x-4">
              <Button name='CLOSE' onClick={() => setIsDetailsModalOpen(false)} backgroundColor='alert' width='120px'></Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} width='500px' height='600px' onClose={() => setIsEditModalOpen(false)}>
        <div className="h-full flex flex-col bg-white">
          <h2 className="text-[20px] font-medium p-3 pb-2">Edit Van</h2>
          <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto p-3 pt-2">
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
              {/* Add any additional fields as necessary */}
            </div>
            <div className="py-2 px-6 border-t">
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update Van
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default VanInventory
