import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { Work } from './entities/work.entity';
import { Task } from './entities/task.entity';
import { CreateWorkDto, UpdateWorkDto } from "./dto/work.dto";
import { CreateTaskDto } from "./dto/task.dto";
import { DataSource } from "typeorm";
import { Subject } from "../user/entities/subject.entity";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private TaskRepo: Repository<Task>) {}

    async createTask(taskDto: CreateTaskDto) {
        const response = this.TaskRepo.create({...taskDto});
        await this.TaskRepo.save(response);
        return response;
    }
}

@Injectable()
export class WorkService {
    constructor(@InjectRepository(Work) private WorkRepo: Repository<Work>,
                @InjectRepository(Subject) private SubjectRepo: Repository<Subject>,
                @InjectRepository(User) private UserRepo: Repository<User>,
                private TaskService: TaskService) {}

    async createWork(workDto: CreateWorkDto): Promise<Work> {
        const createTasks = async (tasks: any[], parentId: number) => {
            const parentWork = await this.WorkRepo.findOne({
                where: {id: parentId}
            });
            for (let i = 0; i < tasks.length; i++) {
                const formed = {...tasks[i], ParentWork: parentWork}
                await this.TaskService.createTask(formed);
            }
        }
        
        const sbj = await this.SubjectRepo.findOne({
            where: {SubjectName: workDto.Category}
        });

        const user = await this.UserRepo.findOne({
            where: {id: workDto.Author}
        })

        const formed = {...workDto, Category: sbj, Author: user}
        delete formed.Tasks;

        const response = this.WorkRepo.create({...formed});
        await this.WorkRepo.save(response);
        await createTasks(workDto.Tasks, response.id);
        return response;
    }

    async deleteWork(workId: number): Promise<DeleteResult> {
        const response = await this.SubjectRepo.delete(workId)
        return response;
    }

    async updateWork(workId: number, workDto: UpdateWorkDto): Promise<UpdateResult> {
        const sbj = await this.SubjectRepo.findOne({
            where: {SubjectName: workDto.Category}
        })
        const response = await this.WorkRepo.update(workId, {...workDto, Category: sbj})
        return response;
    }

    async getWorkById(id: number): Promise<Work> {
        const response = await this.WorkRepo.findOne({
            where: {id: id}
        })
        return response;
    }

    async getWorkByName(name: string): Promise<Work> {
        const response = await this.WorkRepo.findOne({
            where: {Name: name}
        });
        return response;
    }

    async getAll(): Promise<Work[]> {
        const response = await this.WorkRepo.find();
        return response;
    }
}