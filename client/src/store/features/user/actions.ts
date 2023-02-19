import { createAction } from "@reduxjs/toolkit";
import { AuthService } from "../../../http/userAPI";
import { IUserDto, IUserState } from '../../../models/user.model';
import { AppDispatch } from "../../index";
import * as types from "./types";
import { $sys } from "../../../http";
import { AuthResponse } from "../../../models/response/auth.response";


export const UserActionCreator = {
    SetAuthAction: createAction<boolean>(types.UserActionEnum.SET_AUTH),
    SetUserAction: createAction<IUserState>(types.UserActionEnum.SET_USER),
    SetLoadingAction: createAction<boolean>(types.UserActionEnum.SET_LOADING),
    SetErrorAction: createAction<string>(types.UserActionEnum.SET_ERROR),

    login: (login: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            console.log('Action called!')
            dispatch(UserActionCreator.SetLoadingAction(true));
            console.log('Loading set!')
            const { data } = await AuthService.login(login, password);
            console.log('Data got!')
            console.log(data)
            localStorage.setItem('token', data.tokens.accessToken);
            dispatch(UserActionCreator.SetUserAction({user: data.user, stats: data.user.UserStats}));
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
            const { data } = await AuthService.register(userDto);
            localStorage.setItem('token', data.tokens.accessToken);
            dispatch(UserActionCreator.SetUserAction({user: data.user, stats: data.user.UserStats}));
            dispatch(UserActionCreator.SetAuthAction(true));
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
        console.log(data)
        localStorage.removeItem('token');
        dispatch(UserActionCreator.SetUserAction({} as IUserState));
        dispatch(UserActionCreator.SetAuthAction(false));

        dispatch(UserActionCreator.SetLoadingAction(false));
    },

    refreshAuth: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreator.SetLoadingAction(true));
            
            const { data } = await $sys.get<AuthResponse>('/auth/refresh');
            console.log(data)
            localStorage.setItem('token', data.tokens.accessToken);
            dispatch(UserActionCreator.SetUserAction({user: data.user, stats: data.user.UserStats}));
            dispatch(UserActionCreator.SetAuthAction(true));
        } catch(error: any) {
            dispatch(UserActionCreator.SetErrorAction(error.message));
            console.log(error);
        } finally {
            dispatch(UserActionCreator.SetLoadingAction(false));
        }
    }
}
