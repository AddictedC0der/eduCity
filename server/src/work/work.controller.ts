import { Body, Controller, Post, Get, Put, Delete, Param, Response, Req } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Work } from "./entities/work.entity";
import { Task } from "./entities/task.entity";
import { WorkService, TaskService } from "./work.service";
import { CreateWorkDto, UpdateWorkDto } from "./dto/work.dto";


@ApiTags('User')
@Controller('/api/work')
export class WorkController {
    constructor(private workService: WorkService,
                private taskServidce: TaskService) {}

    @ApiOperation({summary: 'Creation of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully created.', type: Work})
    @Post('/create')
    createWork(@Body() workDto: CreateWorkDto) {
        return this.workService.createWork(workDto)
    }

    @ApiOperation({summary: 'Update of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully updated.', type: Work})
    @Put(':id')
    updateWork(@Param('id') workId: number, @Body() workDto: UpdateWorkDto) {
        return this.workService.updateWork(workId, workDto);
    }

    @ApiOperation({summary: 'Removal of user.'})
    @ApiResponse({status: 201, description: 'User has been successfully deleted.', type: Work})
    @Delete(':id')
    deleteWork(@Param('id') workId: number) {
        return this.workService.deleteWork(workId);
    }

    @ApiOperation({summary: 'Get user by Id.'})
    @ApiResponse({status: 200, type: Work})
    @Get('/get/id/:id')
    getWorkById(@Param('id') workId: number) {
        return this.workService.getWorkById(workId);
    }

    @ApiOperation({summary: 'Get user by name.'})
    @ApiResponse({status: 200, type: Work})
    @Get('/get/name/:value')
    getWorkByName(@Param('value') workName: string) {
        return this.workService.getWorkByName(workName);
    }

    @ApiOperation({summary: 'Get all users.'})
    @ApiResponse({status: 200, type: Work})
    @Get('/all')
    getAll() {
        return this.workService.getAll();
    }
}
