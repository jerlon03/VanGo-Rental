'use client'
import React, { useCallback, useEffect, useRef } from 'react'; // Added useEffect and useRef
import ModalContainer from '@/components/modals/modalContainer'; // Import the ModalContainer component
import { Booking } from '@/lib/types/booking.type';
import { formatDateRange } from '@/components/date/formatDate';
import Button from '@/components/Button/button';
import SweetAlert from '@/components/alert/alert'; // Import SweetAlert
import Image from 'next/image'; // Import Image component


interface BookingDetailsModalProps {
    booking: Booking | null;
    onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null); // Create a ref for the modal

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Close the modal if clicked outside
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside); // Add event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener
        };
    }, [handleClickOutside]);

    if (!booking) return null; // Return null if no booking is provided

    return (
        <ModalContainer onClose={onClose} isOpen={true}>
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto text-gray-800"
            >
                <h2 className="text-2xl font-semibold text-center ">Booking Details</h2>

                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 text-center">
                        <p className="text-lg font-medium">Booking ID: <span className="font-semibold">{booking.booking_id}</span></p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                        <p><span className="font-medium">Name:</span> {booking.first_name} {booking.last_name}</p>
                        <p><span className="font-medium">Email:</span> {booking.email}</p>
                        <p><span className="font-medium">Phone:</span> {booking.phone_number}</p>
                        <p><span className="font-medium">Date of Birth:</span> {formatDateRange(booking.date_of_birth as any)}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Pickup Information</h3>
                        <p><span className="font-medium">Location:</span> {booking.province}, {booking.city_or_municipality}, {booking.barangay}, {booking.pickup_location}</p>
                        <p><span className="font-medium">Pickup Date & Time:</span> {formatDateRange(booking.pickup_date_time as any)}</p>
                    </div>

                    <div className="col-span-2">
                        <h3 className="text-xl font-semibold mb-2">Proof of Payment</h3>
                        <Image src={booking.proof_of_payment} alt="Proof of Payment" width={160} height={160} className="object-cover rounded-lg border" />
                    </div>

                    <div className="col-span-2 text-center">
                        <p className="text-lg"><span className="font-medium">Booking Status:</span> {booking.status}</p>
                        <p className="text-lg"><span className="font-medium">Booking Created:</span> {formatDateRange(booking.created_at as any)}</p>
                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-4">
                    {booking.status === 'pending' && ( // Show buttons only if status is pending
                        <>
                            <Button 
                                name='Decline' 
                                width='120px' 
                                backgroundColor='error' 
                                onClick={() => {
                                    // Add decline logic here
                                    SweetAlert.showConfirm('Do you want to decline this booking?').then((isConfirmed) => {
                                        if (isConfirmed) {
                                            SweetAlert.showSuccess('The booking has been declined.');
                                            onClose(); // Close the modal after action
                                        }
                                    });
                                }} 
                            />
                            <Button 
                                name='Accept' 
                                width='120px' 
                                backgroundColor='success' 
                                onClick={() => {
                                    // Add accept logic here
                                    SweetAlert.showConfirm('Do you want to accept this booking?').then((isConfirmed) => {
                                        if (isConfirmed) {
                                            SweetAlert.showSuccess('The booking has been accepted.');
                                            onClose(); // Close the modal after action
                                        }
                                    });
                                }} 
                            />
                        </>
                    )}
                    <Button name='Close' onClick={onClose} width='120px' backgroundColor='alert'></Button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default BookingDetailsModal;
