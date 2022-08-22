import axios from "axios";
import { AuthResponse } from "../models/response/auth.response";


const $sys = axios.create(
    {baseURL: process.env.REACT_APP_API_URL, withCredentials: true}
)

const $api = axios.create(
    {baseURL: process.env.REACT_APP_API_URL, withCredentials: true}
)

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config: any) => {
    return config;
}, async (error) => {
    console.log(error)
    const original = error.config;
    if (((error.response.status === 401) || (error.response.status === 403)) && error.config && !error.config._isRetry) {
        original._isRetry = true;
        try {
            const { data } = await $sys.get<AuthResponse>('auth/refresh');
            localStorage.setItem('token', data.tokens.accessToken);
            return $api.request(original);
        } catch(e) {
            console.log('User is not authorized');
            return Promise.reject(e)
        }
    }
    return Promise.reject(error);
})

export {$sys, $api}
