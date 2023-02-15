import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { School } from './entities/school.entity';
import { ChatMessage } from './entities/chat_message.entity';
import { ChatController, ClassController, SchoolController } from './class.controller';
import { ChatService, ClassService, SchoolService } from './class.service';
import { Parent, Student, Teacher, User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Stats } from '../user/entities/stats.entity';
import { Subject } from '../user/entities/subject.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Class, School, ChatMessage, User, Student, Parent, Teacher, Stats, Subject])],
  controllers: [ChatController, ClassController, SchoolController],
  providers: [ChatService, ClassService, SchoolService, UserService],
  exports: [TypeOrmModule]
})

export class ClassModule {}