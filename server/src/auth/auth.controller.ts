import { Controller, Post, Get, Req, UseGuards, Request, Response, Res, Body, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto, UserDto } from '../user/dto/user.dto';


@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Login user'})
    @ApiResponse({status: 201, description: 'User has been successfully logged in.'})
    // @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Request() request, @Response({passthrough: true}) response) {
        const data = await this.authService.login(request.body);
        response.cookie('refreshToken', data.tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return data;
    }

    @ApiOperation({summary: 'Register user'})
    @ApiResponse({status: 201, description: 'New user has been successfully registered.'})
    @UsePipes(ValidationPipe)
    @Post('/register')
    async register(@Body() userDto: CreateUserDto, @Response({passthrough: true}) response) {
        const data = await this.authService.register(userDto);
        response.cookie('refreshToken', data.tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return data;
    }
    
    @ApiOperation({summary: 'Log out user'})
    @ApiResponse({status: 201, description: 'User has been successfully logged out.'})
    @UsePipes(ValidationPipe)
    @Post('/logout')
    async logout(@Request() request, @Res({passthrough: true}) response) {
        const { refreshToken } = request.cookies;
        const data = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return data;
    }

    @ApiOperation({summary: 'Refresh users token.'})
    @ApiResponse({status: 200, description: 'Users token has been successfully refreshed.'})
    @UsePipes(ValidationPipe)
    @Get('/refresh')
    async refresh(@Request() request, @Res({passthrough: true}) response) {
        const { refreshToken } = request.cookies;
        const data = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', data.tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return data;
    }

    @ApiOperation({summary: 'Log out user'})
    @ApiResponse({status: 201, description: 'User has been successfully logged out.'})
    @UsePipes(ValidationPipe)
    @Post(`/changePassword/:id`)
    async changePassword(@Param('id') userId: number, @Body() passwords: {old: string, new: string}) {
        // const { refreshToken } = request.cookies;
        const data = await this.authService.changePassword(userId, passwords);
        // response.clearCookie('refreshToken');
        return data;
    }
    @ApiOperation({summary: 'Log out user'})
    @ApiResponse({status: 201, description: 'User has been successfully logged out.'})
    @UsePipes(ValidationPipe)
    @Post(`/changePassword/noValidation/:id`)
    async changePasswordWithoutValidation(@Param('id') userId: number, @Body() password: string) {
        // const { refreshToken } = request.cookies;
        const data = await this.authService.changePasswordWithoutValidation(userId, password);
        // response.clearCookie('refreshToken');
        return data;
    }
}