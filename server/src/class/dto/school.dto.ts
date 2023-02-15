import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsArray } from "class-validator";


export class CreateSchoolDto {
    @ApiProperty({example: 'Comprehensive school №2', description: 'School name.'})
    @IsString({message: 'Name must be string.'})
    readonly SchoolName: string;

    @ApiProperty({example: '<ADDRESS PATTERN>', description: 'Address of the school.'})
    @IsString({message: 'Address must be string.'})
    readonly Address: string;

    // @ApiProperty({example: '3.4', description: 'Rating of the school (float value).'})
    // @IsNumber()
    // readonly Rating: number;

    @ApiProperty({example: 'www.example.com', description: 'Link to the main website of the school.'})
    @IsString({message: 'Link must be string.'})
    readonly Link: string;

    @ApiProperty({example: '[2, 53, 12, 788]', description: 'Array of admins IDs of the school.'})
    @IsArray({message: 'Admins must be array.'})
    readonly Admins: number[];
}