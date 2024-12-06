import { Instance } from "../axious"
import { UsersRes, Users, DataRes } from "../types/user.type"

const fetchAllUser = async () => {
  const response = await Instance.get<DataRes<Users[]>>('/users/');
  return response.data.data;
}

const addUser = async (newUser: { first_name: string; last_name: string; email: string; password: string; role: string;}) => {
  const response = await Instance.post<DataRes<Users[]>>('/users/register', newUser); 
  return response.data.data;
}

const NewPassword = async (newPassword: string) => {
  const response = await Instance.post('/users/set-new-password', { newPassword });
  return response.data; // Assuming the response contains the message
}

const fetchDriverCount = async (): Promise<number> => { // New function to fetch driver count
  const response = await Instance.get<{ count: number }>('/users/drivers/count'); // Fetch the driver count
  return response.data.count; // Return the count from the response
}

const fetchAllUserId = async () => {
  const response = await Instance.get<DataRes<Users[]>>('/users/');
  const allUsers = response.data.data; // Get all users
  const driverUsers = allUsers.filter(user => user.role === 'driver'); // Filter users by role
  return driverUsers.map(user => user.user_id); // Return only the user IDs of drivers
}

export {
  fetchAllUser,
  addUser,
  NewPassword,
  fetchDriverCount,
  fetchAllUserId
}
