import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { DeepPartial, DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { User, Student, Parent, Teacher } from './entities/user.entity';
import { Subject } from "./entities/subject.entity";
import { StudentStats } from "./entities/stats.entity";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { CreateTeacherStatsDto, CreateStudentStatsDto } from "./dto/stats.dto";
import { DataSource } from "typeorm";
import { Solution } from "../work/entities/solution.entity";
import { Resource } from "./entities/resource.entity";
import { CreateResouceDto } from "./dto/resource.dto";


const defaultStudentStats: CreateStudentStatsDto = {
    Solutions: []
}

const defaultTeacherStats: CreateTeacherStatsDto = {
    Works: []
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
                @InjectRepository(StudentStats) private StudentStatsRepo: Repository<StudentStats>,
                // @InjectRepository(TeacherStats) private TeacherStatsRepo: Repository<TeacherStats>,
                @InjectRepository(Subject) private SubjectRepo: Repository<Subject>) {}

    async createUser(userDto: CreateUserDto): Promise<any> {
        let response: any = {};
        switch(userDto.Role) {
            case 'Student': {
                response.user = this.StudentRepo.create({...userDto});
                await this.StudentRepo.save(response.user);
                
                response.stats = this.StudentStatsRepo.create(defaultStudentStats);
                response.stats.MasterUser = response.user;
                await this.StudentStatsRepo.save(response.stats);
                
                break;
            }
            case 'Teacher': {
                response.user = this.TeacherRepo.create(userDto);
                await this.TeacherRepo.save(response.user);
                
                // response.stats = this.TeacherStatsRepo.create(defaultTeacherStats);
                // response.stats.MasterUser = response.user;
                // await this.TeacherStatsRepo.save(response.stats);

                break;
            }
            case 'Parent': {
                response.user = this.ParentRepo.create(userDto);
                await this.ParentRepo.save(response.user);
                break;
            }
        }
        
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

    async getAllParents(): Promise<Parent[]> {
        const response = await this.ParentRepo.find();
        return response;
    }

    async getAllTeachers(): Promise<Teacher[]> {
        const response = await this.TeacherRepo.find();
        return response;
    }

    async getAllStudents(): Promise<Student[]> {
        const response = await this.StudentRepo.find();
        return response;
    }

    async getStudentById(userId: number) {
        const response = await this.StudentRepo.findOne({where: {id: userId}});
        return response;
    }

    async getTeacherById(userId: number) {
        const response = await this.TeacherRepo.findOne({where: {id: userId}});
        return response;
    }

    async getAll(): Promise<User[]> {
        const response = await this.UserRepo.find();
        return response;
    }
}


@Injectable()
export class ResourceService {
    constructor(@InjectRepository(Resource) private ResourceRepo: Repository<Resource>,
                @InjectRepository(Subject) private SubjectRepo: Repository<Subject>,
                @InjectRepository(User) private UserRepo: Repository<User>) {}
    
    async createResource(resourceDto: CreateResouceDto) {
        const targetUser = await this.UserRepo.findOne({where: {id: resourceDto.Author}});
        const targetSubject = await this.SubjectRepo.findOne({where: {id: resourceDto.Category}})
        const response = this.ResourceRepo.create({...resourceDto, Author: targetUser, Category: targetSubject});
        await this.ResourceRepo.save(response);
        return response;
    }

    async deleteResource(resourceId: number) {
        const response = await this.ResourceRepo.delete(resourceId);
        return response;
    }

    async getAll() {
        const repsonse = await this.ResourceRepo.find();
        return repsonse;
    }

}