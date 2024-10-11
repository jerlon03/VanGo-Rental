'use client'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { FaCheckCircle, FaEye, FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { fetchAllBookings } from '@/lib/api/booking.api';
import { Booking, BookingDetails } from '@/lib/types/booking.type';
import { Column } from 'primereact/column';
import { formatDateRange } from '@/components/date/formatDate';
import AdminHeader from '@/components/admin/adminHeader';
import Link from 'next/link';
import Button from '@/components/Button/button';
import BookingDetailsModal from '@/components/modals/bookingModal'; // Import the new modal component
import { IoCloseCircle, IoMdCheckmarkCircleOutline } from '@/components/icons';
import SweetAlert from '@/components/alert/alert'; // Adjust the import path as necessary

const ManageBookings = () => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); // Change type to Booking
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetchAllBookings();
        setBookings(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  function onEditClick(rowData: any): void {
    throw new Error('Function not implemented.');
  }
  function onDeleteClick(rowData: BookingDetails): void {
    SweetAlert.showConfirm('Do you want to decline this booking?').then((isConfirmed) => {
      if (isConfirmed) {
        // Add your decline booking logic here
        SweetAlert.showSuccess('The booking has been declined.');
      }
    });
  }
  const handleViewClick = (rowData: BookingDetails) => {
    setSelectedBooking(rowData as any); // Cast BookingDetails to Booking
    setModalVisible(true); // Show the modal
  };

  return (
    <div className='w-full'>
      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[14px] flex items-end  text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link>/ Manage Booking</h1>
        </AdminHeader>
      </div>
      <div className='w-full p-[2%]'>
        <DataTable
          value={bookings}
          tableStyle={{ minWidth: '50rem' }}
          pt={{
            thead: { className: 'bg-primaryColor text-white' },
            tbody: { className: 'border' },
            headerRow: { className: 'h-[40px]' },
          }}
        >
          <Column
            header="Booking ID"
            field="booking_id" // Ensure this matches the field in your data
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Booked By" // Changed header to "Name"
            body={(rowData) => `${rowData.first_name} ${rowData.last_name}`} // Combine first and last name
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Email Account"
            field="email" // Ensure this matches the field in your data
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header=" Phone Number"
            field="phone_number" // Ensure this matches the field in your data
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Pick up Location "
            body={(rowData) => `${rowData.province} , ${rowData.city_or_municipality}, ${rowData.barangay}, ${rowData.pickup_location} `} // Combine first and last name
            pt={{
              bodyCell: { className: 'border text-blackColor p-2' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Book Created : "
            body={(rowData) => formatDateRange(rowData.created_at)} // Format the date
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' },
            }}
          />
          <Column
            header="Proof of Payment"
            field="proof_of_payment" // Ensure this matches the field in your data
            body={(rowData) => (
              <div className="flex justify-center"> {/* Centering the image */}
                <img
                  src={rowData.proof_of_payment}
                  alt={rowData.proof_of_payment}
                  width="50"
                  height="50"
                />
              </div>
            )}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            field="status"
            header="Status"
            body={(rowData) => {
              let statusClass = '';

              // Apply different styles based on the status value
              switch (rowData.status) {
                case 'confirmed':
                  statusClass = 'bg-green-500 text-white';
                  break;
                case 'pending':
                  statusClass = 'bg-yellow-400 text-white';
                  break;
                default:
                  statusClass = 'bg-gray-100 text-gray-800';
              }

              return (
                <span className={`px-2 py-1 rounded ${statusClass} flex text-center items-center justify-center`}>
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
            body={(rowData) => (
              <div className="flex space-x-2 justify-center items-center">
                {rowData.status === 'confirmed' ? (
                   <FaEye
                     onClick={() => handleViewClick(rowData)}
                     className="text-primaryColor cursor-pointer"
                     size={30}
                     title="View Post" // Tooltip for view icon
                   />
                ) : rowData.status === 'pending' ? (
                  <>
                    {/* <Button name='View' backgroundColor='alert' onClick={() => handleViewClick(rowData)}></Button> */}
                    <IoCloseCircle
                      onClick={() => onDeleteClick(rowData)} // Call onDeleteClick on decline icon click
                      className="text-red-400 cursor-pointer"
                      size={30}
                      title="Decline" // Tooltip for delete icon
                    />
                    <FaCheckCircle
                      onClick={() => {
                        SweetAlert.showConfirm('Do you want to accept this booking?').then((isConfirmed) => {
                          if (isConfirmed) {
                            // Add your accept booking logic here
                            SweetAlert.showSuccess('The booking has been accepted.');
                          }
                        });
                      }}
                      className="text-green-400 cursor-pointer"
                      size={25}
                      title="Accept" // Tooltip for accept icon
                    />
                    <FaEye
                      onClick={() => handleViewClick(rowData)}
                      className="text-primaryColor cursor-pointer"
                      size={30}
                      title="View Post" // Tooltip for view icon
                    />
                    {/* <Button name='Decline' backgroundColor='error'></Button> */}
                  </>
                ) : null}
              </div>
            )}
            pt={{
              bodyCell: { className: 'border-b text-blackColor p-2' },
              headerCell: { className: 'rounded-tr-[3px] px-3 font-medium text-[16px] border-r' },
            }}
          />
        </DataTable>
      </div>
      {/* Modal for booking details */}
      {isModalVisible && (
        <BookingDetailsModal
          booking={selectedBooking} // Ensure selectedBooking is of type Booking
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ManageBookings;
