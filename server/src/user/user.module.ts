import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Stats } from './entities/stats.entity';
import { RoleService, UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Stats])],
  providers: [UserService, RoleService],
  exports: [TypeOrmModule, UserService, RoleService]
})

export class UserModule {}