import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNumber, IsString, Length } from "class-validator";
import { Solution } from "../../work/entities/solution.entity";
import { DeepPartial } from "typeorm";
import { Work } from "../../work/entities/work.entity";


export class CreateStudentStatsDto {
    @ApiProperty({example: '5', description: 'Amount of completed tasks.'})
    @IsNumber()
    Solutions: DeepPartial<Solution[]>;
}

export class CreateTeacherStatsDto {
    @ApiProperty({example: '5', description: 'Amount of created works.'})
    @IsNumber()
    Works: DeepPartial<Work[]>;
}