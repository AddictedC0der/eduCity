import { createAction } from "@reduxjs/toolkit";
import { ChatService } from "../../../http/chatAPI";
import { IChatMessage, IRealChatMessage } from '../../../models/chat.model';
import { AppDispatch } from "../../index";
import * as types from "./types";


export const ChatActionCreator = {
    SetMessagesAction: createAction<IRealChatMessage[]>(types.ChatActionEnum.SET_MESSAGES),
    SetLoadingAction: createAction<boolean>(types.ChatActionEnum.SET_LOADING),
    SetErrorAction: createAction<string>(types.ChatActionEnum.SET_ERROR),

    load_messages: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(ChatActionCreator.SetLoadingAction(true));
            const { data } = await ChatService.getMessages();
            console.log(data)
            dispatch(ChatActionCreator.SetMessagesAction(data));
        } catch(error: any) {
            dispatch(ChatActionCreator.SetErrorAction(error.message));
            console.log(error)
        } finally {
            dispatch(ChatActionCreator.SetLoadingAction(false))
        }
    },

    createMessage: (messageDto: IChatMessage) => async (dispatch: AppDispatch) => {
        try {
            return await ChatService.createMessage(messageDto);
        } catch(error: any) {
            dispatch(ChatActionCreator.SetErrorAction(error.message));
            console.log(error);
        }
    },

    editMessage: (messageId: number, newValue: string) => async (dispatch: AppDispatch) => {
        try {
            await ChatService.editMessage(messageId, newValue);
        } catch(error: any) {
            dispatch(ChatActionCreator.SetErrorAction(error.message));
            console.log(error);
        }
        
    },

    deleteMessage: (messageId: number) => async (dispatch: AppDispatch) => {
        try {
            await ChatService.deleteMessage(messageId);
        } catch(error: any) {
            dispatch(ChatActionCreator.SetErrorAction(error.message));
            console.log(error);
        }
    }
}
