import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Stats } from './entities/stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Stats])],
  exports: [TypeOrmModule]
})

export class UsersModule {}