import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/auth.response";
import { IUserDto } from "../models/user.model";
import { $api } from ".";


export class SubjectService {
    static async createSubject(name: string): Promise<AxiosResponse> {
        return $api.post('/subject/create', {name});
    }
    static async deleteSubjectById(id: number): Promise<AxiosResponse> {
        const response = $api.get(`/subject/get/id/${id}`);
        return response
    }
    static async deleteSubjectByName(name: string): Promise<AxiosResponse> {
        const response = $api.get(`/subject/get/name/${name}`);
        return response
    }
    static async updateSubjectById(id: number): Promise<AxiosResponse> {
        const response = $api.put(`/subject/get/id/${id}`);
        return response
    }
    static async updateSubjectByName(name: string): Promise<AxiosResponse> {
        const response = $api.put(`/subject/update/name/${name}`);
        return response
    }

    static async getSubjectWorks(name: string) {
        return $api.get('/subject/get/works', {params: {name}})
    }

    static async getAll(): Promise<AxiosResponse> {
        const response = $api.get('/subject/get/all');
        return response
    }
}