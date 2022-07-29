import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { School } from './entities/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, School])],
  exports: [TypeOrmModule]
})

export class UsersModule {}