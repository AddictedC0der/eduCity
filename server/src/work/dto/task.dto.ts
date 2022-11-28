import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, IsArray, IsNumber } from "class-validator";


export class CreateTaskDto {
    @ApiProperty({example: 'Number division.', description: 'ID of the work current task belongs to.'})
    @IsNumber()
    readonly ParentWork: number;

    @ApiProperty({example: '2', description: 'Index of the task in current work.'})
    @IsNumber()
    readonly TaskIndex: number;

    @ApiProperty({example: '<HASH_PATTERN>', description: 'UI Hash of the task.'})
    @IsString({message: 'TaskHashUi must be string.'})
    readonly TaskHashUi: string;
}