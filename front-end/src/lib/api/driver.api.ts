import { Instance } from "../axious"
import { ApiResponse , Driver} from "../types/driver.type";


const getDriver = async (userId: number) => {
    try {
        const response = await Instance.get<ApiResponse>(`/api/driver/${userId}`);
        return response.data; // Return the driver data
    } catch (error) {
        console.error('Error fetching driver data:', error); // Log the error details
        throw error; // Rethrow the error to be handled in the calling function
    }
}
const updateDriver = async (userId: number, updatedData: {
    first_name: string;
    last_name: string;
    email: string;
    experience_years: number;
    vehicle_assigned: string;
    phoneNumber: string;
    location: string;
}) => {
    const response = await Instance.put<ApiResponse>(`/api/driver/${userId}`, updatedData); // Pass updated data in the request
    return response.data;
}

// const getAllDriver = async () => {
//     const response = await Instance.get<Driver>(`/api/driver/`);
//     return response.data;
// }

const getAllDriver = async () => {
    try {
        const response = await Instance.get<{ data: Driver[] }>(`/api/driver/`); // Specify the expected response type
        return response.data; // Return the data array
    } catch (error) {
        console.error('Error fetching drivers:', error); // Log the error for debugging
        throw error; // Rethrow the error to be handled by the calling function
    }
};

export {
    getDriver, updateDriver, getAllDriver
}