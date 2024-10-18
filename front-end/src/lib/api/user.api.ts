import { Instance } from "../axious"
import { UsersRes, Users, DataRes } from "../types/user.type"

const fetchAllUser = async () => {
  const response = await Instance.get<DataRes<Users[]>>('/users/');
  return response.data.data;
}

const addUser = async (newUser: { first_name: string; last_name: string; email: string; password: string; role: string; phoneNumber: string; }) => {
  const response = await Instance.post<DataRes<Users[]>>('/users/register', newUser); // Pass newUser data
  return response.data.data;
}




export {
  fetchAllUser,
  addUser,
}
