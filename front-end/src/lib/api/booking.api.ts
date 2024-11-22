import { Instance } from "../axious"
import { BookingDetails, Booking, DataRes } from "../types/booking.type"



// private
const fetchAllBookings = async () => {
    const response = await Instance.get<BookingDetails[]>('/api/booking/');
    return response.data;
}

const fetchBookingStatusCounts = async () => {
    try {
        const response = await Instance.get<{ [key: string]: number }>('/api/booking/booking/status-counts'); // Fetch status counts
        return response.data; // Return the status counts data
    } catch (error) {
        console.error('Error in fetchBookingStatusCounts:', error); // Log the error for debugging
        throw error; // Rethrow the error to be handled by the calling function
    }
}

// public
const fetchAddBooking = async (bookingDetails: FormData) => { // Accept FormData as a parameter
    try {
        const response = await Instance.post('/public/booking/', bookingDetails); // Send booking details in the request body
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error in fetchAddBooking:', error); // Log the error for debugging
        throw error; // Rethrow the error to be handled by the calling function
    }
}

const updateBookingStatus = async (bookingId: string | number, status: string) => {
    try {
        console.log('Sending status update:', { bookingId, status });

        const response = await Instance.put<BookingDetails>(`/api/booking/${bookingId}/status`, {
            status: status
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Status update response:', response.data);

        return response.data;
    } catch (error: any) {
        console.error('Error in updateBookingStatus:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
        }
        throw error;
    }
}

const fetchBookingByVanId = async (vanId: string | number) => {
    try {
        const response = await Instance.get<BookingDetails[]>(`/api/booking/van/${vanId}`);
        return response.data;
    } catch (error) {
        console.error('Error in fetchBookingByVanId:', error);
        throw error;
    }
}
const publicBookingByVanId = async (vanId: string | number) => {
    try {
        const response = await Instance.get<BookingDetails[]>(`/public/booking/van/${vanId}`);
        return response.data;
    } catch (error) {
        console.error('Error in fetchBookingByVanId:', error);
        throw error;
    }
}

export {
    fetchAllBookings,
    fetchAddBooking,
    updateBookingStatus,
    fetchBookingByVanId,
    fetchBookingStatusCounts,
    publicBookingByVanId
}