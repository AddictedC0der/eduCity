import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Work } from './entities/work.entity';
import { Subject } from '../user/entities/subject.entity';
import { SolutionController, WorkController } from './work.controller';
import { WorkService, TaskService, SolutionService } from './work.service';
import { User } from '../user/entities/user.entity';
import { Solution } from './entities/solution.entity';
import { Stats } from '../user/entities/stats.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task, Work, Subject, User, Solution, Stats])],
  controllers: [WorkController, SolutionController],
  providers: [WorkService, TaskService, SolutionService],
  exports: [WorkService, TaskService, SolutionService]
})

export class WorkModule {}