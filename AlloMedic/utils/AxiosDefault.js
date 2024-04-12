import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tokenKey = "tokenKey";

axios.defaults.baseURL = "http://192.168.3.3:8009";

const AxiosDefault = axios.create();

// Add a request interceptor to set headers before each request
AxiosDefault.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(tokenKey);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosDefault;
