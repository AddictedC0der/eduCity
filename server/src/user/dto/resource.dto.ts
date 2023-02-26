import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNumber, IsString, Length } from "class-validator";
import { Solution } from "../../work/entities/solution.entity";
import { DeepPartial } from "typeorm";
import { Work } from "../../work/entities/work.entity";


export class CreateResouceDto {
    @ApiProperty({example: 'www.stackoverflow.com', description: 'Link to the resource.'})
    @IsString()
    Link: string;

    @ApiProperty({example: 'Computer science', description: 'Category ID of the resource.'})
    @IsNumber()
    Category: number;

    @ApiProperty({example: '23', description: 'Resource adder ID.'})
    @IsNumber()
    Author: number;
}

// export class CreateTeacherStatsDto {
//     @ApiProperty({example: '5', description: 'Amount of created works.'})
//     @IsNumber()
//     Works: DeepPartial<Work[]>;
// }