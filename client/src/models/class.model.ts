import { IUser } from "./user.model";

export interface IClass {
    Name: string;
    School: number;
    ContainedStudents: number[];
    ContainedTeachers: number[];
}


export interface IRealClass {
    Name: string;
    School: number;
    ContainedStudents: IUser[];
    ContainedTeachers: IUser[];
}