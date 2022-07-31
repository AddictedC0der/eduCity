import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";
import { User } from "src/user/entities/user.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService,
                @InjectRepository(Token) TokenRepository: Repository<Token>,
                private dataSource: DataSource) {}
    
    async createToken(user: User): Promise<any> {
        const payload = {login: user.login, email: user.email, sub: user.id}
        const accessToken = this.jwtService.sign(payload, {expiresIn: '30m'})
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async deleteToken(token): Promise<DeleteResult> {
        const response = await this.dataSource.createQueryBuilder()
                                            .delete()
                                            .from(Token)
                                            .where('token.refreshToken = :refreshToken', {refreshToken: token})
                                            .execute()
        return response;
    }

    async setToken(userId: number, token: string) {
        const data = await this.dataSource.createQueryBuilder()
                                    .relation(User, 'token')
                                    .of(userId)
                                    .loadOne()
        if (data) {
            const response = await this.dataSource.createQueryBuilder()
                                        .update(Token)
                                        .set({...data, refreshToken: token})
                                        .where('id = :id', {id: data.id})
            return response;
        }
        const user = await this.dataSource.createQueryBuilder()
                                        .select('user')
                                        .from(User, 'user')
                                        .where('user.id = :id', {id: userId})
                                        .execute()
        const response = await this.dataSource.createQueryBuilder()
                                            .insert()
                                            .into(Token)
                                            .values([{refreshToken: token, userId: user}])
                                            .execute()
        return response;
    }

    async getToken(token: string): Promise<Token> {
        const response = await this.dataSource.createQueryBuilder()
                                            .select('token')
                                            .from(Token, 'token')
                                            .where('token.refreshToken = :refreshToken', {refreshToken: token})
                                            .execute()
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
                private tokenService: TokenService,
                private dataSource: DataSource) {}
    
    async validateUser(login: string, password: string) {
        const user = await this.userService.getUserByName(login);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<any> {
        const validated_user = await this.validateUser(user.login, user.password);
        const tokens = await this.tokenService.createToken(validated_user);
        await this.tokenService.setToken(validated_user.id, tokens.refreshToken);
        return {user: validated_user, tokens: tokens};
    }

    private async validateRequest(requestDto: CreateUserDto) {
        let existing = await this.userService.getUserByEmail(requestDto.email);
        if (existing) {
            throw new HttpException('User with such email already exists.', HttpStatus.BAD_REQUEST);
        }
        existing = await this.userService.getUserByName(requestDto.login);
        if (existing) {
            throw new HttpException('User with such login already exists.', HttpStatus.BAD_REQUEST);
        }
    }

    async register(userDto: CreateUserDto): Promise<any> {
        this.validateRequest(userDto);
        
        const hashed_password = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser({...userDto, password: hashed_password});

        const tokens = await this.tokenService.createToken(user);
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
        const user = await this.userService.getUserById(user_candidate.id);
        const tokens = await this.tokenService.createToken(user);
        await this.tokenService.setToken(user.id, tokens.refreshToken);
        return {user: user, tokens: tokens};
    }
}