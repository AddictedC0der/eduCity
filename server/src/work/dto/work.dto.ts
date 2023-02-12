import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, IsArray, IsNumber, IsBoolean } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { DeepPartial } from "typeorm";


export class CreateWorkDto {
    @ApiProperty({example: 'Number division.', description: 'Name of the work.'})
    @IsString({message: 'WorkName must be string.'})
    @Length(3, 40, {message: 'Name length must be at least 3 symbols and no more than 40 symbols.'})
    readonly Name: string;

    @ApiProperty({example: '1', description: 'ID of author of the work.'})
    @IsNumber()
    readonly Author: number;

    @ApiProperty({example: 'Math', description: 'Category of the work.'})
    @IsString({message: 'Category must be string.'})
    readonly Category: string;

    @ApiProperty({example: '7', description: 'Indicates minimum amount knowledge required for completion of the work.'})
    @IsNumber()
    readonly Class: number;

    @ApiProperty({example: '3', description: 'Indicates difficulty of the work in range of 1-10.'})
    @IsNumber()
    readonly Difficulty: number;

    @ApiProperty({example: 'true', description: 'Will answers be checked automatically.'})
    @IsBoolean({message: 'AutoChecking must be boolean.'})
    readonly AutoChecking: boolean;

    @ApiProperty({example: 'true', description: 'Advanced checking according to dictionaries to consider synomimuths and typos.'})
    @IsBoolean({message: 'AdvancedChecking must be boolean.'})
    readonly AdvancedChecking: boolean;

    @ApiProperty({example: '1000', description: 'Time for work completion (in ticks).'})
    @IsNumber()
    readonly Time: number;

    @ApiProperty({example: '2000', description: 'Time adding to total after task completion (in ticks).'})
    @IsNumber()
    readonly AdditionalTime: number;

    @ApiProperty({example: 'Public', description: 'Defines who can see and complete work.'})
    @IsString({message: 'WorkPolicy must be string.'})
    readonly Privacy: string;

    @ApiProperty({example: 'Public', description: 'Defines who can see and complete work.'})
    @IsArray({message: 'WorkPolicy must be array.'})
    readonly Tasks: any[];
}


export class UpdateWorkDto {
    @ApiProperty({example: 'Number division.', description: 'Name of the work.'})
    @IsString({message: 'WorkName must be string.'})
    @Length(3, 40, {message: 'Name length must be at least 3 symbols and no more than 40 symbols.'})
    readonly Name: string;

    @ApiProperty({example: 'Math', description: 'Category of the work.'})
    @IsString({message: 'Category must be string.'})
    readonly Category: string;

    @ApiProperty({example: 'true', description: 'Will answers be checked automatically.'})
    @IsBoolean({message: 'AutoChecking must be boolean.'})
    readonly AutoChecking: boolean;

    @ApiProperty({example: 'true', description: 'Advanced checking according to dictionaries to consider synomimuths and typos.'})
    @IsBoolean({message: 'AdvancedChecking must be boolean.'})
    readonly AdvancedChecking: boolean;

    @ApiProperty({example: '1000', description: 'Time for work completion (in ticks).'})
    @IsNumber()
    readonly Time: number;

    @ApiProperty({example: '2000', description: 'Time adding to total after task completion (in ticks).'})
    @IsNumber()
    readonly AdditionalTime: number;

    @ApiProperty({example: 'Public', description: 'Defines who can see and complete work.'})
    @IsString({message: 'WorkPolicy nust be string.'})
    readonly Privacy: string;
}