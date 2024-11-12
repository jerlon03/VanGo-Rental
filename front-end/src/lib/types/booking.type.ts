

export interface Booking {
  booking_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: Date;
  province: string;
  pickup_location: string;
  city_or_municipality: string;
  pickup_date_time: Date;
  barangay: string;
  proof_of_payment: string;
  van_id: number;
  created_at: Date;
  status: string;
  driver_id: number;
}



// interfaces/BookingDetails.ts

export interface BookingDetails {
  booking_id: number; // Primary key, auto-incremented
  user_id: number; // Foreign key referring to a user
  first_name: string; // First name of the user
  last_name: string; // Last name of the user
  van_id: number; // Foreign key referring to a van
  van_name: string; // Name of the van
  van_image: string; // Image filename or URL of the van
  status: 'pending' | 'confirmed' | 'ongoing' | 'declined' | 'completed';
  createdAt: string; // Timestamps for creation date
  email: string;
  phone_number: string;
  province: string;
  city_or_municipality: string;
  barangay: string;
  pickup_location: string;
  pickup_date_time: Date;
}



export type DataRes<Data> = {
  data: Data
  error?: boolean;
}
