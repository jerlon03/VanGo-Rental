

export interface Booking {
    book_id: number; // Primary key, auto-incremented
    user_id: number; // Foreign key referring to a user
    van_id: number; // Foreign key referring to a van
    status: 'pending' | 'confirmed' | 'cancelled'; // Enum for the status of the booking
    createdAt: string; // Timestamps for creation date
    updatedAt: string; // Timestamps for last update
  }
  

  // interfaces/BookingDetails.ts

export interface BookingDetails {
    book_id: number; // Primary key, auto-incremented
    user_id: number; // Foreign key referring to a user
    user_first_name: string; // First name of the user
    user_last_name: string; // Last name of the user
    van_id: number; // Foreign key referring to a van
    van_name: string; // Name of the van
    van_image: string; // Image filename or URL of the van
    status: 'pending' | 'confirmed' | 'cancelled'; // Enum for the status of the booking
    createdAt: string; // Timestamps for creation date
  }
  
  
  
  export type DataRes<Data> = {
    data: Data
    error?: boolean;
}
  