import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArrayContains, DeleteResult, Repository, UpdateResult } from "typeorm";
import { ChatMessage } from "./entities/chat_message.entity";
import { ChatMessageDto } from "./dto/chat_message.dto";
import { User } from "../user/entities/user.entity";
import { Class } from "./entities/class.entity";
import { CreateClassDto } from "./dto/class.dto";
import { School } from "./entities/school.entity";
import { UserService } from "../user/user.service";
import { CreateSchoolDto } from "./dto/school.dto";


@Injectable()
export class ChatService {
    constructor(@InjectRepository(ChatMessage) private ChatMessageRepo: Repository<ChatMessage>,
                @InjectRepository(User) private UserRepo: Repository<User>) {}

    async createMessage(messageDto: ChatMessageDto): Promise<ChatMessage> {
        const targetUser = await this.UserRepo.findOne({where: {id: messageDto.author}});
        const targetMessage = await this.ChatMessageRepo.findOne({where: {id: messageDto.replyTo}})
        const response = this.ChatMessageRepo.create({...messageDto, author: targetUser, replyTo: targetMessage});
        this.ChatMessageRepo.save(response);
        return response;
    }

    async deleteMessage(messageId: number): Promise<DeleteResult> {
        const response = await this.ChatMessageRepo.delete(messageId);
        return response;
    }

    async editMessage(messageId: number, newValue: string): Promise<UpdateResult> {
        const response = await this.ChatMessageRepo.update(messageId, {text: newValue, isEdited: true})
        return response;
    }

    async getMessage(messageId): Promise<ChatMessage> {
        const response = await this.ChatMessageRepo.findOne({where: {id: messageId}});
        return response;
    }

    async getAll(): Promise<ChatMessage[]> {
        const response = await this.ChatMessageRepo.find({relations: {replyTo: true, author: true}});
        return response;
    }
}


export class SchoolService {
    constructor(@InjectRepository(School) private SchoolRepo: Repository<School>,
                @InjectRepository(User) private UserRepo: Repository<User>) {}
    
    async create(schoolDto: CreateSchoolDto) {
        const targetAdmins: User[] = [];
        for (let i = 0; i < schoolDto.Admins.length; i++) {
            const admin = await this.UserRepo.findOne({where: {id: schoolDto.Admins[i]}});
            targetAdmins.push(admin);
        }
        const response = this.SchoolRepo.create({...schoolDto, Admins: targetAdmins, Rating: 0});
        await this.SchoolRepo.save(response);
        return response;
    }

    async delete(schoolId: number) {
        const response = await this.SchoolRepo.delete(schoolId);
        return response;
    }

    async changeSchoolAddress(schoolId: number, newAddress: string) {
        const response = await this.SchoolRepo.update(schoolId, {Address: newAddress});
        return response;
    }

    async renameSchool(schoolId: number, newName: string) {
        const response = await this.SchoolRepo.update(schoolId, {SchoolName: newName});
        return response;
    }

    async getSchoolByName(schoolName: string) {
        const response = await this.SchoolRepo.findOne({where: {SchoolName: schoolName}, relations: ['Admins']});
        return response;
    }

    async getSchoolById(schoolId: number) {
        const response = await this.SchoolRepo.findOne({where: {id: schoolId}, relations: ['Admins']});
        return response;
    }

    async getAll() {
        const response = await this.SchoolRepo.find({relations: ['Admins']});
        return response;
    }
}


export class ClassService {
    constructor(@InjectRepository(Class) private ClassRepo: Repository<Class>,
                private SchoolService: SchoolService,
                private UserService: UserService) {}

    async create(classDto: CreateClassDto): Promise<Class> {
        const targetSchool = await this.SchoolService.getSchoolById(classDto.School);
        const targetStudents: User[] = [];
        const targetTeachers: User[] = [];
        for (let i = 0; i < classDto.ContainedStudents.length; i++) {
            targetStudents.push(await this.UserService.getUserById(classDto.ContainedStudents[i]));
        }
        for (let i = 0; i < classDto.ContainedStudents.length; i++) {
            targetTeachers.push(await this.UserService.getUserById(classDto.ContainedTeachers[i]));
        }
        const response = this.ClassRepo.create({...classDto, School: targetSchool, ContainedStudents: targetStudents, ContainedTeachers: targetTeachers});
        await this.ClassRepo.save(response);
        return response;
    }

    async delete(classId: number) {
        const response = await this.ClassRepo.delete(classId);
        return response;
    }

    async renameClass(classId: number, newName: string) {
        const response = await this.ClassRepo.update(classId, {Name: newName});
        return response;
    }
    
    async changeClassSchool(classId: number, schoolId: number) {
        const targetSchool = await this.SchoolService.getSchoolById(schoolId);
        const response = await this.ClassRepo.update(classId, {School: targetSchool});
        return response;
    }

    async addStudentToClass(classId: number, studentId: number) {
        const targetUser = await this.UserService.getUserById(studentId);
        const targetClass = await this.getClassById(classId);
        const response = await this.ClassRepo.update(classId, {...targetClass, ContainedStudents: targetClass.ContainedStudents.concat([targetUser])});
        return response;
    }

    async addTeacherToClass(classId: number, teacherId: number) {
        const targetUser = await this.UserService.getUserById(teacherId);
        const targetClass = await this.getClassById(classId);
        const response = await this.ClassRepo.update(classId, {...targetClass, ContainedStudents: targetClass.ContainedStudents.concat([targetUser])});
        return response;
    }

    async getUserClass(userId: number) {
        const targetUser = await this.UserService.getUserById(userId);
        const response = await this.ClassRepo.find({where: {ContainedStudents: ArrayContains([targetUser])}, relations: ['ContainedStudents', 'ContainedTeachers']});
        return response;
    }

    async getClassById(classId: number) {
        const response = await this.ClassRepo.findOne({where: {id: classId}});
        return response;
    }

    async getClassbyName(className: string) {
        const response = await this.ClassRepo.findOne({where: {Name: className}})
        return response;
    }

    async getAll() {
        const response = await this.ClassRepo.find();
        return response;
    }
}