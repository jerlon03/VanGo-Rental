

export interface Van {
    van_id: number;
    van_name: string; 
    van_description: string; 
    van_image: string;
    people_capacity: number; 
    transmission_type: 'automatic' | 'manual'; 
    things_capacity: number; 
    status: 'booked' | 'available'; 
    createdAt: string; 
  }


  
  export type DataRes<Data> = {
    data: Data
    error?: boolean;
}
  