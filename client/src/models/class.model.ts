import { IRealSchool } from "./school.model";
import { IUser } from "./user.model";

export interface IClass {
    Name: string;
    School: number;
    ContainedStudents: number[];
    ContainedTeachers: number[];
}


export interface IRealClass {
    id: number;
    Name: string;
    School: IRealSchool;
    ContainedStudents: IUser[];
    ContainedTeachers: IUser[];
}