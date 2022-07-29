import { Body, Controller, Post, Get, Put, Delete, Param, Response, Req } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { CreatRoleDto } from "./dto/role.dto";


@ApiTags('User')
@Controller('/api/user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({summary: 'Creation of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully created.', type: User})
    @Post('/create')
    createUser(@Body() userDto: CreateUserDto) {
    }

    @ApiOperation({summary: 'Update of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully updated.', type: User})
    @Put(':id')
    updateUser(@Param('id') userId: number, @Body() userDto: UpdateUserDto) {
    }

    @ApiOperation({summary: 'Removal of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully deleted.', type: User})
    @Delete(':id')
    deleteUser(@Param('id') userId: number) {
    }

    @ApiOperation({summary: 'Get user by Id.'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getUser(@Param('id') userId: number) {
    }

    @ApiOperation({summary: 'Get all users.'})
    @ApiResponse({status: 200, type: User})
    @Get('/all')
    getAll() {
    }
}


@ApiTags('Role')
@Controller('/api/role')
export class RoleController {
    @ApiOperation({summary: 'Creation of role.'})
    @ApiResponse({status: 201, description: 'Role has been successfully created.', type: Role})
    @Post('/create')
    createRole(@Body() roleDto: CreatRoleDto) {

    }

    @ApiOperation({summary: 'Update of role.'})
    @ApiResponse({status: 201, description: 'Role has been successfully updated.', type: Role})
    @Put(':id')
    updateRole(@Param('id') roleId: number, @Body() roleDto: CreatRoleDto) {

    }

    @ApiOperation({summary: 'Removal of role.'})
    @ApiResponse({status: 201, description: 'Role has been successfully deleted.', type: Role})
    @Delete(':id')
    deleteRole(@Param('id') roleId: number) {

    }

    @ApiOperation({summary: 'Get role by Id.'})
    @ApiResponse({status: 200, type: Role})
    @Get('/getbyid/:id')
    getRoleById(@Param('id') roleId: number) {

    }

    @ApiOperation({summary: 'Get role by name.'})
    @ApiResponse({status: 200, type: Role})
    @Get('/getbyname/:name')
    getRoleByName(@Param('name') roleName: string) {

    }

    @ApiOperation({summary: 'Update of role.'})
    @ApiResponse({status: 200, type: Role})
    @Get('/all')
    getAll() {

    }

    @ApiOperation({summary: 'Add role to spacific user ny Id.'})
    @ApiResponse({status: 201, type: Role})
    @Post('/add/:id')
    addRole(@Param('id') userId: number, @Body() roleDto: CreatRoleDto) {

    }

}


@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
    @ApiOperation({summary: 'Login user.'})
    @ApiResponse({status: 201, description: 'User has been successfully logged in.', type: User})
    @Post('/login')
    login(@Body() userDto: UpdateUserDto, @Response({passthrough: true}) response) {
    }

    @ApiOperation({summary: 'Register user.'})
    @ApiResponse({status: 201, description: 'User has been successfully registered.', type: User})
    @Post('/register')
    register(@Body() userDto: UpdateUserDto, @Response({passthrough: true}) response) {
    }

    @ApiOperation({summary: 'Logout user.'})
    @ApiResponse({status: 201, description: 'User has been successfully logged out.', type: User})
    @Post('/logout')
    logout(@Req() request, @Response({passthrough: true}) response) {
    }

    @ApiOperation({summary: 'Logout user.'})
    @ApiResponse({status: 201, description: 'Users Cookies have been successfully refreshed.', type: User})
    @Post('/refresh')
    refresh(@Req() request, @Response({passthrough: true}) response) {
    }
}