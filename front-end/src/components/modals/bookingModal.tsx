'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'; // Added useEffect and useRef
import ModalContainer from '@/components/modals/modalContainer'; // Import the ModalContainer component
import { Booking } from '@/lib/types/booking.type';
import { formatDatePublicRange, formatDateRange } from '@/components/date/formatDate';
import Button from '@/components/Button/button';
import SweetAlert from '@/components/alert/alert'; // Import SweetAlert
import Image from 'next/image'; // Import Image component
import { getVanById } from '@/lib/api/driver.api';
import { DriverDetails } from '@/lib/types/driver.type';
import { updateBookingStatus } from '@/lib/api/booking.api'; // Add this import


interface BookingDetailsModalProps {
    booking: Booking | null;
    onClose: () => void;
    onStatusUpdate?: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose, onStatusUpdate }) => {
    const modalRef = useRef<HTMLDivElement>(null); // Create a ref for the modal
    const [data, setData] = useState<DriverDetails | null>(null);
    const [vanId, setVanId] = useState<string | null>(null);


    useEffect(() => {
        if (booking && booking.van_id) {
            setVanId(booking.van_id as any);
        }
    }, [booking]);

    useEffect(() => {
        if (vanId) {
            const fetchDriver = async () => {
                try {
                    const driverData = await getVanById(vanId as any);
                    if (driverData) {
                        setData(driverData.data as any);
                    } else {
                        SweetAlert.showError('Driver not found.');
                    }
                } catch (error) {
                    console.error('Error fetching driver:', error);
                    SweetAlert.showError('Failed to fetch driver details. Please try again later.');
                }
            };
            fetchDriver();
        }
    }, [vanId]); // Only run when vanId is available

    useEffect(() => {
        if (booking && booking.status === 'pending') {
            const pickupDate = new Date(booking.pickup_date_time);
            const currentDate = new Date();
            
            if (pickupDate < currentDate) {
                handleStatusUpdate('expired');
            }
        }
    }, [booking]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Close the modal if clicked outside
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    if (!booking) return null;

    const handleStatusUpdate = async (newStatus: string) => {
        if (!booking) return;

        try {
            await updateBookingStatus(booking.booking_id, newStatus);
            SweetAlert.showSuccess(`Booking has been ${newStatus}`);
            if (onStatusUpdate) {
                onStatusUpdate(); // Refresh the parent component
            }
            onClose();
        } catch (error) {
            console.error('Error updating booking status:', error);
            SweetAlert.showError('Failed to update booking status');
        }
    };

    return (
        <ModalContainer onClose={onClose} isOpen={true}>
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto text-gray-800"
            >
                <h2 className="text-[18px] font-semibold text-center ">Booking Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="col-span-2 text-center w-full">
                        <p className="text-[16px] font-medium">Booking ID: <span className="font-semibold">{booking.booking_id}</span></p>
                    </div>

                    {/* Personal Information Section */}
                    <div className="w-full text-[14px]">
                        <h3 className="text-[18px] font-semibold mb-2">Personal Information</h3>
                        <p><span className="font-medium">Name:</span> {booking.first_name} {booking.last_name}</p>
                        <p><span className="font-medium">Email:</span>
                            <span className="block w-full break-words">{booking.email}</span>
                        </p>
                        <p><span className="font-medium">Phone:</span> {booking.phone_number}</p>
                        <p><span className="font-medium">Date of Birth:</span> {formatDateRange(booking.date_of_birth as any)}</p>
                    </div>

                    {/* Pickup Information Section */}
                    <div className="text-[14px] w-full">
                        <h3 className="text-[18px] font-semibold mb-2">Pickup Information</h3>
                        <p><span className="font-medium">Location:</span> {booking.province}, {booking.city_or_municipality}, {booking.barangay}, {booking.pickup_location}</p>
                        <p><span className="font-medium">Pickup Date & Time:</span> {formatDatePublicRange(booking.pickup_date_time as any)}</p>
                    </div>

                    {/* Proof of Payment Section */}
                    <div className="w-full">
                        <h3 className="text-[18px] font-semibold mb-2">Proof of Payment</h3>
                        {booking.proof_of_payment ? (
                            <div className="cursor-pointer">
                                <Image
                                    src={booking.proof_of_payment}
                                    alt="Proof of Payment"
                                    width={80}
                                    height={50}
                                    className="object-cover rounded-lg border "
                                />
                                <p className='text-[13px] w-full pt-2  flex underline text-primaryColor font-semibold' onClick={() => window.open(booking.proof_of_payment, '_blank')} >Preview Image</p>
                            </div>
                        ) : (
                            <p>No proof of payment available.</p>
                        )}
                    </div>

                    {/* Driver Details Section - Conditionally Rendered */}
                    {data && (
                        <div className="w-full text-[14px]">
                            <h3 className="text-[18px] font-semibold mb-2">Driver Details</h3>
                            <p><span className="font-medium">Driver ID:</span> DR-O{data.driver_id}</p>
                            <p><span className="font-medium">Driver Name:</span> {data.first_name} {data.last_name}</p>
                            <p><span className="font-medium text-wrap">Email:</span>
                                <span className="block w-full break-words">{data.email}</span>
                            </p>
                            <p><span className="font-medium">Phone:</span> {data.phoneNumber}</p>
                        </div>
                    )}

                    {/* Booking Status & Created Time */}
                    <div className="col-span-2 text-center w-full">
                        <p className="text-[16px]"><span className="font-medium">Booking Status:</span> {booking.status}</p>
                        <p className="text-[16px]"><span className="font-medium">Booking Created:</span> {formatDateRange(booking.created_at as any)}</p>
                    </div>
                </div>


                <div className="flex justify-end mt-6 gap-4">
                    {booking.status === 'pending' && (
                        <>
                            <Button
                                name='Decline'
                                width='120px'
                                backgroundColor='error'
                                onClick={() => {
                                    SweetAlert.showConfirm('Do you want to decline this booking?').then(async (isConfirmed) => {
                                        if (isConfirmed) {
                                            await handleStatusUpdate('declined');
                                            SweetAlert.showSuccess('Booking has been declined successfully');
                                        }
                                    });
                                }}
                            />
                            <Button
                                name='Accept'
                                width='120px'
                                backgroundColor='success'
                                onClick={() => {
                                    SweetAlert.showConfirm('Do you want to accept this booking?').then((isConfirmed) => {
                                        if (isConfirmed) {
                                            handleStatusUpdate('confirmed');
                                        }
                                    });
                                }}
                            />
                        </>
                    )}
                    <Button
                        name='Close'
                        onClick={onClose}
                        width='120px'
                        backgroundColor='alert'
                    />
                </div>
            </div>
        </ModalContainer>
    );
};

export default BookingDetailsModal;

