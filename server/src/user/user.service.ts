import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from './entities/user.entity';
import { Role } from "./entities/role.entity";
import { Subject } from "./entities/subject.entity";
import { Stats } from "./entities/stats.entity";
import { CreateUserDto } from "./dto/user.dto";
import { CreateStatsDto } from "./dto/stats.dto";
import { DataSource } from "typeorm";

const defaultStats: CreateStatsDto = {
    completedWorks: 0,
    lostWorks: 0
}


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private UserRepository: Repository<User>,
                @InjectRepository(Stats) private StatsRepository: Repository<Stats>,
                @InjectRepository(Role) private RoleRepository: Repository<Stats>) {}

    async createUser(userDto: CreateUserDto): Promise<User> {
        userDto.role = await (new DataSource()).getRepository('role').
        const user = this.UserRepository.create(userDto)
        const stats = this.StatsRepository.create(defaultStats)
        // user.stats = stats.id
        return user
    }
}