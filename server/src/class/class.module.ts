import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { School } from './entities/school.entity';
import { ChatMessage } from './entities/chat_message.entity';
import { ChatController } from './class.controller';
import { ChatService } from './class.service';
import { User } from '../user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Class, School, ChatMessage, User])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [TypeOrmModule]
})

export class ClassModule {}