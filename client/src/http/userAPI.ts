import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/auth.response";
import { IUserDto } from "../models/user.model";
import { $api } from ".";


export class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {login, password});
    }
    static async register(userDto: IUserDto): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/register', userDto);
    }
    static async logout(): Promise<void> {
        return $api.post('/auth/logout');
    }
}