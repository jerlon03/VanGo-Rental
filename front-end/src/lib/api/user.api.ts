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

// lib/api.js
export async function getUserInfo() {
  try {
    const response = await fetch('http://localhost:8080/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assume token is stored in localStorage
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('User Info:', data);
      return data; // Contains the user's full name, email, and role
    } else {
      const errorData = await response.json();
      console.error('Error fetching user info:', errorData.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
  console.log(getUserInfo, 'DAWDW')
}





export {
  fetchAllUser,
  addUser,
}