import axios from "axios";
import { AuthResponse } from "../models/response/auth.response";


const $sys = axios.create(
    {baseURL: process.env.REACT_APP_API_URL, withCredentials: true}
)


const $api = axios.create(
    {baseURL: process.env.REACT_APP_API_URL, withCredentials: true}
)

$api.interceptors.request.use((config: any) => {
    config.header.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config: any) => {
    return config;
}, async (error) => {
    const original = error.config;
    if (((error.response.status === 401) || (error.response.status === 403)) && error.config && !error.config._isRetry) {
        original._isRetry = true;
        try {
            const { data } = await $sys.get<AuthResponse>('auth/refresh');
            localStorage.setItem('token', data.tokens.accessToken);
            return $api.request(original);
        } catch(e) {
            console.log('User is not authorized');
        }
    }
    throw error;
})

export {$sys, $api}
