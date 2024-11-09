'use client'
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { FaCheckCircle, FaEye, FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { fetchAllBookings } from '@/lib/api/booking.api';
import { Booking, BookingDetails } from '@/lib/types/booking.type';
import { Column } from 'primereact/column';
import { formatDatePublicRange } from '@/components/date/formatDate';
import AdminHeader from '@/components/admin/adminHeader';
import Link from 'next/link';
import Button from '@/components/Button/button';
import BookingDetailsModal from '@/components/modals/bookingModal'; // Import the new modal component
import { IoCloseCircle, IoMdCheckmarkCircleOutline } from '@/components/icons';
import SweetAlert from '@/components/alert/alert'; // Adjust the import path as necessary
import Image from 'next/image'; // Import the Image component from next/image
import { Dropdown } from 'primereact/dropdown';

const ManageBookings = () => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); // Change type to Booking
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const sortRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    { label: 'All', value: null },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Declined', value: 'declined' },
    { label: 'Completed', value: 'completed' },
  ];

  const sortOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' }
  ];

  // Add this function to filter bookings
  const filteredBookings = bookings.filter(booking => {
    if (!selectedStatus) return true;
    return booking.status === selectedStatus;
  });

  // Add this function to sort bookings with debugging
  const sortedAndFilteredBookings = [...filteredBookings].sort((a, b) => {
    console.log('Sorting:', a.booking_id, b.booking_id); // Debug log
    if (sortOrder === 'desc') {
      return b.booking_id - a.booking_id;
    } else {
      return a.booking_id - b.booking_id;
    }
  });

  // You can also log the final sorted array
  console.log('Sorted Bookings:', sortedAndFilteredBookings);

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSort(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Modify the loadBookings function to be accessible throughout the component
  const loadBookings = async () => {
    try {
      const response = await fetchAllBookings();
      setBookings(response);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  // Update the initial useEffect to use the new loadBookings function
  useEffect(() => {
    loadBookings();
  }, []);

  // Add a new useEffect to handle automatic updates
  useEffect(() => {
    // Set up an interval to fetch new bookings every 30 seconds
    const intervalId = setInterval(() => {
      loadBookings();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Update the sort handler to include the automatic refresh
  const handleSort = (value: 'asc' | 'desc') => {
    setSortOrder(value);
    setShowSort(false);
    // No need to call loadBookings here as the sort is handled client-side
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleViewClick = (rowData: BookingDetails) => {
    setSelectedBooking(rowData as any); // Ensure rowData is valid
    setModalVisible(true); // Show the modal
  };

  return (
    <div className='w-full'>
      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[14px] flex items-end  text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link>/ Manage Booking</h1>
        </AdminHeader>
      </div>
      <div className='w-full px-[2%]'>
        <div className='w-full flex gap-2 justify-end p-2'>
          <div 
            ref={filterRef} 
            className='relative'
            onMouseEnter={() => setShowFilter(true)}
            onMouseLeave={() => setShowFilter(false)}
          >
            <div className='flex gap-2 border py-1 px-2 rounded cursor-pointer hover:bg-button'>
              <p className='text-[14px] tracking-[1px]'>Filter</p>
              <Image src='/filter.png' width={20} height={12} alt='Filter Icon' className='object-contain' />
            </div>
            {showFilter && (
              <div className='absolute right-0 top-full mt-[1px] bg-white shadow-lg rounded-md border p-2 z-10 min-w-[150px]'>
                {statusOptions.map((option) => (
                  <div 
                    key={option.label}
                    className={`p-1 cursor-pointer hover:bg-primaryColor hover:text-white rounded text-[14px] ${selectedStatus === option.value ? 'bg-primaryColor text-white ' : ''}`}
                    onClick={() => {
                      setSelectedStatus(option.value);
                      setShowFilter(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div 
            ref={sortRef}
            className='relative'
            onMouseEnter={() => setShowSort(true)}
            onMouseLeave={() => setShowSort(false)}
          >
            <div className='flex gap-2 border py-1 px-2 rounded cursor-pointer hover:bg-button'>
              <p className='text-[14px] tracking-[1px]'>Sort By ID: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</p>
            </div>
            {showSort && (
              <div className='absolute right-0 top-full mt-[1px] bg-white shadow-lg rounded-md border p-2 z-10 min-w-[150px]'>
                {sortOptions.map((option) => (
                  <div 
                    key={option.label}
                    className={`p-1 cursor-pointer hover:bg-primaryColor hover:text-white rounded text-[14px] ${sortOrder === option.value ? 'bg-primaryColor text-white' : ''}`}
                    onClick={() => handleSort(option.value as 'asc' | 'desc')}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DataTable
          value={sortedAndFilteredBookings}
          tableStyle={{ minWidth: '50rem' }}
          pt={{
            thead: { className: 'bg-primaryColor text-white' },
            tbody: { className: 'border' },
            headerRow: { className: 'h-[40px]' },
          }}
          emptyMessage={
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No bookings found</p>
              {selectedStatus && (
                <p className="text-gray-400 text-sm mt-2">
                  Try changing your filter settings
                </p>
              )}
            </div>
          }
        >
          <Column
            header="Booking ID"
            field="booking_id"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Booked By"
            body={(rowData) => `${rowData.first_name} ${rowData.last_name}`}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Email Account"
            field="email"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header=" Phone Number"
            field="phone_number"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Pick up Location "
            body={(rowData) => `${rowData.province} , ${rowData.city_or_municipality}, ${rowData.barangay}, ${rowData.pickup_location} `}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Pick up Date "
            body={(rowData) => formatDatePublicRange(rowData.pickup_date_time)}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] border-r' },
            }}
          />
          <Column
            header="Book Created "
            body={(rowData) => formatDatePublicRange(rowData.created_at)}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] border-r' },
            }}
          />
          <Column
            header="Proof of Payment"
            field="proof_of_payment"
            body={(rowData) => {
              const imageUrl = rowData.proof_of_payment ? rowData.proof_of_payment : '/default-image.png'; // Fallback to default image
              const isAbsoluteUrl = imageUrl.startsWith('http://') || imageUrl.startsWith('https://');

              return (
                <div className="flex justify-center">
                  <Image
                    src={isAbsoluteUrl ? imageUrl : '/default-image.png'} // Use default image if not an absolute URL
                    alt={`Receipt image`}
                    className="object-contain rounded-[5px] border  "
                    width={60}
                    height={50}
                    onError={(e) => {
                      e.currentTarget.src = '/default-image.png'; // Fallback to default image on error
                    }}
                  />
                </div>
              );
            }}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            field="status"
            header="Status"
            body={(rowData) => {
              let statusClass = '';
              switch (rowData.status) {
                case 'confirmed':
                  statusClass = 'bg-green-500 text-white';
                  break;
                case 'pending':
                  statusClass = 'bg-yellow-400 text-white';
                  break;
                case 'ongoing':
                  statusClass = 'bg-blue-500 text-white';
                  break;
                case 'declined':
                  statusClass = 'bg-red-500 text-white';
                  break;
                case 'completed':
                  statusClass = 'bg-purple-500 text-white';
                  break;
                default:
                  statusClass = 'bg-gray-100 text-gray-800';
              }

              return (
                <span className={`px-2 py-1 rounded ${statusClass} flex text-center items-center justify-center lg:text-[14px]`}>
                  {rowData.status}
                </span>
              );
            }}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r lg:text-[14px]' }
            }}
          />
          <Column
            header="Actions"
            body={(rowData) => (
              <div className="flex space-x-2 justify-center items-center">
                {rowData.status === 'confirmed' ? (
                  <FaEye
                    onClick={() => handleViewClick(rowData)}
                    className="text-primaryColor cursor-pointer lg:size-[25px]"
                    size={30}
                    title="View Post"
                  />
                ) : rowData.status === 'pending' ? (
                  <>
                    <FaEye
                      onClick={() => handleViewClick(rowData)}
                      className="text-primaryColor cursor-pointer lg:size-[25px]"
                      size={30}
                      title="View Post"
                    />
                  </>
                ) : null}
              </div>
            )}
            pt={{
              bodyCell: { className: 'border-b text-blackColor p-2' },
              headerCell: { className: 'rounded-tr-[3px] px-3 font-medium text-[16px] border-r lg:text-[14px]' },
            }}
          />
        </DataTable>
      </div>
      {isModalVisible && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => {
            setModalVisible(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageBookings;