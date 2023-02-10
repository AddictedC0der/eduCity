import { PageJSON } from '../components/constructor_lib/algorithms/serialization';


export interface ITask {
    TaskHashUi: PageJSON;
    TaskIndex: number;
}

export interface IWork {
    Name: string;
    Author: number;
    Category: string;
    AutoChecking: boolean;
    AdvancedChecking: boolean;
    Time: number | null;
    AdditionalTime: number | null;
    Privacy: string;
    Difficulty: number;
    Class: number;
    Tasks: ITask[]
}
