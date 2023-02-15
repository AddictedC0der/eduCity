import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsArray } from "class-validator";


export class CreateClassDto {
    @ApiProperty({example: '7 A', description: 'Class name.'})
    @IsString({message: 'Name must be string.'})
    readonly Name: string;

    @ApiProperty({example: '23', description: 'ID of the school.'})
    @IsNumber()
    readonly School: number;

    @ApiProperty({example: '[23, 51, 1, 7]', description: 'Array of IDs of students.'})
    @IsArray({message: 'Students must be array.'})
    readonly ContainedStudents: number[];

    @ApiProperty({example: '[23, 51, 1, 7]', description: 'Array of IDs of teachers.'})
    @IsArray({message: 'Teachers must be array.'})
    readonly ContainedTeachers: number[];
}