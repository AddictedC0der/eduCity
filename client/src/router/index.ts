import * as React from "react";
import { MainPage } from "../components/pages/Main";
import SignUp from "../components/pages/SignUp";
import { LogIn } from '../components/pages/LogIn';
import { Subjects } from "../components/pages/Subjects";
import { MyClassPage } from '../components/pages/MyClass';
// import { TaskConstructor } from '../components/pages/TaskConstructor';
import { TaskConstructor } from '../components/constructor_lib/TaskConstructor';
import { Subject } from '../components/pages/Subject';
import { Resources } from "../components/pages/Resources";
import { UserAccount } from "../components/pages/UserAccount";
import subjects from '../Assets/subjects.json';
import { TaskView } from "../components/pages/TaskView";
import { ErrorPage } from "../components/pages/Error";
import { TheoryConstructor } from "../components/pages/TheoryConstructor";
import { Schools } from "../components/pages/Schools";
import { School } from "../components/pages/School";
import { WorkAnalysis } from "../components/pages/WorkAnalysis";
import { SolutionCheck } from "../components/pages/SolutionCheck";


export interface IRoute {
    path: string;
    element: React.ComponentType;
}


export enum RoutesEnum {
    HOME='/home',
    CLASS='/my_class',
    SUBJECTS='/subjects',
    SUBJECT='/subjects?id',
    THEORY_CONSTRUCTOR='/constructor/theory',
    TASK_CONSTRUCTOR='/constructor/work',
    TASK_VIEW='/task/',
    WORK_ANALYSIS='/work/',
    SOLUTION_CHECK='/solutions/:id',
    RESOURCES='/resources',
    SCHOOLS='/schools',
    SCHOOL='/schools/:id',

    LOGIN='/login',
    REGISTER='/register',
    ACCOUNT='/account/:id',
    ERROR='*'
}

export const PublicRoutes: IRoute[] = [
    {path: RoutesEnum.REGISTER, element: SignUp},
    {path: RoutesEnum.LOGIN, element: LogIn}
]

export let PrivateRoutes: IRoute[] = [
    {path: RoutesEnum.HOME, element: MainPage},
    {path: RoutesEnum.SUBJECTS, element: Subjects},
    {path: RoutesEnum.CLASS, element: MyClassPage},
    {path: RoutesEnum.TASK_CONSTRUCTOR, element: TaskConstructor},
    {path: RoutesEnum.TASK_VIEW, element: TaskView},
    {path: RoutesEnum.WORK_ANALYSIS, element: WorkAnalysis},
    {path: RoutesEnum.SOLUTION_CHECK, element: SolutionCheck},
    {path: RoutesEnum.RESOURCES, element: Resources},
    {path: RoutesEnum.SCHOOLS, element: Schools},
    {path: RoutesEnum.SCHOOL, element: School},
    {path: RoutesEnum.ACCOUNT, element: UserAccount},
    {path: RoutesEnum.THEORY_CONSTRUCTOR, element: TheoryConstructor},
    {path: RoutesEnum.ERROR, element: ErrorPage}
]

PrivateRoutes = PrivateRoutes.concat(subjects.Groups.reduce((res: IRoute[], group) => 
    res.concat(group.Contents.map((cur) => {return {path: cur.Path, element: Subject}})), []))
