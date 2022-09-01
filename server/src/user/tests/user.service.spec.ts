import { UserService } from "../user.service";
import { Test } from "@nestjs/testing";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { User, Student, Teacher, Parent } from "../entities/user.entity";
import { Stats } from "../entities/stats.entity";
import { Subject } from "../entities/subject.entity";
import * as sinon from 'sinon';
import { Repository } from "typeorm";


describe('UserService', () => {
    let userService: UserService;
    let sandbox: sinon.SinonSandbox
    let StudentRepositoryMock: any
    let StatsRepositoryMock: any

    beforeAll(async () => {
        sandbox = sinon.createSandbox();

        const moduleRef = await Test.createTestingModule({
            providers: [UserService,
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
                }
            ]
        }).compile()
        StudentRepositoryMock = moduleRef.get(getRepositoryToken(Student));
        StatsRepositoryMock = moduleRef.get(getRepositoryToken(Stats));
        userService = moduleRef.get<UserService>(UserService)
    })

    describe('userService', () => {
        it('should be defined', () => {
            expect(userService).toBeDefined()
        })
    })

    describe('createUser', () => {
        it('should create new user', async () => {
            const createUserSpy = jest.spyOn(userService, 'createUser')
            const testDto: CreateUserDto = {UserRole: 'Student', UserEmail: 'Demo@mail.ru', UserLogin: 'Demo12', UserPassword: '12345'}
            jest.spyOn(StudentRepositoryMock, 'create').mockReturnValue({})
            jest.spyOn(StatsRepositoryMock, 'create').mockReturnValue({masterUser: {}})
            await userService.createUser(testDto)
            expect(createUserSpy).toHaveBeenCalledWith(testDto)
        })
    })

    describe('updateUser', () => {
        it('should update user', async () => {
            const updateUserSpy = jest.spyOn(userService, 'updateUser');
            const testDto = new UpdateUserDto()
            const testId = 1
            await userService.updateUser(testId, testDto)
            expect(updateUserSpy).toHaveBeenCalledWith(testId, testDto)
        })
    })

    describe('deleteUser', () => {
        it('should delete user', async () => {
            const deleteUserSpy = jest.spyOn(userService, 'deleteUser');
            const testId = 1
            await userService.deleteUser(testId)
            expect(deleteUserSpy).toHaveBeenCalledWith(testId)
        })
    })

    describe('getUserByName', () => {
        it('should find user by name', async () => {
            const deleteUserSpy = jest.spyOn(userService, 'getUserByName');
            const testName = 'Dummy'
            await userService.getUserByName(testName)
            expect(deleteUserSpy).toHaveBeenCalledWith(testName)
        })
    })

    describe('getUserById', () => {
        it('should find user by id', async () => {
            const deleteUserSpy = jest.spyOn(userService, 'getUserById');
            const testId = 1
            await userService.getUserById(testId)
            expect(deleteUserSpy).toHaveBeenCalledWith(testId)
        })
    })

    describe('getAll', () => {
        it('should find all users', async () => {
            const deleteUserSpy = jest.spyOn(userService, 'getAll');
            await userService.getAll()
            expect(deleteUserSpy).toHaveBeenCalled()
        })
    })

    afterAll(async () => {
        sandbox.restore()
    })
})