import { Instance } from "../axious"
import { BookingDetails, Booking, DataRes } from "../types/booking.type"


const fetchAllBookings = async () => {
    const response = await Instance.get<BookingDetails[]>('/api/booking/');
    return response.data;
}



export {
    fetchAllBookings,

  }