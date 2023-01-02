import { createReducer } from "@reduxjs/toolkit";
import { IUserState } from '../../../models/user.model';
import * as types from './types';
import { UserActionCreator } from "./actions";


const initialState: types.UserState = {
    isAuth: false,
    //@ts-ignore
    user: {} as IUserState,
    isLoading: false,
    error: ''
}


const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(UserActionCreator.SetAuthAction, (state, action) => {
            state.isAuth = action.payload;
        })
        .addCase(UserActionCreator.SetUserAction, (state, action) => {
            state.user = action.payload;
        })
        .addCase(UserActionCreator.SetLoadingAction, (state, action) => {
            state.isLoading = action.payload;
        })
        .addCase(UserActionCreator.SetErrorAction, (state, action) => {
            state.error = action.payload;
        })
})

export default userReducer;