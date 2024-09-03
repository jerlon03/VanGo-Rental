import { Instance } from "../axious"
import { UsersRes, Users, DataRes } from "../types/user.type"
 
const fetchAllUser = async () => {
  const response = await Instance.get<DataRes<Users[]>>('/users/');
  return response.data.data;
}

const addUser = async () => {
  const response = await Instance.post<DataRes<Users[]>>('/users/');
  return response.data.data;
}
  
  export {
    fetchAllUser,
    addUser,
  }