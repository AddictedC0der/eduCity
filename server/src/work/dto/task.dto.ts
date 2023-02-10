import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, IsArray, IsNumber, IsJSON } from "class-validator";


export interface TaskHashUiJSON {
    answer: string;
    elements: {
        type: string;
        properties: any
    }[]
}


export class CreateTaskDto {
    @ApiProperty({example: '142.', description: 'ID of the work current task belongs to.'})
    @IsNumber()
    readonly ParentWork: number;

    @ApiProperty({example: '2', description: 'Index of the task in current work.'})
    @IsNumber()
    readonly TaskIndex: number;

    @ApiProperty({example: '<JSON UI TEMPLATE>', description: 'UI Hash of the task.'})
    @IsJSON({message: 'TaskHashUi must be JSON.'})
    readonly TaskHashUi: TaskHashUiJSON;
}