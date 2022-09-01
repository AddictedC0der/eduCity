import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { Test } from "@nestjs/testing";
import { CreateUserDto } from "../../user/dto/user.dto";
import { Token } from "../entities/token.entity";


describe('AuthController', () => {
    let authController: AuthController;
    let spyService: AuthService;
    
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: AuthService,
            useFactory: () => ({
                login: jest.fn(() => {}),
                register: jest.fn(() => {}),
                logout: jest.fn(() => {}),
                refresh: jest.fn(() => {}),
            })
        }

        const moduleRef = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, ApiServiceProvider]
        }).compile()
    
        authController = moduleRef.get<AuthController>(AuthController)
        spyService = moduleRef.get<AuthService>(AuthService)
    })

    describe('authController', () => {
        it('should be defined', () => {
            expect(authController).toBeDefined()
        })
    })

    describe('login', () => {
        it('should login user', async () => {
            const demoReq = {user: {}}
            const demoResp = {cookie: (p0, p1, p2) => {}}
            jest.spyOn(spyService, 'login').mockReturnValue(new Promise((resolve, reject) => {resolve({tokens: {}})}))
            await authController.login(demoReq, demoResp)
            expect(spyService.login).toHaveBeenCalled()
            expect(spyService.login).toHaveBeenCalledWith(demoReq.user)
        })
    })

    describe('register', () => {
        it('should register new user', async () => {
            const testDto = new CreateUserDto()
            jest.spyOn(spyService, 'register').mockReturnValue(new Promise((resolve, reject) => {resolve({tokens: {}})}))
            await authController.register(testDto, {cookie: (p0, p1, p2) => {}})
            expect(spyService.register).toHaveBeenCalled()
            expect(spyService.register).toHaveBeenCalledWith(testDto)
        })
    })

    describe('logout', () => {
        it('should logout user', async () => {
            const demoReq = {cookies: {refreshToken: ''}}
            const demoResp = {clearCookies: (p0) => {}}
            await authController.logout(demoReq, demoResp)
            expect(spyService.logout).toHaveBeenCalled()
            expect(spyService.logout).toHaveBeenCalledWith(demoReq.cookies.refreshToken)
        })
    })

    describe('refresh', () => {
        it('should refresh users token', async () => {
            const demoReq = {cookies: {refreshToken: ''}}
            const demoResp = {cookie: (p0, p1, p2) => {}}
            jest.spyOn(spyService, 'refresh').mockReturnValue(new Promise((resolve, reject) => {resolve({tokens: {},
                user: {id: 1, UserLogin: 'Dummy', UserPassword: 'Dummy', UserEmail: 'Dummy', Token: new Token()}})}))
            await authController.refresh(demoReq, demoResp)
            expect(spyService.refresh).toHaveBeenCalled()
            expect(spyService.refresh).toHaveBeenCalledWith(demoReq.cookies.refreshToken)
        })
    })
})