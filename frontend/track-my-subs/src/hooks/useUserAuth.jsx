import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axiosInstance from "../utils/axiosInstance"; 
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";


export const useUserAuth = () => {
    const  {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // User is already authenticated, no need to fetch
            return;
        }
        
        let isMounted = true; // Track if component is mounted

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
                if (isMounted && response.data) {
                    updateUser(response.data); // Update user context with fetched user data
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (isMounted) {
                    clearUser(); // Clear user context on error
                    navigate("/Login"); // Redirect to login page
                }
            }
        }

                fetchUserInfo();
        
                return () => {
                    isMounted = false;
                };
            }, [user, updateUser, clearUser, navigate]);
        
        };