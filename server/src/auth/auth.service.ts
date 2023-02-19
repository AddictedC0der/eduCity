import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";
import { User } from "../user/entities/user.entity";
import { UserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService,
                @InjectRepository(Token) private TokenRepo: Repository<Token>,
                @InjectRepository(User) private UserRepo: Repository<User>) {}
    
    async createToken(user: User): Promise<any> {
        const payload = {login: user.UserLogin, sub: user.id}
        const accessToken = this.jwtService.sign(payload, {expiresIn: '30m'})
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async deleteToken(token): Promise<DeleteResult> {
        const response = await this.TokenRepo.delete({refreshToken: token})
        return response;
    }

    async setToken(userId: number, token: string) {
        const data = await this.UserRepo.findOne({where: {id: userId}, relations: {Token: true}});
        console.log(data);
        if (data.Token) {
            const response = await this.TokenRepo.update({id: data.Token.id}, {...data.Token, refreshToken: token});
            return response;
        }
        const response = this.TokenRepo.create({refreshToken: token, UserId: data});
        await this.TokenRepo.save(response);

        return response;
    }

    async getToken(token: string): Promise<Token> {
        const response = await this.TokenRepo.findOne({where: {refreshToken: token}})
        return response;
    }

    async validateToken(token: string): Promise<User | null> {
        try {
            const response = await this.jwtService.verify(token);
            return response;
        } catch(e) {
            return null;
        }
        
    }
}


@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private tokenService: TokenService) {}
    
    async validateUser(login: string, password: string) {
        const user = (await this.userService.getUserByName(login))[0];
        const comparison = await bcrypt.compare(password, user.UserPassword)
        if (user && comparison) {
            return user;
        }
        return null;
    }

    async login(user: any): Promise<any> {
        const validated_user = await this.validateUser(user.login, user.password);
        const tokens = await this.tokenService.createToken(validated_user);
        await this.tokenService.setToken(validated_user.id, tokens.refreshToken);
        return {user: validated_user, tokens: tokens};
    }

    private async validateRequest(requestDto: CreateUserDto) {
        let existing = await this.userService.getUserByEmail(requestDto.UserEmail);
        if (existing.length) {
            throw new HttpException('User with such email already exists.', HttpStatus.BAD_REQUEST);
        }
        existing = await this.userService.getUserByName(requestDto.UserLogin);
        if (existing.length) {
            throw new HttpException('User with such login already exists.', HttpStatus.BAD_REQUEST);
        }
    }

    async register(userDto: CreateUserDto): Promise<any> {
        this.validateRequest(userDto);
        
        const hashed_password = await bcrypt.hash(userDto.UserPassword, 10);
        const user = await this.userService.createUser({...userDto, UserPassword: hashed_password});
        const tokens = await this.tokenService.createToken(user.user);
        await this.tokenService.setToken(user.id, tokens.refreshToken);

        return {user: user, tokens: tokens};
    }

    async logout(refreshToken: string): Promise<DeleteResult> {
        const token = await this.tokenService.deleteToken(refreshToken);
        return token;
    }

    async refresh(token: string) {
        if (!token) {
            throw new UnauthorizedException({message: 'User is not authorized.'});
        }
        const user_candidate = await this.tokenService.validateToken(token);

        const is_in_db = await this.tokenService.getToken(token);

        if (!user_candidate || !is_in_db) {
            throw new UnauthorizedException({message: 'User is not authorized.'});
        }
        //@ts-ignore
        const user = await this.userService.getUserById(user_candidate.sub);
        const tokens = await this.tokenService.createToken(user);
        await this.tokenService.setToken(user.id, tokens.refreshToken);
        return {user: user, tokens: tokens};
    }

    async changePassword(userId: number, passowrds: {old: string, new: string}) {
        const hash = await bcrypt.hash(passowrds.old, 10);
        const targetUser = await this.userService.getUserById(userId);
        if (hash === targetUser.UserPassword) {
            const response = await this.userService.updateUser(userId, {...targetUser, UserPassword: passowrds.new})
            return response
        }
        return null;
    }

    async changePasswordWithoutValidation(userId: number, passowrd: string) {
        const targetUser = await this.userService.getUserById(userId);
        const response = await this.userService.updateUser(userId, {...targetUser, UserPassword: passowrd})
        return response
    }
}