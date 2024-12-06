import { Instance } from "../axious"
import { ApiResponse , Driver, DriverDetails} from "../types/driver.type";


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

const getAllDriver = async () => {
    try {
        const response = await Instance.get<{ data: Driver[] }>(`/api/driver/drivers/not-assigned`); // Specify the expected response type
        return response.data; // Return the data array
    } catch (error) {
        console.error('Error fetching drivers:', error); // Log the error for debugging
        throw error; // Rethrow the error to be handled by the calling function
    }
};

const getVanById = async (id: number) => { // Accept id as a parameter
    try {
        const response = await Instance.get<{ data: DriverDetails[] }>(`/api/driver/driver/${id}`); // Check if this endpoint is correct
        return response.data; // Return the data array
    } catch (error) {
        console.error('Error fetching driver:', error); // Log the error for debugging
        return null; // Return null or handle as needed
    }
};



export {
    getDriver, updateDriver, getAllDriver,getVanById
}