import { IRealSubject } from "./subject.model";
import { IUser } from "./user.model";

export interface IResource {
    Link: string;
    Category: number;
    Author: number;
}


export interface IRealResource {
    id: number;
    Link: string;
    Category: IRealSubject;
    Author: IUser;
}