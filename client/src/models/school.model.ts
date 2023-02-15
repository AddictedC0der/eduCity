import { IUser } from "./user.model";


export interface ISchool {
    SchoolName: string;
    Address: string;
    Link: string;
    Admins: number[]
}

export interface IRealSchool {
    SchoolName: string;
    Address: string;
    Rating: number;
    Link: string;
    Admins: IUser[];
    id: number;
}

export interface ISchoolDto {
    SchoolName: string;
    Address: string;
    Rating: number;
    Link: string;
    Admins: number[];
    id: number;
}