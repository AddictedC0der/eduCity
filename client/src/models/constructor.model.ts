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
    Time: string | null;
    AdditionalTime: string | null;
    Privacy: string;
    Difficulty: number;
    Class: number;
    Tasks: ITask[]
}
