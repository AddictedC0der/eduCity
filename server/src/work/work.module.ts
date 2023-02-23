import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Work } from './entities/work.entity';
import { Subject } from '../user/entities/subject.entity';
import { SolutionController, WorkController } from './work.controller';
import { WorkService, TaskService, SolutionService } from './work.service';
import { Parent, Student, Teacher, User } from '../user/entities/user.entity';
import { Solution } from './entities/solution.entity';
import { StudentStats } from '../user/entities/stats.entity';
import { ClassService, SchoolService } from '../class/class.service';
import { Class } from '../class/entities/class.entity';
import { UserService } from '../user/user.service';
import { School } from '../class/entities/school.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task, Work, Subject, User, Solution, StudentStats, Class, Student, Teacher, School, Parent])],
  controllers: [WorkController, SolutionController],
  providers: [WorkService, TaskService, SolutionService, ClassService, SchoolService, UserService],
  exports: [WorkService, TaskService, SolutionService]
})

export class WorkModule {}