import { IUser } from "./user.model";

export interface ISolution {
    Content: {tasks: {elements: {type: string, properties: any}[]}[]};
    Author: number;
    Work: number;
    Rating: string;
}


export interface IRealSolution {
    Content: {tasks: {elements: {type: string, properties: any}[]}[]};
    Author: IUser;
    Work: number;
    Rating: string;
    id: number;
}