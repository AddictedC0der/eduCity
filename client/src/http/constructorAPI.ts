import { AxiosResponse } from "axios";
import { $api } from ".";
import { IWork, ITask } from "../models/constructor.model";


export class ConstructorService {
    static async createTask(dto: ITask) {
        return $api.post('/work/create', dto);
    }

    static async createWork(dto: IWork) {
        return $api.post('/work/create', dto);
    }

    static async getWorkById(workId: string) {
        return $api.get(`/work/get/id/${workId}`);
    }

    static async getAllWorks() {
        return $api.get('/work/all');
    }
}