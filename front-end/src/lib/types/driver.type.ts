interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    status: string;
    role: string;
    createdAt: string; // Consider using Date type if you're parsing it
    reset_token: string | null;
    reset_token_expiration: string | null;
    refresh_token: string | null;
  }
  
   export interface Driver {
    van_id: number;
    driver_id: number;
    user_id: number;
    experience_years: number;
    vehicle_assigned: number | null;
    phoneNumber: string;
    Location: string;
    first_name: string; // Added first name
    last_name: string;  // Added last name
    full_name: string; 
    status: string;
  }

  export interface DriverDetails {
    driver_id: number;
    van_id: number;
    email: string;              // Driver's email address
    experience_years: number;   // Years of experience
    first_name: string;         // Driver's first name
    last_name: string;          // Driver's last name
    phoneNumber: string;        // Driver's phone number
    user_id: number;            // User identifier associated with the driver
    vehicle_assigned: number;   // Vehicle assigned to the driver (0 if none)
    location: string;           // Location of the driver
}
  
   export interface ApiResponse {
    error: boolean;
    user: User;
    driver: Driver;
  }
  