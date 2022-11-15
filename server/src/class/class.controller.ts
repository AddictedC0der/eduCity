import { Controller, Post, Delete, Put, Get, Body, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ChatService } from "./class.service";
import { ChatMessageDto } from "./dto/chat_message.dto";
import { ChatMessage } from "./entities/chat_message.entity";


@ApiTags('Chat')
@Controller('/api/chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @ApiOperation({summary: 'Creates provided message'})
    @ApiResponse({status: 201})
    @Post('/create')
    async createMessage(@Body() messageDto: ChatMessageDto) {
        return this.ChatService.createMessage(messageDto);
    }

    @ApiOperation({summary: 'Deletes provided message'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async deleteMessage(@Param('id') messageId: number) {
        return this.ChatService.deleteMessage(messageId);
    }
    
    @ApiOperation({summary: 'Edits provided message'})
    @ApiResponse({status: 200})
    @Put('/:id')
    async editMessage(@Param('id') messageId: number, @Body() newValue: string) {
        return this.ChatService.editMessage(messageId, newValue);
    }

    @ApiOperation({summary: 'Gets all messages.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/all')
    async getAll() {
        const response = this.ChatService.getAll();
        return response
    }

    @ApiOperation({summary: 'Gets message by id'})
    @ApiResponse({status: 200})
    @Get('/:id')
    async getMessage(@Param('id') messageId: number) {
        const response = this.ChatService.getMessage(messageId);
        return response;
    }

    
}