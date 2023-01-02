import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Work } from './entities/work.entity';
import { Subject } from '../user/entities/subject.entity';
import { WorkController } from './work.controller';
import { WorkService, TaskService } from './work.service';
import { User } from '../user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task, Work, Subject, User])],
  controllers: [WorkController],
  providers: [WorkService, TaskService],
  exports: [WorkService, TaskService]
})

export class WorkModule {}