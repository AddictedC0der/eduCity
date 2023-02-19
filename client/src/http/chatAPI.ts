import { AxiosResponse } from "axios";
import { IChatMessage } from "../models/chat.model"; 
import { $api } from ".";


export class ChatService {
    static async createMessage(message: IChatMessage): Promise<AxiosResponse> {
        return $api.post('/chat/create', {...message, author: message.author.id});
    }
    static async editMessage(messageId: number, newValue: string): Promise<AxiosResponse> {
        const response = $api.put(`/chat/${messageId}`, {newValue});
        return response
    }
    static async deleteMessage(messageId: number): Promise<AxiosResponse> {
        const response = $api.delete(`/chat/${messageId}`);
        return response;
    }

    static async getMessages(): Promise<AxiosResponse> {
        const response = $api.get(`/chat/all`);
        return response;
    }

    static async getMessage(messageId: number): Promise<AxiosResponse> {
        const response = $api.get(`/chat/${messageId}`);
        return response;
    }
}