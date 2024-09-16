'use client'
import React, { useState, useEffect } from 'react';
import { DataTable} from 'primereact/datatable';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { fetchAllBookings } from '@/lib/api/booking.api';
import { BookingDetails } from '@/lib/types/booking.type';
import { Column } from 'primereact/column';
import { formatDateRange } from '@/components/date/formatDate';
import AdminHeader from '@/components/admin/adminHeader';
import Link from 'next/link';

const ManageBookings = () => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  function onDeleteClick(rowData: any): void {
    throw new Error('Function not implemented.');
  }

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
            header="Book ID"
            field="book_id" // Ensure this matches the field in your data
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Van Name"
            field="van_name" // Ensure this matches the field in your data
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Image"
            field="van_image" // Ensure this matches the field in your data
            body={(rowData) => (
              <img
                src={rowData.van_image}
                alt={rowData.van_name}
                width="50"
                height="50"
              />
            )}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Book By :"
            body={(rowData) => `${rowData.user_first_name} ${rowData.user_last_name}`} // Combine first and last name
            pt={{
              bodyCell: { className: 'border text-blackColor p-2' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' },
            }}
          />
          <Column
            header="Book Created : "
            body={(rowData) => formatDateRange(rowData.createdAt)} // Format the date
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' },
            }}
          />
          <Column
            header="Status"
            body={(rowData) => {
              let statusClass = '';

              // Apply different styles based on the status value
              switch (rowData.status) {
                case 'confirmed':
                  statusClass = 'bg-green-100 text-green-800';
                  break;
                case 'cancelled':
                  statusClass = 'bg-red-100 text-red-800';
                  break;
                case 'pending':
                  statusClass = 'bg-yellow-100 text-yellow-800';
                  break;
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
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' },
            }}
          />
          <Column
            header="Actions"
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
            )}
            pt={{
              bodyCell: { className: 'border-b text-blackColor p-2' },
              headerCell: { className: 'rounded-tr-[3px] px-3 font-medium text-[16px] border-r' },
            }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default ManageBookings;
