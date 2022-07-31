import { Body, Controller, Post, Get, Put, Delete, Param, Response, Req } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { RoleService, UserService } from "./user.service";
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

    @ApiOperation({summary: 'Get all users.'})
    @ApiResponse({status: 200, type: User})
    @Get('/all')
    getAll() {
        return this.userService.getAll();
    }

    @ApiOperation({summary: 'Add role to spacific user by Id.'})
    @ApiResponse({status: 201, type: Role})
    @Post('/add/:id')
    addRole(@Param('id') userId: number, @Body() role: string) {
        return this.userService.addRole(userId, role);
    }
}


@ApiTags('Role')
@Controller('/api/role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @ApiOperation({summary: 'Creation of role.'})
    @ApiResponse({status: 201, description: 'Role has been successfully created.', type: Role})
    @Post('/create')
    createRole(@Body() roleDto: CreatRoleDto) {
        return this.roleService.createRole(roleDto);
    }

    @ApiOperation({summary: 'Update of role.'})
    @ApiResponse({status: 201, description: 'Role has been successfully updated.', type: Role})
    @Put(':id')
    updateRole(@Param('id') roleId: number, @Body() roleDto: CreatRoleDto) {
        return this.roleService.updateRole(roleId, roleDto);
    }

    @ApiOperation({summary: 'Removal of role.'})
    @ApiResponse({status: 201, description: 'Role has been successfully deleted.', type: Role})
    @Delete(':id')
    deleteRole(@Param('id') roleId: number) {
        return this.roleService.deleteRole(roleId);
    }   

    @ApiOperation({summary: 'Get role by Id.'})
    @ApiResponse({status: 200, type: Role})
    @Get('/getbyid/:id')
    getRoleById(@Param('id') roleId: number) {
        return this.roleService.getRoleById(roleId);
    }

    @ApiOperation({summary: 'Get role by name.'})
    @ApiResponse({status: 200, type: Role})
    @Get('/getbyname/:name')
    getRoleByName(@Param('name') roleName: string) {
        return this.roleService.getRoleByName(roleName);
    }

    @ApiOperation({summary: 'Update of role.'})
    @ApiResponse({status: 200, type: Role})
    @Get('/all')
    getAll() {
        return this.roleService.getAll();
    }
}
