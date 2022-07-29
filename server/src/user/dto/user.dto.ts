import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'NoName', description: 'Login of user.'})
    @IsString()
    @Length(3, 40, {message: 'Login length must be at least 3 symbols and no more than 40 symbols.'})
    readonly login: string;

    @ApiProperty({example: 'qwerty123', description: 'Password of user.'})
    @IsString()
    @Length(3, 40, {message: 'Password length must be at least 3 symbols and no more than 40 symbols.'})
    readonly password: string;

    @ApiProperty({example: 'example1@gmail.com', description: 'Email of user.'})
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: 'Teacher', description: 'Role of user.'})
    @IsString()
    readonly role: string;
}

export class UpdateUserDto {
    @ApiProperty({example: 'qwerty123', description: 'New password of user.'})
    @IsString()
    @Length(3, 40, {message: 'Password length must be at least 3 symbols and no more than 40 symbols.'})
    readonly password: string;

    @ApiProperty({example: 'example1@gmail.com', description: 'New email of user.'})
    @IsEmail()
    readonly email: string;
}