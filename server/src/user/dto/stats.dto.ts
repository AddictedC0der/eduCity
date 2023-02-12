import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNumber, IsString, Length } from "class-validator";
import { Solution } from "../../work/entities/solution.entity";
import { DeepPartial } from "typeorm";


export class CreateStatsDto {
    @ApiProperty({example: '5', description: 'Amount of completed tasks.'})
    @IsNumber()
    Solutions: DeepPartial<Solution[]>;
}