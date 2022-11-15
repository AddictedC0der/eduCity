import { UserService } from "../../user/user.service";
import { Test } from "@nestjs/testing";
import { CreateUserDto } from "../../user/dto/user.dto";
import * as sinon from 'sinon';
import { AuthService, TokenService } from "../auth.service";
import { Parent, Student, Teacher, User } from "../../user/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Stats } from "../../user/entities/stats.entity";
import { Subject } from "../../user/entities/subject.entity";
import { JwtService } from "@nestjs/jwt";
import { Token } from "../entities/token.entity";


describe('AuthService', () => {
    let userService: UserService;
    let tokenService: TokenService;
    let authService: AuthService;
    let sandbox: sinon.SinonSandbox;

    beforeAll(async () => {
        sandbox = sinon.createSandbox();

        const moduleRef = await Test.createTestingModule({
            providers: [UserService, TokenService, AuthService, JwtService,
            {
                provide: getRepositoryToken(User),
                useValue: sinon.createStubInstance(Repository)
            },
            {
                provide: getRepositoryToken(Parent),
                useValue: sinon.createStubInstance(Repository)
            },
            {
                provide: getRepositoryToken(Teacher),
                useValue: sinon.createStubInstance(Repository)
            },
            {
                provide: getRepositoryToken(Student),
                useValue: sinon.createStubInstance(Repository)
            },
            {
                provide: getRepositoryToken(Stats),
                useValue: sinon.createStubInstance(Repository)
            },
            {
                provide: getRepositoryToken(Subject),
                useValue: sinon.createStubInstance(Repository)
            },
            {
                provide: getRepositoryToken(Token),
                useValue: sinon.createStubInstance(Repository)
            }    
        ]
        }).compile()

        userService = moduleRef.get<UserService>(UserService)
        tokenService = moduleRef.get<TokenService>(TokenService)
        authService = moduleRef.get<AuthService>(AuthService)
    })

    describe('authService', () => {
        it('should be defined', () => {
            expect(authService).toBeDefined()
        })
    })

    describe('validateUser', () => {
        it('should return user if valid otherwise null', async () => {
            const validateUserSpy = jest.spyOn(authService, 'validateUser')
            const testLogin = 'Dummy'
            const testPass = 'qwerty123'
            await authService.validateUser(testLogin, testPass)
            expect(validateUserSpy).toHaveBeenCalledWith(testLogin, testPass)
        })
    })

    describe('login', () => {
        it('should login user and return its data', async () => {
            const loginUserSpy = jest.spyOn(authService, 'login');
            const testDto: CreateUserDto = {UserEmail: 'ipsum@mail.ru', UserLogin: 'lorem', UserPassword: '12345', UserRole: 'Student'}
            await authService.login(testDto)
            expect(loginUserSpy).toHaveBeenCalledWith(testDto)
        })
    })

    describe('register', () => {
        it('should register new user and return its data', async () => {
            const registerUserSpy = jest.spyOn(authService, 'register');
            const testDto: CreateUserDto = {UserLogin: 'Dummy1', UserPassword: 'qwerty123',
                                            UserEmail: 'qwerty@gmail.com', UserRole: 'Student'}
            await authService.register(testDto)
            expect(registerUserSpy).toHaveBeenCalledWith(testDto)
        })
    })

    describe('logout', () => {
        it('should logout user and return deleted token', async () => {
            const logoutUserSpy = jest.spyOn(authService, 'logout');
            const testToken = 'rare_token_that_actually_makes_sense'
            await authService.logout(testToken)
            expect(logoutUserSpy).toHaveBeenCalledWith(testToken)
        })
    })

    describe('refresh', () => {
        it('should refresh token and return it if provided else throw exeption', async () => {
            const refreshTokenSpy = jest.spyOn(authService, 'refresh');
            const testToken = 'rare_token_that_actually_makes_sense'
            await authService.refresh(testToken)
            expect(refreshTokenSpy).toHaveBeenCalledWith(testToken)
        })
    })

    afterAll(async () => {
        sandbox.restore()
    })
})