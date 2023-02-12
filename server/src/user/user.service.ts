import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { DeepPartial, DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { User, Student, Parent, Teacher } from './entities/user.entity';
import { Subject } from "./entities/subject.entity";
import { Stats } from "./entities/stats.entity";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { CreateStatsDto } from "./dto/stats.dto";
import { DataSource } from "typeorm";
import { Solution } from "../work/entities/solution.entity";


const defaultStats: CreateStatsDto = {
    //@ts-ignore
    Solutions: 0 as DeepPartial<Solution[]>,
}


@Injectable()
export class SubjectService {
    constructor(@InjectRepository(Subject) private SubjectRepo: Repository<Subject>) {}

    async createSubject(name: string) {
        const response = this.SubjectRepo.create({SubjectName: name});
        await this.SubjectRepo.save(response);
        return response;
    }

    async deleteSubjectById(id: number) {
        const response = await this.SubjectRepo.delete(id);
        return response;
    }

    async deleteSubjectByName(name: string) {
        const response = await this.SubjectRepo.delete({SubjectName: name})
        return response;
    }

    async updateSubject(id: number, newName: string) {
        const response = await this.SubjectRepo.update({id: id}, {SubjectName: newName});
        return response;
    }

    async getAllSubjects() {
        const response = await this.SubjectRepo.find();
        return response;
    }

    async getSubjectByName(name: string) {
        const response = await this.SubjectRepo.findOne({
            where: {SubjectName: name}
        })
        return response;
    }

    async getAllWorks(subjectName: string) {
        const response = await this.SubjectRepo.findOne({
            where: {SubjectName: subjectName},
            relations: ['Works']
        })
        return response.Works;
    }

    async getSubjectById(id: number) {
        const response = await this.SubjectRepo.findOne({
            where: {id: id}
        })
        return response;
    }

}


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private UserRepo: Repository<User>,
                @InjectRepository(Student) private StudentRepo: Repository<Student>,
                @InjectRepository(Parent) private ParentRepo: Repository<Parent>,
                @InjectRepository(Teacher) private TeacherRepo: Repository<Teacher>,
                @InjectRepository(Stats) private StatsRepo: Repository<Stats>,
                @InjectRepository(Subject) private SubjectRepo: Repository<Subject>) {}

    async createUser(userDto: CreateUserDto): Promise<any> {
        let response: any = {};
        switch(userDto.UserRole) {
            case 'Student': {
                response.user = this.StudentRepo.create({...userDto});
                await this.StudentRepo.save(response.user);
                break;
            }
            case 'Teacher': {
                response.user = this.TeacherRepo.create(userDto);
                await this.TeacherRepo.save(response.user);
                break;
            }
            case 'Parent': {
                response.user = this.ParentRepo.create(userDto);
                await this.ParentRepo.save(response.user);
                break;
            }
        }
        response.stats = this.StatsRepo.create(defaultStats);
        response.stats.MasterUser = response.user;
        await this.StatsRepo.save(response.stats);
        return response;
    }

    async updateUser(userId: number, userDto: UpdateUserDto): Promise<UpdateResult> {
        let response = await this.UserRepo.update(userId, userDto)
        return response;
    }

    async deleteUser(userId: number): Promise<DeleteResult> {
        const response = await this.UserRepo.delete(userId)
        return response;
    }

    async getUserById(userId: number): Promise<User> {
        const md = await this.UserRepo.metadata
        console.log(md)
        const response = await this.UserRepo.findOne({
            where: {id: userId},
            relations: ['UserStats']
        })
        return response;
    }

    async getUserByName(userName: string): Promise<User[]> {
        const response = await this.UserRepo.find({
            where: {UserLogin: userName},
            relations: ['UserStats']
        })
        return response;
    }

    async getUserByEmail(userEmail: string): Promise<User[]> {
        const response = await this.UserRepo.find({
            where: {UserEmail: userEmail}
        })
        return response;
    }

    async getAll(): Promise<User[]> {
        const response = await this.UserRepo.find()
        return response;
    }
}
