import { createReducer } from "@reduxjs/toolkit";
import * as types from './types';
import { ChatActionCreator } from "./actions";


const initialState: types.IChatState = {
    messages: [],
    isLoading: false,
    error: ''
}


const chatReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ChatActionCreator.SetMessagesAction, (state, action) => {
            state.messages = action.payload;
        })
        .addCase(ChatActionCreator.SetLoadingAction, (state, action) => {
            state.isLoading = action.payload;
        })
        .addCase(ChatActionCreator.SetErrorAction, (state, action) => {
            state.error = action.payload;
        })
})

export default chatReducer;