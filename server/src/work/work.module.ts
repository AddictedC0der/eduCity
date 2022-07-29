import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Work } from './entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Work])],
  exports: [TypeOrmModule]
})

export class UsersModule {}