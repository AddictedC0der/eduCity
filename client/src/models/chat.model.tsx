import { IUser } from './user.model'

export interface IChatMessage {
    text: string;
    author: IUser;
    sendTime: string;
    replyTo: number;
    isEdited: boolean;
}

export interface IRealChatMessage {
    text: string;
    author: IUser;
    sendTime: string;
    replyTo: IRealChatMessage | null;
    isEdited: boolean;
    id: number;
}