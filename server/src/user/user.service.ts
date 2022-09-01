import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { User, Student, Parent, Teacher } from './entities/user.entity';
import { Subject } from "./entities/subject.entity";
import { Stats } from "./entities/stats.entity";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { CreateStatsDto } from "./dto/stats.dto";
import { DataSource } from "typeorm";


const defaultStats: CreateStatsDto = {
    CompletedWorks: 0,
    LostWorks: 0
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
        const response = await this.UserRepo.findOne({
            where: {id: userId},
        })
        return response;
    }

    async getUserByName(userName: string): Promise<User[]> {
        const response = await this.UserRepo.find({
            where: {UserLogin: userName}
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
