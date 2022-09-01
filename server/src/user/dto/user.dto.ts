import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, IsArray } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'NoName', description: 'Login of user.'})
    @IsString({message: 'Login must be string.'})
    @Length(3, 40, {message: 'Login length must be at least 3 symbols and no more than 40 symbols.'})
    readonly UserLogin: string;

    @ApiProperty({example: 'qwerty123', description: 'Password of user.'})
    @IsString({message: 'Password must be string.'})
    @Length(3, 40, {message: 'Password length must be at least 3 symbols and no more than 40 symbols.'})
    readonly UserPassword: string;

    @ApiProperty({example: 'example1@gmail.com', description: 'Email of user.'})
    @IsEmail({message: 'Email must be email.'})
    readonly UserEmail: string;

    @ApiProperty({example: 'Teacher', description: 'Role of user.'})
    @IsString({message: 'Role must be string.'})
    readonly UserRole: string;
}

export class UpdateUserDto {
    @ApiProperty({example: 'qwerty123', description: 'New password of user.'})
    @IsString()
    @Length(3, 40, {message: 'Password length must be at least 3 symbols and no more than 40 symbols.'})
    readonly UserPassword: string;

    @ApiProperty({example: 'example1@gmail.com', description: 'New email of user.'})
    @IsEmail()
    readonly UserEmail: string;
}

export class UserDto {
    @ApiProperty({example: 'qwerty123', description: 'Password of user.'})
    @IsString()
    @Length(3, 40, {message: 'Password length must be at least 3 symbols and no more than 40 symbols.'})
    readonly UserPassword: string;

    @ApiProperty({example: 'NoName', description: 'Login of user.'})
    @IsString()
    readonly UserLogin: string;
}