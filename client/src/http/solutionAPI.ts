import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/auth.response";
import { IUserDto } from "../models/user.model";
import { $api } from ".";
import { ISolution } from "../models/solution.model";


export class SolutionService {
    static async createSolution(solutionDto: ISolution): Promise<AxiosResponse> {
        return $api.post('/solution/create', {...solutionDto});
    }
    static async getUserSolutions(userId: number): Promise<AxiosResponse> {
        const response = $api.get(`/solution/get/user/${userId}`);
        return response
    }
    static async getWorkSolutions(workId: number): Promise<AxiosResponse> {
        const response = $api.get(`/solution/get/work/${workId}`);
        return response
    }
}