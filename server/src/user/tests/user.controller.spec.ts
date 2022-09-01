import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { Test } from "@nestjs/testing";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";


describe('UserController', () => {
    let userController: UserController;
    let spyService: UserService;
    
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: UserService,
            useFactory: () => ({
                createUser: jest.fn(() => {}),
                updateUser: jest.fn(() => {}),
                deleteUser: jest.fn(() => {}),
                getUserById: jest.fn(() => {}),
                getUserByName: jest.fn(() => {}),
                getUserByEmail: jest.fn(() => {}),
                getAll: jest.fn(() => []),
            })
        }

        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, ApiServiceProvider]
        }).compile()
    
        userController = moduleRef.get<UserController>(UserController)
        spyService = moduleRef.get<UserService>(UserService)
    })

    describe('userController', () => {
        it('should be defined', () => {
            expect(userController).toBeDefined()
        })
    })

    describe('createUser', () => {
        it('should create new user', async () => {
            const testDto = new CreateUserDto()
            await userController.createUser(testDto)
            expect(spyService.createUser).toHaveBeenCalled()
            expect(spyService.createUser).toHaveBeenCalledWith(testDto)
        })
    })

    describe('updateUser', () => {
        it('should update user', async () => {
            const testDto = new UpdateUserDto()
            const testId = 1
            await userController.updateUser(testId, testDto)
            expect(spyService.updateUser).toHaveBeenCalled()
            expect(spyService.updateUser).toHaveBeenCalledWith(testId, testDto)
        })
    })

    describe('deleteUser', () => {
        it('should delete user', async () => {
            const testId = 1
            await userController.deleteUser(testId)
            expect(spyService.deleteUser).toHaveBeenCalled()
            expect(spyService.deleteUser).toHaveBeenCalledWith(testId)
        })
    })

    describe('getUserByName', () => {
        it('should find user by name', async () => {
            const testName = 'Dummy'
            await userController.getUserByName(testName)
            expect(spyService.getUserByName).toHaveBeenCalled()
            expect(spyService.getUserByName).toHaveBeenCalledWith(testName)
        })
    })

    describe('getUserById', () => {
        it('should find user by id', async () => {
            const testId = 1
            await userController.getUserById(testId)
            expect(spyService.getUserById).toHaveBeenCalled()
            expect(spyService.getUserById).toHaveBeenCalledWith(testId)
        })
    })

    describe('getUserByEmail', () => {
        it('should find user by email', async () => {
            const testEmail = 'dummy1@gmail.com'
            await userController.getUserByEmail(testEmail)
            expect(spyService.getUserByEmail).toHaveBeenCalled()
            expect(spyService.getUserByEmail).toHaveBeenCalledWith(testEmail)
        })
    })

    describe('getAll', () => {
        it('should find all users', async () => {
            await userController.getAll()
            expect(spyService.getAll).toHaveBeenCalled()
        })
    })
})