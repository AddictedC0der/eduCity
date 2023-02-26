import { IWork } from "./constructor.model";
import { IUser } from "./user.model";


export interface IRealSubject {
    id: number;
    SubjectName: string;
    Works: IWork[];
    Users: IUser[];
}