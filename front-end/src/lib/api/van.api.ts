import { Instance } from "../axious"
import { Van ,DataRes, VanStatusCount} from "../types/van.type"


const fetchAllVan = async () => {
    const response = await Instance.get<DataRes<Van[]>>('/api/van/');
    return response.data;
}

const fetchAddVan = async (data: Van) => {
    const response = await Instance.post<DataRes<Van[]>>('/api/van/create');
    return response.data;
}

const fetchAllPublicVan = async () => {
    const response = await Instance.get<DataRes<Van[]>>('/public/van/');
    return response.data;
}

const fetchUpdateVan = async (id: number, data: Van) => {
    const response = await Instance.put<DataRes<Van>>(`/api/van/update/${id}`, data);
    return response.data;
}

const fetchUpdateVanStatus = async (id: number, status: string) => {
    const response = await Instance.put<DataRes<Van>>(`/api/van/update-status/${id}`, {
        status: "ok",
        data: {
            van_id: id.toString(),
            status: status
        }
    });
    return response.data;
}

const getVanDetailsById = async (id: number) => {
    const response = await Instance.get<DataRes<Van>>(`/api/van/van/${id}`);
    return response.data;
}

const getVanCountByStatus = async () => {
    try {
        const response = await Instance.get<{ status: string; data: VanStatusCount[] }>(`/api/van/vans/count-by-status`); // Fetch the count of vans by status
        return response.data; // Return the data array
    } catch (error) {
        console.error('Error fetching van counts by status:', error); // Log the error for debugging
        throw error; // Rethrow the error to be handled in the calling function
    }
};

const fetchVanCount = async () => {
    const response = await Instance.get<{ status: string; total_count: number }>('/api/van/vans/count'); // Fetch the count of vans
    return response.data.total_count; // Return the total_count from the response
}

const fetchDeleteVan = async (id: number) => {
    const response = await Instance.delete<DataRes<{ status: string; message: string; driver_id: number }>>(`/api/van/delete/${id}`);
    return response.data;
}

export {
    fetchAllVan,
    fetchDeleteVan,
    fetchAddVan,
    fetchAllPublicVan,
    fetchUpdateVan,
    fetchUpdateVanStatus,
    getVanDetailsById,
    getVanCountByStatus,
    fetchVanCount
  }