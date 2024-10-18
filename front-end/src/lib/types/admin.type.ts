export type DataRes<Data> = {
    data: Data
    error?: boolean;
}

export interface Admin {
    admin_id: number; // Assuming admin_id is a number
    user_id: number; // Assuming user_id is a number
    permissions: string; // Assuming permissions is a string
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}