'use client'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react'
import Button from '@/components/Button/button';
import { formatDatePublicRange } from '@/components/date/formatDate';
import SweetAlert from '@/components/alert/alert';

const AssignedTrips = () => {
    const [view, setView] = useState('active');
    const [data, setData] = useState([
        {
            customerName: 'John Doe',
            address: '123 Main St, Anytown',
            email: 'sample@gmail.com',
            phoneNo: '(555) 123-4567',
            pickUpLocation: 'Central Park',
            pickUpDateTime: '2023-10-16 10:00 AM',
            status: 'Completed',
        },
        {
            customerName: 'Jane Smith',
            address: '456 Elm St, Othertown',
            email: 'sample@gmail.com',
            phoneNo: '(555) 987-6543',
            pickUpLocation: 'City Hall',
            pickUpDateTime: '2023-10-16 11:00 AM',
            status: 'Completed',
        },
        {
            customerName: 'Mike Johnson',
            address: '789 Oak St, Somewhere',
            email: 'sample@gmail.com',
            phoneNo: '(555) 555-5555',
            pickUpLocation: 'Airport',
            pickUpDateTime: '2023-10-16 12:00 PM',
            status: 'Completed',
        },
        {
            customerName: 'Alice Brown',
            address: '321 Pine St, Newtown',
            email: 'sample@gmail.com',
            phoneNo: '(555) 111-2222',
            pickUpLocation: 'Downtown',
            pickUpDateTime: '2023-10-17 09:00 AM',
            status: 'Confirmed',
        },
        {
            customerName: 'Bob White',
            address: '654 Maple St, Oldtown',
            email: 'sample@gmail.com',
            phoneNo: '(555) 333-4444',
            pickUpLocation: 'Train Station',
            pickUpDateTime: '2023-10-17 10:30 AM',
            status: 'Confirmed',
        },
        {
            customerName: 'Charlie Green',
            address: '987 Cedar St, Hometown',
            email: 'sample@gmail.com',
            phoneNo: '(555) 555-6666',
            pickUpLocation: 'Bus Terminal',
            pickUpDateTime: '2023-10-18 08:00 AM',
            status: 'Completed',
        },
    ]);

    const handleStartTrip = (index: number) => {
        // Show confirmation alert before starting the trip
        SweetAlert.showConfirm('Are you sure you want to start this trip?').then((result) => {
            if (result) { // result is true if confirmed
                // Update the status of the selected trip to 'Ongoing'
                const updatedData = [...data];
                updatedData[index].status = 'Ongoing';

                // Send email to the customer
                sendEmailToCustomer(updatedData[index].email, 'Your trip has started!', 'Thank you for choosing our service. Your trip is now ongoing.');

                // Remove the trip from 'Confirmed' if it was previously confirmed
                updatedData.forEach((trip, i) => {
                    if (i !== index && trip.status === 'Ongoing') {
                        trip.status = 'Confirmed';
                    }
                });

                setData(updatedData);
            }
        });
    };

    const handleFinishTrip = (index: number) => {
        // Show confirmation alert before finishing the trip
        SweetAlert.showConfirm('Are you sure you want to finish this trip?').then((result) => {
            if (result) { // result is true if confirmed
                // Update the status of the selected trip to 'Completed'
                const updatedData = [...data];
                updatedData[index].status = 'Completed';
                setData(updatedData);
                SweetAlert.showSuccess('Completed!, The trip has been marked as completed.');

                // Send email to the customer
                sendEmailToCustomer(updatedData[index].email, 'Your trip has been completed!', 'Thank you for using our service. Your trip has been successfully completed.');
            }
        });
    };

    // Function to send email to the customer
    const sendEmailToCustomer = (email: string, subject: string, message: string) => {
        // Here you would typically make an API call to your backend to send the email
        // Example:
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject, message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Email sending failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Email sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
    };

    return (
        <div className='w-full'>
            <p className='text-[15px]'> View Schedule / Assigned Trips</p>
            <div className='w-full px-[2%] pt-[2%]'>
                <div className='w-full pt-5 flex gap-4'>
                    <p onClick={() => setView('active')} className={view === 'active' ? 'cursor-pointer font-bold border-b-2 px-4 flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Active Trips</p>
                    <p>|</p>
                    <p onClick={() => setView('upcoming')} className={view === 'upcoming' ? 'cursor-pointer font-bold border-b-2 px-4 flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Upcoming Trips</p>
                    <p>|</p>
                    <p onClick={() => setView('completed')} className={view === 'completed' ? 'cursor-pointer font-bold border-b-2 px-4  flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Completed Trips</p>
                </div>
                <div className='pt-6'>
                    {view === 'active' &&
                        <div className='flex flex-col gap-4'>
                            {data.filter(item => item.status === 'Ongoing').length === 0 ? (
                                <p>There are no bookings for now.</p>
                            ) : (
                                data.filter(item => item.status === 'Ongoing').map((trip, index) => (
                                    <div key={index} className='w-full flex gap-4 items-centers'>
                                        <div className='flex flex-col justify-evenly'>
                                            <div className='flex justify-center flex-col items-center p-2 bg-primaryColor text-white rounded-[5px]'>
                                                <h1>NOVEMBER</h1>
                                                <p>MON 01</p>
                                            </div>
                                            <Button
                                                name="FINISH"
                                                onClick={() => handleFinishTrip(index)}
                                                className='bg-green-500 text-white'
                                            ></Button>
                                        </div>
                                        <div className='border w-full grid grid-cols-2 rounded-[5px] p-2 text-[14px] md:grid-cols-1 lg:grid-cols-2 gap-4'>
                                            <div>
                                                <h1 className='font-semibold text-center p-2 text-[15px]'>Customer Information</h1>
                                                <div className='grid grid-cols-2 w-[50%] xl:w-[70%] lg:w-[100%] md:w-[100%]'>
                                                    <p className='font-medium'> Customer Name :</p>
                                                    <p>{trip.customerName}</p>
                                                    <p className='font-medium'>Email Address :</p>
                                                    <p>{trip.email || 'N/A'}</p>
                                                    <p className='font-medium'>Phone Number :</p>
                                                    <p>{trip.phoneNo}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className='font-semibold text-center p-2 text-[15px]'>Pick Up Information</h1>
                                                <div className='grid grid-cols-2 w-[50%] xl:w-[70%] lg:w-[100%] md:w-[100%]'>
                                                    <p className='font-medium'>Date & Time :</p>
                                                    <p>{trip.pickUpDateTime}</p>
                                                    <p className='font-medium'>Location :</p>
                                                    <p>{trip.pickUpLocation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    }
                    {view === 'upcoming' &&
                        <div className='flex flex-col gap-4'>
                            {data.filter(item => item.status === 'Confirmed').length === 0 ? (
                                <p>There are no bookings for now.</p>
                            ) : (
                                data.filter(item => item.status === 'Confirmed').map((trip, index) => (
                                    <div key={index} className='w-full flex gap-4 items-centers'>
                                        <div className='border w-full grid grid-cols-2 rounded-[5px] p-2 text-[14px] md:grid-cols-1 lg:grid-cols-2 gap-4'>
                                            <div>
                                                <h1 className='font-semibold text-center p-2 text-[15px]'>Customer Information</h1>
                                                <div className='grid grid-cols-2 w-[50%] xl:w-[70%] lg:w-[100%] md:w-[100%]'>
                                                    <p className='font-medium'> Customer Name :</p>
                                                    <p>{trip.customerName}</p>
                                                    <p className='font-medium'>Email Address :</p>
                                                    <p>{trip.email || 'N/A'}</p>
                                                    <p className='font-medium'>Phone Number :</p>
                                                    <p>{trip.phoneNo}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className='font-semibold text-center p-2 text-[15px]'>Pick Up Information</h1>
                                                <div className='grid grid-cols-2 w-[50%] xl:w-[70%] lg:w-[100%] md:w-[100%]'>
                                                    <p className='font-medium'>Date & Time :</p>
                                                    <p>{trip.pickUpDateTime}</p>
                                                    <p className='font-medium'>Location :</p>
                                                    <p>{trip.pickUpLocation}</p>
                                                </div>
                                            </div>
                                            <Button
                                                name="Start The Trip"
                                                onClick={() => handleStartTrip(index)}
                                                className='bg-blue-500 text-white'
                                            />
                                        </div>

                                    </div>
                                ))
                            )}
                        </div>
                    }
                    {view === 'completed' &&
                        <div className='w-full'>
                            {data.filter(item => item.status === 'Completed').length === 0 ? (
                                <p>There are no bookings for now.</p>
                            ) : (
                                <DataTable
                                    value={data.filter(item => item.status === 'Completed')}
                                    tableStyle={{ minWidth: '50rem' }}
                                    pt={{
                                        thead: { className: 'bg-primaryColor text-white' },
                                        tbody: { className: 'border ' },
                                        headerRow: { className: 'h-[40px] ' },
                                    }}
                                >
                                    <Column field="customerName" header="Customer Name" pt={{
                                        bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                        headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                    }} />
                                    <Column field="address" header="Address" pt={{
                                        bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                        headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                    }} />
                                    <Column field="phoneNo" header="Phone No" pt={{
                                        bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                        headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                    }} />
                                    <Column field="pickUpLocation" header="Pick Up Location" pt={{
                                        bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                        headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                    }} />
                                    <Column field="pickUpDateTime" header="Pick Up Date & Time" pt={{
                                        bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                        headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                    }} body={(rowData) => (
                                        <div>{formatDatePublicRange(rowData.pickUpDateTime)}</div>
                                    )} />
                                    <Column field="status" header="Status" pt={{
                                        bodyCell: { className: 'border text-blackColor p-2 text-[14px] flex justify-center' },
                                        headerCell: { className: 'px-3 font-medium text-[14px] rounded-tr-[3px] border-r' }
                                    }} body={(rowData) => (
                                        <Button name={rowData.status} className={`p-2 rounded ${rowData.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} />
                                    )} />
                                </DataTable>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AssignedTrips
