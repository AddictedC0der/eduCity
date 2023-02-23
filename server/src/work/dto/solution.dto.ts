import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, IsArray, IsNumber, IsBoolean, IsJSON, IsObject } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { DeepPartial } from "typeorm";
import { WorkLikeJSON } from "./task.dto";


export class CreateSolutionDto {
    @ApiProperty({example: '234', description: 'Id of author.'})
    @IsNumber()
    readonly Author: number;

    @ApiProperty({example: '<WORK JSON TEMPLATE>', description: 'Content of the solution.'})
    @IsObject({message: 'Content must be object.'})
    readonly Content: WorkLikeJSON;

    @ApiProperty({example: '3', description: 'Id of work of the solution.'})
    @IsNumber()
    readonly Work: number;

    @ApiProperty({example: '85', description: 'Rating of the solution (in relation to 100).'})
    @IsString()
    readonly Rating: string;
}


// export class UpdateWorkDto {
//     @ApiProperty({example: 'Number division.', description: 'Name of the work.'})
//     @IsString({message: 'WorkName must be string.'})
//     @Length(3, 40, {message: 'Name length must be at least 3 symbols and no more than 40 symbols.'})
//     readonly Name: string;

//     @ApiProperty({example: 'Math', description: 'Category of the work.'})
//     @IsString({message: 'Category must be string.'})
//     readonly Category: string;

//     @ApiProperty({example: 'true', description: 'Will answers be checked automatically.'})
//     @IsBoolean({message: 'AutoChecking must be boolean.'})
//     readonly AutoChecking: boolean;

//     @ApiProperty({example: 'true', description: 'Advanced checking according to dictionaries to consider synomimuths and typos.'})
//     @IsBoolean({message: 'AdvancedChecking must be boolean.'})
//     readonly AdvancedChecking: boolean;

//     @ApiProperty({example: '1000', description: 'Time for work completion (in ticks).'})
//     @IsNumber()
//     readonly Time: number;

//     @ApiProperty({example: '2000', description: 'Time adding to total after task completion (in ticks).'})
//     @IsNumber()
//     readonly AdditionalTime: number;

//     @ApiProperty({example: 'Public', description: 'Defines who can see and complete work.'})
//     @IsString({message: 'WorkPolicy nust be string.'})
//     readonly Privacy: string;
// }