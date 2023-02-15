import { AxiosResponse } from "axios";
import { IChatMessage } from "../models/chat.model"; 
import { $api } from ".";
import { IClass } from "../models/class.model";


export class ClassService {
    static async createClass(classDto: IClass): Promise<AxiosResponse> {
        const response = $api.post('/class/create', {...classDto});
        return response;
    }


    static async deleteClass(classId: number): Promise<AxiosResponse> {
        const response = $api.delete(`/class/${classId}`);
        return response
    }

    static async getClassById(classId: number): Promise<AxiosResponse> {
        const response = $api.get(`/class/id/${classId}`);
        return response;
    }

    static async getClassByName(className: string): Promise<AxiosResponse> {
        const response = $api.get(`/class/name/${className}`);
        return response;
    }

    static async getAll(): Promise<AxiosResponse> {
        const response = $api.get(`/class/all`);
        return response;
    }

    static async findUserClass(userId: number): Promise<AxiosResponse> {
        const response = $api.get(`/class/get/user/${userId}`);
        return response;
    }
}