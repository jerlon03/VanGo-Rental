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
    driver_id: number;
    user_id: number;
    experience_years: number;
    vehicle_assigned: number | null;
    phoneNumber: string;
    Location: string;
    first_name: string; // Added first name
    last_name: string;  // Added last name
    full_name: string;  // Added last name
  }
  
   export interface ApiResponse {
    error: boolean;
    user: User;
    driver: Driver;
  }
  