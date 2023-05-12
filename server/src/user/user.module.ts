import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User, Teacher, Student, Parent } from './entities/user.entity';
import { StudentStats } from './entities/stats.entity';
import { Class } from '../class/entities/class.entity';
import { Subject } from './entities/subject.entity';
import { UserService, SubjectService, ResourceService } from './user.service';
import { ResourceController, SubjectController, UserController } from './user.controller';
import { Resource } from './entities/resource.entity';
import { Work } from '../work/entities/work.entity';
// import { WorkService } from '../work/work.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student, Parent, StudentStats, Subject, Class, Resource, Work])],
  controllers: [UserController, SubjectController, ResourceController],
  providers: [UserService, SubjectService, ResourceService, /* WorkService */],
  exports: [UserService]
})

export class UserModule {}