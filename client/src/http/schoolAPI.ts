import { AxiosResponse } from "axios";
import { $api } from ".";
import { ISchool } from "../models/school.model";


export class SchoolService {
    static async createSchool(schoolDto: ISchool): Promise<AxiosResponse> {
        const response = $api.post('/school/create', {...schoolDto});
        return response;
    }

    static async renameSchool(schoolId: number, newName: string): Promise<AxiosResponse> {
        const response = $api.put(`/school/name/${schoolId}`, {newName});
        return response;
    }

    static async changeSchoolAddress(schoolId: number, newAddress: string): Promise<AxiosResponse> {
        const response = $api.put(`/school/address/${schoolId}`, {newAddress});
        return response;
    }

    static async deleteSchool(schoolId: number): Promise<AxiosResponse> {
        const response = $api.delete(`/school/${schoolId}`);
        return response
    }

    static async getSchoolById(schoolId: number): Promise<AxiosResponse> {
        const response = $api.get(`/school/id/${schoolId}`);
        return response;
    }

    static async getSchoolByName(className: string): Promise<AxiosResponse> {
        const response = $api.get(`/school/name/${className}`);
        return response;
    }

    static async getUserSchools(userId: number) {
        const response = $api.get(`/school/user/${userId}`);
        return response;
    }

    static async getAll(): Promise<AxiosResponse> {
        const response = $api.get(`/school/all`);
        return response;
    }
}