import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, Length } from "class-validator";


export class CreateStatsDto {
    @ApiProperty({example: '5', description: 'Amount of completed tasks.'})
    @IsNumber()
    completedWorks: number

    @ApiProperty({example: '5', description: 'Amount of lost tasks.'})
    @IsNumber()
    lostWorks: number
}