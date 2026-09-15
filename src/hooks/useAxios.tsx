// import { useAuth } from './AuthContext'; 
import axios from 'axios';

export function useApi() {
    // const { token } = useAuth(); 

    const apiInstance = axios.create({
        baseURL: 'http://localhost:5000/api/v1',
        headers: {
            // Authorization: `Bearer ${token}`,
        },
    });

    return apiInstance;
}
