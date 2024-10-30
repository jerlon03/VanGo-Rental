import { Instance } from "../axious"
import { BookingDetails, Booking, DataRes } from "../types/booking.type"



// private
const fetchAllBookings = async () => {
    const response = await Instance.get<BookingDetails[]>('/api/booking/');
    return response.data;
}

// public
const fetchAddBooking = async (bookingDetails: Booking) => { // Accept booking details as a parameter
    const response = await Instance.post<Booking[]>('/public/booking/', bookingDetails); // Send booking details in the request body
    return response.data;
}


export {
    fetchAllBookings,
    fetchAddBooking,
  }