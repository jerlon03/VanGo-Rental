export interface DataRes<T> {
    data: T; // Assuming the actual data is in a 'data' property
}

export interface Admin {
    admin_id: number; // Assuming admin_id is a number
    user_id: number; // Assuming user_id is a number
    permissions: string; // Assuming permissions is a string
    phone_number: string;
    address: string;
    first_name: string;
    last_name: string;
    email: string;
}
