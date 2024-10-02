
  export interface Van {
    van_id: number;
    van_name: string;
    van_description: string;
    van_image: string;
    people_capacity: number;
    transmission_type: 'automatic' | 'manual'; 
    things_capacity: number;
    price: string; // Add this property
    reviews: number; // Add this property
    imageUrl: string; // Add this property if needed
    status: 'booked' | 'available'; 
    createdAt: string; 
}

  
  export type DataRes<Data> = {
    data: Data
    error?: boolean;
}
  