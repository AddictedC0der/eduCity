import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity'
import { Role } from './user/entities/role.entity';
import { Class } from './class/entities/class.entity'; 
import { School } from './class/entities/school.entity';
import { Stats } from './user/entities/stats.entity';
import { Subject } from './user/entities/subject.entity';
import { Work } from './work/entities/work.entity';
import { Task } from './work/entities/task.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`, isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Role, Stats, Subject, Class, School, Work, Task],
      synchronize: true,
  }),
  UserModule,
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
