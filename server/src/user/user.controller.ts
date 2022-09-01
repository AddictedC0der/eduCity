import { Body, Controller, Post, Get, Put, Delete, Param, Response, Req } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";


@ApiTags('User')
@Controller('/api/user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({summary: 'Creation of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully created.', type: User})
    @Post('/create')
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Update of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully updated.', type: User})
    @Put(':id')
    updateUser(@Param('id') userId: number, @Body() userDto: UpdateUserDto) {
        return this.userService.updateUser(userId, userDto);
    }

    @ApiOperation({summary: 'Removal of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully deleted.', type: User})
    @Delete(':id')
    deleteUser(@Param('id') userId: number) {
        return this.userService.deleteUser(userId);
    }

    @ApiOperation({summary: 'Get user by Id.'})
    @ApiResponse({status: 200, type: User})
    @Get('/get/id/:id')
    getUserById(@Param('id') userId: number) {
        return this.userService.getUserById(userId);
    }

    @ApiOperation({summary: 'Get user by name.'})
    @ApiResponse({status: 200, type: User})
    @Get('/get/name/:value')
    getUserByName(@Param('value') userName: string) {
        return this.userService.getUserByName(userName);
    }

    @ApiOperation({summary: 'Get user by email.'})
    @ApiResponse({status: 200, type: User})
    @Get('/get/email/:value')
    getUserByEmail(@Param('value') userEmail: string) {
        return this.userService.getUserByEmail(userEmail);
    }

    @ApiOperation({summary: 'Get all users.'})
    @ApiResponse({status: 200, type: User})
    @Get('/all')
    getAll() {
        return this.userService.getAll();
    }
}
