import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { DeepPartial, DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { Work } from './entities/work.entity';
import { Task } from './entities/task.entity';
import { CreateWorkDto, UpdateWorkDto } from "./dto/work.dto";
import { CreateTaskDto } from "./dto/task.dto";
import { DataSource } from "typeorm";
import { Subject } from "../user/entities/subject.entity";
import { User } from "../user/entities/user.entity";
import { Solution } from "./entities/solution.entity";
import { CreateSolutionDto } from "./dto/solution.dto";
import { Stats } from "../user/entities/stats.entity";


@Injectable()
export class SolutionService {
    constructor(@InjectRepository(Solution) private SolutionRepo: Repository<Solution>,
                @InjectRepository(Stats) private StatsRepo: Repository<Stats>,
                @InjectRepository(User) private UserRepo: Repository<User>,
                @InjectRepository(Work) private WorkRepo: Repository<Work>) {}

    async createSolution(solutionDto: CreateSolutionDto) {
        const targetUser = await this.UserRepo.findOne({where: {id: solutionDto.Author}});
        const targetStats = await this.StatsRepo.findOne({where: {MasterUser: targetUser}});
        const targetWork = await this.WorkRepo.findOne({where: {id: solutionDto.Work}});
        const response = this.SolutionRepo.create({...solutionDto, Author: targetStats, Work: targetWork});
        await this.SolutionRepo.save(response);
        return response;
    }

    async getUserSolutions(userId: number) {
        const targetUser = await this.UserRepo.findOne({where: {id: userId}});
        const targetStats = await this.StatsRepo.findOne({where: {MasterUser: targetUser}});
        const response = await this.SolutionRepo.find({where: {Author: targetStats}});
        return response;
    }

    async getWorkSolutions(workId: number) {
        const targetWork = await this.WorkRepo.findOne({where: {id: workId}});
        const response = await this.SolutionRepo.find({where: {Work: targetWork}});
        return response;
    }
}


@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private TaskRepo: Repository<Task>,
    @InjectRepository(Work) private WorkRepo: Repository<Work>) {}

    async createTask(taskDto: CreateTaskDto) {
        const parentWork = await this.WorkRepo.findOne({
            where: {id: taskDto.ParentWork}
        });
        const response = this.TaskRepo.create({...taskDto, ParentWork: parentWork});
        await this.TaskRepo.save(response);
        return response;
    }

    async findTaskById(taskId: number) {
        const response = await this.TaskRepo.findOne({
            where: {id: taskId}
        });
        return response;
    }

    async findAllWorksTasks(parentWork: DeepPartial<Work>) {
        const response = await this.TaskRepo.find({
            where: {ParentWork: parentWork}
        });
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
        const createTasks = async (tasks: any[], parentInstance: Partial<Work>) => {
            for (let i = 0; i < tasks.length; i++) {
                await this.TaskService.createTask({...tasks[i], ParentWork: parentInstance.id});
            }
        }
        
        const sbj = await this.SubjectRepo.findOne({
            where: {SubjectName: workDto.Category}
        });

        const user = await this.UserRepo.findOne({
            where: {id: workDto.Author}
        });

        const formed = {...workDto, Category: sbj, Author: user}
        delete formed.Tasks;

        const response = this.WorkRepo.create({...formed});
        await this.WorkRepo.save(response);
        await createTasks(workDto.Tasks, response);
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

    async getWorkById(workId: number): Promise<{work: DeepPartial<Work>, tasks: DeepPartial<Task>[]}> {
        let response: {work: any, tasks: any} = {work: {}, tasks: {}};
        response.work = await this.WorkRepo.findOne({
            where: {id: workId},
            relations: ['Category']
        });
        response.tasks = await this.TaskService.findAllWorksTasks(response.work);
        return response;
    }

    async getWorkByName(name: string): Promise<Work> {
        const response = await this.WorkRepo.findOne({
            where: {Name: name},
            relations: ['Category']
        });
        return response;
    }

    async getAll(): Promise<Work[]> {
        const response = await this.WorkRepo.find({relations: ['Category']});
        return response;
    }
}