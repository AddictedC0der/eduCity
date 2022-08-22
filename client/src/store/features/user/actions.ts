import { createAction } from "@reduxjs/toolkit";
import { AuthService } from "../../../http/userAPI";
import { IUserDto, IUser } from '../../../models/user.model';
import { AppDispatch } from "../../index";
import * as types from "./types";
import { $sys } from "../../../http";
import { AuthResponse } from "../../../models/response/auth.response";


export const UserActionCreator = {
    SetAuthAction: createAction<boolean>(types.UserActionEnum.SET_AUTH),
    SetUserAction: createAction<IUser>(types.UserActionEnum.SET_USER),
    SetLoadingAction: createAction<boolean>(types.UserActionEnum.SET_LOADING),
    SetErrorAction: createAction<string>(types.UserActionEnum.SET_ERROR),

    login: (login: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreator.SetLoadingAction(true));

            const { data } = await AuthService.login(login, password);
            localStorage.setItem('token', data.tokens.accessToken);
            dispatch(UserActionCreator.SetUserAction(data.user));
            dispatch(UserActionCreator.SetAuthAction(true))
        } catch(error: any) {
            dispatch(UserActionCreator.SetErrorAction(error.message));
            console.log(error)
        } finally {
            dispatch(UserActionCreator.SetLoadingAction(false))
        }
    },

    register: (userDto: IUserDto) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreator.SetLoadingAction(true));
            console.log('Loading')
            const { data } = await AuthService.register(userDto);
            console.log('Registered')
            localStorage.setItem('token', data.tokens.accessToken);
            console.log('Token set')
            dispatch(UserActionCreator.SetUserAction(data.user));
            console.log('User set')
            dispatch(UserActionCreator.SetAuthAction(true));
            console.log('Auth set')
        } catch(error: any) {
            dispatch(UserActionCreator.SetErrorAction(error.message));
            console.log(error);
        } finally {
            dispatch(UserActionCreator.SetLoadingAction(false));
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        dispatch(UserActionCreator.SetLoadingAction(true));

        const data = await AuthService.logout();
        localStorage.remove('token');
        dispatch(UserActionCreator.SetUserAction({} as IUser));
        dispatch(UserActionCreator.SetAuthAction(false));

        dispatch(UserActionCreator.SetLoadingAction(false));
    },

    refreshAuth: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreator.SetLoadingAction(true));
            
            const { data } = await $sys.get<AuthResponse>('/auth/refresh');
            console.log(data)
            localStorage.setItem('token', data.tokens.accessToken);
            dispatch(UserActionCreator.SetUserAction(data.user));
            dispatch(UserActionCreator.SetAuthAction(true));
        } catch(error: any) {
            dispatch(UserActionCreator.SetErrorAction(error.message));
            console.log(error);
        } finally {
            dispatch(UserActionCreator.SetLoadingAction(false));
        }
    }
}
