import {Admin, DataRes} from '@/lib/types/admin.type'
import { Instance } from '../axious';

interface ApiResponse<T> {
    data: T;
    // other response properties if any
  }

const fetchAdminById = async (id: number) => {
    const response = await Instance.get<DataRes<Admin>>(`/api/admin/${id}`); // Fetch admin by ID
    return response.data; // Return the admin data
}

const fetchAllAdmins = async () => { // Added userId parameter
    const response = await Instance.get<DataRes<Admin[]>>(`/api/admin/`); // Fetch all admins with userId
    return response.data; // Return the list of admins
}

const fetchAdminByUserId = async (userId: number): Promise<Admin> => { // Ensure the return type is Admin
    const response = await Instance.get<Admin>(`/api/admin/user/${userId}`); // Fetch admin by user ID
    return response.data; // Return the admin data
}

const getAdminByUserId = async (userId: number): Promise<ApiResponse<Admin[]>> => { // Ensure the return type is Admin
    const response = await Instance.get<ApiResponse<Admin[]>>(`/api/admin/admin/${userId}`); // Fetch admin by user ID
    return response.data; // Return the admin data
}

const updateAdminByUserId = async (
    userId: string | number,
    updateData: {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        address: string;
    }
): Promise<ApiResponse<Admin[]>> => {
    const response = await Instance.put<ApiResponse<Admin[]>>(
        `/api/admin/admin/${userId}`,
        updateData
    );
    return response.data;
};
export {
    fetchAdminById,
    fetchAllAdmins,
    fetchAdminByUserId,
    getAdminByUserId,
    updateAdminByUserId,
}
