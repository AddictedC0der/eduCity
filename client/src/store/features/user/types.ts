import { IUserState } from "../../../models/user.model";


export interface UserState {
    isAuth: boolean;
    user: IUserState;
    isLoading: boolean;
    error: string;
}

export enum UserActionEnum {
    SET_AUTH='user/SET_AUTH',
    SET_USER='user/SET_USER',
    SET_LOADING='user/SET_LOADING',
    SET_ERROR='user/SET_ERROR'
}

export interface ISetAuthAction {
    action: UserActionEnum.SET_AUTH;
    payload: boolean;
}

export interface ISetUserAction {
    action: UserActionEnum.SET_USER;
    payload: IUserState;
}

export interface ISetLoadingAction {
    action: UserActionEnum.SET_LOADING;
    payload: boolean;
}

export interface ISetErrorAction {
    action: UserActionEnum.SET_ERROR;
    payload: string;
}
