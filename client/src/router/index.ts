import * as React from "react"
import { MainPage } from "../components/pages/Main";
import SignUp from "../components/pages/SignUp";
import { Subjects } from "../components/pages/Subjects";
import { MyClassPage } from '../components/pages/MyClass'


export interface IRoute {
    path: string;
    element: React.ComponentType;
}


export enum RoutesEnum {
    HOME='/home',
    CLASS='/my_class',
    SUBJECTS='/subjects',
    SUBJECT='/subjects/:id',
    
    LOGIN='/login',
    REGISTER='/register'
}

export const PublicRoutes: IRoute[] = [
    {path: RoutesEnum.REGISTER, element: SignUp}
]

export const PrivateRoutes: IRoute[] = [
    {path: RoutesEnum.HOME, element: MainPage},
    {path: RoutesEnum.SUBJECTS, element: Subjects},
    {path: RoutesEnum.CLASS, element: MyClassPage}
]