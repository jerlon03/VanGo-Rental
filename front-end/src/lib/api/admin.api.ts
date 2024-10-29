import {Admin, DataRes} from '@/lib/types/admin.type'
import { Instance } from '../axious';


const fetchAdminById = async (id: number) => {
    const response = await Instance.get<DataRes<Admin>>(`/api/admin/${id}`); // Fetch admin by ID
    return response.data; // Return the admin data
}

// New function to fetch all admins
const fetchAllAdmins = async () => { // Added userId parameter
    const response = await Instance.get<DataRes<Admin[]>>(`/api/admin/`); // Fetch all admins with userId
    return response.data; // Return the list of admins
}

const fetchAdminByUserId = async (userId: number): Promise<Admin> => { // Ensure the return type is Admin
    const response = await Instance.get<Admin>(`/api/admin/user/${userId}`); // Fetch admin by user ID
    return response.data; // Return the admin data
}
// ... existing code ...

export {
    fetchAdminById,
    fetchAllAdmins,
    fetchAdminByUserId
}
