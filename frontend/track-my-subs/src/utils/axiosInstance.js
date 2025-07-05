import axios from 'axios';
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
        Accept : "application/json",
    },
});


// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor

axiosInstance.interceptors.response.use(
    (response) => { 
        return response;
    },
    error => {
        if (error.response){
            if (error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                window.location.href = "/"; // Adjust the path as needed
            }
            else if (error.response.status === 500) {
                console.error("Server error:", error.response.data);
            } 
            else if (error.code === 'ECONNABORTED') {
                console.error("Request timeout:", error.message);
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
