import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class CreatRoleDto {
    @ApiProperty({example: 'Admin', description: 'Role name.'})
    @IsString()
    readonly name: string;

    @ApiProperty({example: 'Administrator has high systemal access level.', description: 'Role description.'})
    @IsString()
    readonly description: string;
}
