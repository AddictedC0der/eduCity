import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { User } from './entities/user.entity';
import { Role } from "./entities/role.entity";
import { Subject } from "./entities/subject.entity";
import { Stats } from "./entities/stats.entity";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { CreateStatsDto } from "./dto/stats.dto";
import { DataSource } from "typeorm";
import { CreatRoleDto } from "./dto/role.dto";

const defaultStats: CreateStatsDto = {
    completedWorks: 0,
    lostWorks: 0
}


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private UserRepository: Repository<User>,
                @InjectRepository(Stats) private StatsRepository: Repository<Stats>,
                private dataSource: DataSource) {}

    async createUser(userDto: CreateUserDto): Promise<any> {
        let response: any;
        response.user = await this.dataSource.createQueryBuilder()
                                    .insert()
                                    .into(User)
                                    .values([{...userDto, role: null}])
        response.stats = await this.dataSource.createQueryBuilder()
                                        .insert()
                                        .into(Stats)
                                        .values([defaultStats])
        await this.dataSource.createQueryBuilder()
                            .relation(User, 'stats').of(response.user.id).set(response.stats.id)
        
        this.addRole(response.user.id, userDto.role);
        return response;
    }

    async updateUser(userId: number, userDto: UpdateUserDto): Promise<UpdateResult> {
        let response = await this.dataSource.createQueryBuilder()
                                    .update(User)
                                    .set(userDto)
                                    .where('id = :id', {id: userId})
                                    .execute()
        return response;
    }

    async deleteUser(userId: number): Promise<any> {
        let response: any;
        const stats = await this.dataSource.createQueryBuilder()
                                        .relation(User, 'stats')
                                        .of(userId)
                                        .loadMany()
        response.stats = await this.dataSource.createQueryBuilder()
                                            .relation(User, 'stats')
                                            .of(userId)
                                            .remove(stats)
        response.user = await this.dataSource.createQueryBuilder()
                                            .delete()
                                            .from(User)
                                            .where('id = :id', {id: userId})
                                            .execute()
        return response;
    }

    async getUserById(userId: number): Promise<User> {
        const response = await this.dataSource.createQueryBuilder()
                                            .select('user')
                                            .from(User, 'user')
                                            .where('user.id = :id', {id: userId})
                                            .execute()
        return response;
    }

    async getUserByName(userName: string): Promise<User> {
        const response = await this.dataSource.createQueryBuilder()
                                            .select('user')
                                            .from(User, 'user')
                                            .where('user.name = :name', {name: userName})
                                            .execute()
        return response;
    }

    async getUserByEmail(userEmail: string): Promise<User> {
        const response = await this.dataSource.createQueryBuilder()
                                            .select('user')
                                            .from(User, 'user')
                                            .where('user.email = :email', {email: userEmail})
                                            .execute()
        return response;
    }

    async getAll(): Promise<User[]> {
        const response = await this.dataSource.getRepository(User)
                                            .createQueryBuilder('user')
                                            .getMany()
        return response;
    }

    /**
     * Sets existing role to spacific user.
     * @param userId Id of target user.
     * @param roleMetadata Metadata of target role (Id or name).
     */
    async addRole(userId: number, roleMetadata: string | number) {
        let role: Role;
        if (typeof roleMetadata === 'string') {
            role = await this.dataSource.getRepository(Role)
                                        .createQueryBuilder('role')
                                        .where('role.name = :name', {name: roleMetadata})
                                        .getOne()
        } else {
            role = await this.dataSource.getRepository(Role)
                                        .createQueryBuilder('role')
                                        .where('role.id = :id', {id: roleMetadata})
                                        .getOne()
        }
        
        await this.dataSource.createQueryBuilder().relation(User, 'role').of(userId).add(role.id)
    }
}

@Injectable()
export class RoleService {
    constructor(private dataSource: DataSource) {}
    
    
    async createRole(roleDto: CreatRoleDto): Promise<InsertResult> {
        const response = await this.dataSource.createQueryBuilder()
                                            .insert()
                                            .into(Role)
                                            .values([roleDto]).execute()
        return response;
    }

    async updateRole(roleId: number, roleDto: CreatRoleDto): Promise<UpdateResult> {
        const response = await this.dataSource.createQueryBuilder()
                                            .update(Role)
                                            .set(roleDto)
                                            .where('id = :id', {id: roleId})
                                            .execute()
        return response;
    }

    async deleteRole(roleId: number): Promise<DeleteResult> {
        const response = await this.dataSource.createQueryBuilder()
                                            .delete()
                                            .from(Role)
                                            .where('id = :id', {id: roleId})
                                            .execute()
        return response;
    }

    async getRoleById(roleId: number): Promise<Role> {
        const response = await this.dataSource.createQueryBuilder()
                                            .select('role')
                                            .from(Role, 'role')
                                            .where('role.id = :id', {id: roleId})
                                            .getOne()
        return response;
    }

    async getRoleByName(roleName: string): Promise<Role> {
        const response = await this.dataSource.createQueryBuilder()
                                            .select('role')
                                            .from(Role, 'role')
                                            .where('role.name = :name', {name: roleName})
                                            .getOne()
        return response;
    }

    async getAll(): Promise<Role[]> {
        const response = await this.dataSource.getRepository(Role)
                                            .createQueryBuilder('role')
                                            .getMany()
        return response;
    }
}


