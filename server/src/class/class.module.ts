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
import { TaskService, WorkService } from '../work/work.service';
import { Work } from '../work/entities/work.entity';
import { Task } from '../work/entities/task.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Class, School, ChatMessage, User, Student, Parent, Teacher, Stats, Subject, Work, Task])],
  controllers: [ChatController, ClassController, SchoolController],
  providers: [ChatService, ClassService, SchoolService, UserService, WorkService, TaskService],
  exports: [TypeOrmModule]
})

export class ClassModule {}