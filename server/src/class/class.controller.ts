import { Controller, Post, Delete, Put, Get, Body, Param, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ChatService, ClassService, SchoolService } from "./class.service";
import { ChatMessageDto } from "./dto/chat_message.dto";
import { CreateClassDto } from "./dto/class.dto";
import { ChatMessage } from "./entities/chat_message.entity";
import { CreateSchoolDto } from "./dto/school.dto";


@ApiTags('Chat')
@Controller('/api/chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @ApiOperation({summary: 'Creates provided message'})
    @ApiResponse({status: 201})
    @Post('/create')
    async createMessage(@Body() messageDto: ChatMessageDto) {
        return this.ChatService.createMessage(messageDto);
    }

    @ApiOperation({summary: 'Deletes provided message'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async deleteMessage(@Param('id') messageId: number) {
        return this.ChatService.deleteMessage(messageId);
    }
    
    @ApiOperation({summary: 'Edits provided message'})
    @ApiResponse({status: 200})
    @Put('/:id')
    async editMessage(@Param('id') messageId: number, @Body() newValue: string) {
        return this.ChatService.editMessage(messageId, newValue);
    }

    @ApiOperation({summary: 'Gets all messages.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/all')
    async getAll() {
        const response = this.ChatService.getAll();
        return response
    }

    @ApiOperation({summary: 'Gets message by id'})
    @ApiResponse({status: 200})
    @Get('/:id')
    async getMessage(@Param('id') messageId: number) {
        const response = this.ChatService.getMessage(messageId);
        return response;
    }
}


@ApiTags('Class')
@Controller('/api/class')
export class ClassController {
    constructor(private ClassService: ClassService) {}

    @ApiOperation({summary: 'Creates new class.'})
    @ApiResponse({status: 200})
    @Post('/create')
    async createClass(@Body() classDto: CreateClassDto) {
        const response = this.ClassService.create(classDto);
        return response;
    }

    @ApiOperation({summary: 'Deletes existing class.'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async deleteClass(@Param('id') classId: number) {
        const response = this.ClassService.delete(classId);
        return response;
    }

    @ApiOperation({summary: 'Updates name value of class.'})
    @ApiResponse({status: 200})
    @Put('/rename/:id')
    async renameClass(@Param('id') classId: number, @Body() newName: string) {
        const response = this.ClassService.renameClass(classId, newName);
        return response;
    }

    @ApiOperation({summary: 'Updates school value of class.'})
    @ApiResponse({status: 200})
    @Put('/newschool/:id')
    async changeClassSchool(@Param('id') classId: number, @Body() newSchool: number) {
        const response = this.ClassService.changeClassSchool(classId, newSchool);
        return response;
    }

    @ApiOperation({summary: 'Adds new student to class ContainedStudents.'})
    @ApiResponse({status: 200})
    @Put('/newStudent/:id')
    async addStudentToClass(@Param('id') classId: number, @Body() newStudent: number) {
        const response = this.ClassService.addStudentToClass(classId, newStudent);
        return response;
    }

    @ApiOperation({summary: 'Adds new teacher to class ContainedTeachers.'})
    @ApiResponse({status: 200})
    @Put('/newTeacher/:id')
    async addTeacherToClass(@Param('id') classId: number, @Body() newTeacher: number) {
        const response = this.ClassService.addTeacherToClass(classId, newTeacher);
        return response;
    }
    
    @ApiOperation({summary: 'Gets class by ID.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/get/user/:id')
    async getUserClass(@Param('id') userId: number) {
        const response = this.ClassService.getUserClass(userId);
        return response
    }

    @ApiOperation({summary: 'Gets class by ID.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/get/id/:id')
    async getClassById(@Param('id') classId: number) {
        const response = this.ClassService.getClassById(classId);
        return response
    }

    @ApiOperation({summary: 'Gets class by name.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/get/name/:name')
    async getClassByName(@Param('name') className: string) {
        const response = this.ClassService.getClassbyName(className);
        return response
    }

    @ApiOperation({summary: 'Gets all messages.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/all')
    async getAll() {
        const response = this.ClassService.getAll();
        return response
    }
}


@ApiTags('School')
@Controller('/api/school')
export class SchoolController {
    constructor(private SchoolService: SchoolService) {}

    @ApiOperation({summary: 'Creates new school.'})
    @ApiResponse({status: 200})
    @Post('/create')
    async createSchool(@Body() schoolDto: CreateSchoolDto) {
        const response = this.SchoolService.create(schoolDto);
        return response;
    }

    @ApiOperation({summary: 'Creates new school.'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async deleteSchool(@Param('id') schoolId: number) {
        const response = this.SchoolService.delete(schoolId);
        return response;
    }

    @ApiOperation({summary: 'Creates new school.'})
    @ApiResponse({status: 200})
    @Put('/name/:id')
    async renameSchool(@Param('id') schoolId: number, @Body() newName: string) {
        const response = this.SchoolService.renameSchool(schoolId, newName);
        return response;
    }

    @ApiOperation({summary: 'Creates new school.'})
    @ApiResponse({status: 200})
    @Put('/address/:id')
    async changeSchoolAddress(@Param('id') schoolId: number, @Body() newAddress: string) {
        const response = this.SchoolService.renameSchool(schoolId, newAddress);
        return response;
    }


    @ApiOperation({summary: 'Gets school by name.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/name/:name')
    async getSchoolByName(@Param('name') schoolName: string) {
        const response = this.SchoolService.getSchoolByName(schoolName);
        return response
    }

    @ApiOperation({summary: 'Gets school by ID.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/id/:id')
    async getSchoolById(@Param('id') schoolId: number) {
        const response = this.SchoolService.getSchoolById(schoolId);
        return response
    }

    @ApiOperation({summary: 'Gets all schools.'})
    @ApiResponse({status: 200, type: ChatMessage})
    @Get('/all')
    async getAll() {
        const response = this.SchoolService.getAll();
        return response
    }
}