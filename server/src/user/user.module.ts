import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User, Teacher, Student, Parent } from './entities/user.entity';
import { Stats } from './entities/stats.entity';
import { Class } from 'src/class/entities/class.entity';
import { Subject } from './entities/subject.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student, Parent, Stats, Subject, Class])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule {}