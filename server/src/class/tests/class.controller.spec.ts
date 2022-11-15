import { ChatController } from "../class.controller";
import { ChatService } from "../class.service";
import { Test } from "@nestjs/testing";
import { ChatMessageDto } from "../dto/chat_message.dto";


describe('ChatController', () => {
    let chatController: ChatController;
    let spyService: ChatService;
    
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: ChatService,
            useFactory: () => ({
                createMessage: jest.fn(() => {}),
                editMessage: jest.fn(() => {}),
                deleteMessage: jest.fn(() => {}),
                getMessage: jest.fn(() => {}),
                getAll: jest.fn(() => {}),
            })
        }

        const moduleRef = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [ChatService, ApiServiceProvider]
        }).compile()
    
        chatController = moduleRef.get<ChatController>(ChatController)
        spyService = moduleRef.get<ChatService>(ChatService)
    })

    describe('chatController', () => {
        it('should be defined', () => {
            expect(chatController).toBeDefined()
        })
    })

    describe('createMessage', () => {
        it('should create new message', async () => {
            const testDto = new ChatMessageDto()
            await chatController.createMessage(testDto)
            expect(spyService.createMessage).toHaveBeenCalled()
            expect(spyService.createMessage).toHaveBeenCalledWith(testDto)
        })
    })

    describe('editMessage', () => {
        it('should edit message', async () => {
            const testDto: ChatMessageDto = {text: 'FooBar', author: 124, sendTime: 'Does not matter', isEdited: false, replyTo: 1}
            const testId = 1
            await chatController.editMessage(testId, testDto.text)
            expect(spyService.editMessage).toHaveBeenCalled()
            expect(spyService.editMessage).toHaveBeenCalledWith(testId, testDto.text)
        })
    })

    describe('deleteMessage', () => {
        it('should delete message', async () => {
            const testId = 1
            await chatController.deleteMessage(testId)
            expect(spyService.deleteMessage).toHaveBeenCalled()
            expect(spyService.deleteMessage).toHaveBeenCalledWith(testId)
        })
    })

    describe('getMessage', () => {
        it('should find message by id', async () => {
            const testId = 1
            await chatController.getMessage(testId)
            expect(spyService.getMessage).toHaveBeenCalled()
            expect(spyService.getMessage).toHaveBeenCalledWith(testId)
        })
    })

    describe('getAll', () => {
        it('should find all messages', async () => {
            await chatController.getAll()
            expect(spyService.getAll).toHaveBeenCalled()
        })
    })
})