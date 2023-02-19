import { IChatMessage, IRealChatMessage } from "../../../models/chat.model";


export interface IChatState {
    messages: IRealChatMessage[];
    isLoading: boolean;
    error: string;
}

export enum ChatActionEnum {
    SET_MESSAGES='chat/SET_MESSAGES',
    SET_LOADING='chat/SET_LOADING',
    SET_ERROR='error/SET_ERROR'
}

export interface ISetMessagesAction {
    action: ChatActionEnum.SET_MESSAGES;
    payload: boolean;
}

export interface ISetLoadingAction {
    action: ChatActionEnum.SET_LOADING;
    payload: boolean;
}

export interface ISetErrorAction {
    action: ChatActionEnum.SET_ERROR;
    payload: string;
}
