import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Backend URL
const backendUrl = process.env.EXPO_PUBLIC_API_URL; // Replace with your actual backend URL
// Function to get the JWT token from Secure Store
const getJwtToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('jwtToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token', error);
    return null;
  }
};

// Axios instance
const AxiosDefault = axios.create({
  baseURL: backendUrl
});

// Interceptor to add the JWT token to the request headers
AxiosDefault.interceptors.request.use(
  async (config) => {
    const token = await getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export AxiosDefault instance for use in other files
export default AxiosDefault;