import { Body, Controller, Post, Get, Put, Delete, Param, Response, Req, Query } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { Parent, Student, Teacher, User } from "./entities/user.entity";
import { Subject } from "./entities/subject.entity";
import { UserService, SubjectService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";


@ApiTags('Subject')
@Controller('/api/subject')
export class SubjectController {
    constructor(private subjectService: SubjectService) {}

    @ApiOperation({summary: 'Creation of subject.'})
    @ApiResponse({status: 201, description: 'Subject has been successfully created.', type: Subject})
    @Post('/create')
    createSubject(@Body() name: string) {
        return this.subjectService.createSubject(name)
    }

    @ApiOperation({summary: 'Update of subject.'})
    @ApiResponse({status: 201, description: 'Subject has been successfully updated.', type: Subject})
    @Post(':id')
    updateSubject(@Param('id') subjectId: number, @Body() name: string) {
        return this.subjectService.updateSubject(subjectId, name)
    }

    @ApiOperation({summary: 'Removal of subject.'})
    @ApiResponse({status: 201, description: 'Subject has been successfully deleted.', type: Subject})
    @Delete('/delete/:id')
    deleteSubjectById(@Param('id') subjectId: number) {
        return this.subjectService.deleteSubjectById(subjectId);
    }

    @ApiOperation({summary: 'Removal of subject.'})
    @ApiResponse({status: 201, description: 'Subject has been successfully deleted.', type: Subject})
    @Delete('/delete/name')
    deleteSubjectByName(@Body() subjectName: string) {
        return this.subjectService.deleteSubjectByName(subjectName);
    }

    @ApiOperation({summary: 'Get subject by Id.'})
    @ApiResponse({status: 200, type: Subject})
    @Get('/get/id/:id')
    getSubjectById(@Param('id') SubjectId: number) {
        return this.subjectService.getSubjectById(SubjectId);
    }

    @ApiOperation({summary: 'Get subject by name.'})
    @ApiResponse({status: 200, type: User})
    @Get('/get/name/:value')
    getSubjectByName(@Param('value') SubjectName: string) {
        return this.subjectService.getSubjectByName(SubjectName);
    }

    @ApiOperation({summary: 'Get all subject works.'})
    @ApiResponse({status: 200})
    @Get('/get/works')
    getAllWorks(@Req() request, @Query() subjectName: {name: string}) {
        return this.subjectService.getAllWorks(subjectName.name);
    }

    @ApiOperation({summary: 'Get all subjects.'})
    @ApiResponse({status: 200, type: Subject})
    @Get('/all')
    getAll() {
        return this.subjectService.getAllSubjects();
    }
}


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

    @ApiOperation({summary: 'Get all parents.'})
    @ApiResponse({status: 200, type: Parent})
    @Get('/get/parents')
    getAllParents() {
        return this.userService.getAllParents();
    }

    @ApiOperation({summary: 'Get all teachers.'})
    @ApiResponse({status: 200, type: Teacher})
    @Get('/get/teachers')
    getAllTeachers() {
        return this.userService.getAllTeachers();
    }

    @ApiOperation({summary: 'Get all students.'})
    @ApiResponse({status: 200, type: Student})
    @Get('/get/students')
    getAllStudents() {
        return this.userService.getAllStudents();
    }

    @ApiOperation({summary: 'Get all users.'})
    @ApiResponse({status: 200, type: User})
    @Get('/all')
    getAll() {
        return this.userService.getAll();
    }
}
