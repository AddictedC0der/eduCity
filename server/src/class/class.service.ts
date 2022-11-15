import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ChatMessage } from "./entities/chat_message.entity";
import { ChatMessageDto } from "./dto/chat_message.dto";
import { User } from "../user/entities/user.entity";


@Injectable()
export class ChatService {
    constructor(@InjectRepository(ChatMessage) private ChatMessageRepo: Repository<ChatMessage>,
                @InjectRepository(User) private UserRepo: Repository<User>) {}

    async createMessage(messageDto: ChatMessageDto): Promise<ChatMessage> {
        const targetUser = await this.UserRepo.findOne({where: {id: messageDto.author}});
        const targetMessage = await this.ChatMessageRepo.findOne({where: {id: messageDto.replyTo}})
        const response = this.ChatMessageRepo.create({...messageDto, author: targetUser, replyTo: targetMessage});
        this.ChatMessageRepo.save(response);
        return response;
    }

    async deleteMessage(messageId: number): Promise<DeleteResult> {
        const response = await this.ChatMessageRepo.delete(messageId);
        return response;
    }

    async editMessage(messageId: number, newValue: string): Promise<UpdateResult> {
        const response = await this.ChatMessageRepo.update(messageId, {text: newValue, isEdited: true})
        return response;
    }

    async getMessage(messageId): Promise<ChatMessage> {
        const response = await this.ChatMessageRepo.findOne({where: {id: messageId}});
        return response;
    }

    async getAll(): Promise<ChatMessage[]> {
        const response = await this.ChatMessageRepo.find({relations: {replyTo: true, author: true}});
        return response;
    }
}