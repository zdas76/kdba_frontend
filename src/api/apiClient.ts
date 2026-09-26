// src/api/apiClient.ts
import axios from 'axios';

// 1. Create a single, static instance outside of React
export const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// 2. Dynamically attach things like Auth Tokens right before requests go out
api.interceptors.request.use(
    (config) => {
        // If you store your token in localStorage, cookie, or a global store:
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
