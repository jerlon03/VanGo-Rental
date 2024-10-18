import {Admin, DataRes} from '@/lib/types/admin.type'
import { Instance } from '../axious';
import { useAuth } from '@/Provider/context/authContext';

const { user, loading } = useAuth();

const fetchAdminById = async (id: number) => {
    const response = await Instance.get<DataRes<Admin>>(`/api/admin/${id}`); // Fetch admin by ID
    return response.data; // Return the admin data
}

// New function to fetch all admins
const fetchAllAdmins = async (userId: number) => { // Added userId parameter
    const response = await Instance.get<DataRes<Admin[]>>(`/api/admin/?userId=${userId}`); // Fetch all admins with userId
    return response.data; // Return the list of admins
}

export {
    fetchAdminById,
    fetchAllAdmins
}
