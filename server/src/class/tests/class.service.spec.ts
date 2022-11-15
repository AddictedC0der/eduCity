import { ChatService } from "../class.service";
import { Test } from "@nestjs/testing";
import { ChatMessageDto } from "../dto/chat_message.dto";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { ChatMessage } from "../entities/chat_message.entity";
import { User } from '../../user/entities/user.entity';
import * as sinon from 'sinon';
import { Repository } from "typeorm";


describe('UserService', () => {
    let chatService: ChatService;
    let sandbox: sinon.SinonSandbox
    let ChatMessageRepositoryMock: any

    beforeAll(async () => {
        sandbox = sinon.createSandbox();

        const moduleRef = await Test.createTestingModule({
            providers: [ChatService,
                {
                    provide: getRepositoryToken(ChatMessage),
                    useValue: sinon.createStubInstance(Repository)
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: sinon.createStubInstance(Repository)
                }
            ]
        }).compile()
        ChatMessageRepositoryMock = moduleRef.get(getRepositoryToken(ChatMessage));
        chatService = moduleRef.get<ChatService>(ChatService)
    })

    describe('chatService', () => {
        it('should be defined', () => {
            expect(chatService).toBeDefined()
        })
    })

    describe('createMessage', () => {
        it('should create new message', async () => {
            const createMessageSpy = jest.spyOn(chatService, 'createMessage')
            const testDto: ChatMessageDto = {text: 'FooBar', author: 1, isEdited: false, sendTime: 'Does not matter', replyTo: 2}
            jest.spyOn(ChatMessageRepositoryMock, 'create').mockReturnValue({})
            await chatService.createMessage(testDto)
            expect(createMessageSpy).toHaveBeenCalledWith(testDto)
        })
    })

    describe('editMessage', () => {
        it('should edit message', async () => {
            const updateMessageSpy = jest.spyOn(chatService, 'editMessage');
            const testDto: ChatMessageDto = {text: 'FooBar2', author: 1, isEdited: false, sendTime: 'Does not matter', replyTo: 2}
            const testId = 1
            await chatService.editMessage(testId, testDto.text)
            expect(updateMessageSpy).toHaveBeenCalledWith(testId, testDto.text)
        })
    })

    describe('deleteMessage', () => {
        it('should delete message', async () => {
            const deleteMessageSpy = jest.spyOn(chatService, 'deleteMessage');
            const testId = 1
            await chatService.deleteMessage(testId)
            expect(deleteMessageSpy).toHaveBeenCalledWith(testId)
        })
    })

    describe('getMessage', () => {
        it('should find message by id', async () => {
            const deleteMessageSpy = jest.spyOn(chatService, 'getMessage');
            const testId = 1
            await chatService.getMessage(testId)
            expect(deleteMessageSpy).toHaveBeenCalledWith(testId)
        })
    })

    describe('getAll', () => {
        it('should find all messages', async () => {
            const deleteMessageSpy = jest.spyOn(chatService, 'getAll');
            await chatService.getAll()
            expect(deleteMessageSpy).toHaveBeenCalled()
        })
    })

    afterAll(async () => {
        sandbox.restore()
    })
})