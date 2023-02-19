import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/auth.response";
import { IUserDto } from "../models/user.model";
import { $api } from ".";


export class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {login: login, password: password});
    }
    static async register(userDto: IUserDto): Promise<AxiosResponse<AuthResponse>> {
        const response = $api.post<AuthResponse>('/auth/register', userDto);
        return response
    }
    static async logout(): Promise<void> {
        return $api.post('/auth/logout');
    }

    static async changePassword(userId: number, passowrds: {old: string, new: string}): Promise<void> {
        return $api.post(`/auth/changePassword/${userId}`, {...passowrds});
    }
    static async changePasswordWithoutValidation(userId: number, passowrd: string): Promise<void> {
        return $api.post(`/auth/changePassword/noValidation/${userId}`, {passowrd});
    }
}


export class UserService {
    static async deleteAccount(userId: number): Promise<AxiosResponse> {
        const response = $api.delete(`/user/${userId}`);
        return response;
    }

    static async getAllStudents(): Promise<AxiosResponse> {
        const response = $api.get('/user/get/students');
        return response;
    }

    static async getAllTeachers(): Promise<AxiosResponse> {
        const response = $api.get('/user/get/teachers');
        return response;
    }

    static async getUserByName(userName: string): Promise<AxiosResponse> {
        const response = $api.get(`/user/get/name/${userName}`);
        return response;
    }

    static async getUserById(userId: number): Promise<AxiosResponse> {
        const response = $api.get(`/user/get/id/${userId}`);
        return response;
    }

    static async getAll(): Promise<AxiosResponse> {
        const response = $api.get('/user/all');
        return response;
    }
}