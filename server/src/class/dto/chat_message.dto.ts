import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean } from "class-validator";


export class ChatMessageDto {
    @ApiProperty({example: 'Lorem ispum', description: 'Contents of message.'})
    @IsString({message: 'Text must be string.'})
    readonly text: string;

    @ApiProperty({example: '12345', description: 'ID of the message author.'})
    @IsNumber()
    readonly author: number;

    @ApiProperty({example: '01.01.22', description: 'Time when message was sent.'})
    @IsString({message: 'SendTime must be string.'})
    readonly sendTime: string;

    @ApiProperty({example: 'True', description: 'If true message was editied.'})
    @IsBoolean({message: 'isEditied must be boolean.'})
    readonly isEdited: boolean;

    @ApiProperty({example: '54321', description: 'ID of the message current message replying to.'})
    @IsNumber()
    readonly  replyTo: number;
}