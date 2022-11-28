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


export interface IRoute {
    path: string;
    element: React.ComponentType;
}


export enum RoutesEnum {
    HOME='/home',
    CLASS='/my_class',
    SUBJECTS='/subjects',
    SUBJECT='/subjects/:id',
    TASK_CONSTRUCTOR='/constructor',
    RESOURCES='/resources',

    LOGIN='/login',
    REGISTER='/register',
    ACCOUNT='/account'
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
    {path: RoutesEnum.RESOURCES, element: Resources},
    {path: RoutesEnum.ACCOUNT, element: UserAccount}
]

PrivateRoutes = PrivateRoutes.concat(subjects.Groups.reduce((res: IRoute[], group) => 
    res.concat(group.Contents.map((cur) => {return {path: cur.Path, element: Subject}})), []))
