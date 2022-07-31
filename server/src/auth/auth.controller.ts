import { Controller, Post, Get, Req, UseGuards, Request, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto, UserDto } from 'src/user/dto/user.dto';


@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Login user'})
    @ApiResponse({status: 201, description: 'User has been successfully logged in.', type: User})
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Request() request) {
        return this.authService.login(request.user);
    }

    @ApiOperation({summary: 'Register user'})
    @ApiResponse({status: 201, description: 'New user has been successfully registered.', type: User})
    @UsePipes(ValidationPipe)
    @Post('/register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }

    @ApiOperation({summary: 'Log out user'})
    @ApiResponse({status: 201, description: 'User has been successfully logged out.'})
    @UsePipes(ValidationPipe)
    @Post('/logout')
    logout(@Request() request) {
        const token = request.refreshToken
        return this.authService.logout(token);
    }

    @ApiOperation({summary: 'Refresh users token'})
    @ApiResponse({status: 200, description: 'Users token has been successfully refreshed.'})
    @UsePipes(ValidationPipe)
    @Get('/refresh')
    refresh(@Request() request) {
        const token = request.refreshToken
        return this.authService.refresh(token);
    }
}