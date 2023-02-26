import { AxiosResponse } from "axios";
import { $api } from ".";
import { IRealResource, IResource } from "../models/resource.model";


export class ResourceService {
    static async createResource(resourceDto: IResource): Promise<AxiosResponse> {
        const response = $api.post('/resource/create', {...resourceDto});
        return response;
    }

    static async deleteResource(resourceId: number): Promise<AxiosResponse> {
        const response = $api.delete(`/resource/${resourceId}`);
        return response
    }

    static async getAll(): Promise<AxiosResponse> {
        const response = $api.get(`/resource/get/all`);
        return response;
    }
}