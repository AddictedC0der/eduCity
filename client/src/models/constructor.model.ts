export interface ITask {
    TaskHashUi: string;
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
