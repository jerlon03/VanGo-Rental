import { Instance } from "../axious"
import { BookingDetails, Booking, DataRes } from "../types/booking.type"



// private
const fetchAllBookings = async () => {
    const response = await Instance.get<BookingDetails[]>('/api/booking/');
    return response.data;
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


export {
    fetchAllBookings,
    fetchAddBooking,
  }