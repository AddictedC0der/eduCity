import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User, Teacher, Student, Parent } from './entities/user.entity';
import { StudentStats } from './entities/stats.entity';
import { Class } from '../class/entities/class.entity';
import { Subject } from './entities/subject.entity';
import { UserService, SubjectService } from './user.service';
import { SubjectController, UserController } from './user.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student, Parent, StudentStats, Subject, Class])],
  controllers: [UserController, SubjectController],
  providers: [UserService, SubjectService],
  exports: [UserService]
})

export class UserModule {}