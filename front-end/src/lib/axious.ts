import axios from 'axios';

// Retrieve base URL from environment variables
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';


const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token'); // Ensure this runs only on the client side
  }
  return null;
};
// Create an Axios instance with the base URL and default headers
const Instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}` // Uncomment if you have a token
  }
});

export {Instance};
