import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User, Teacher, Student, Parent } from './user/entities/user.entity'
import { Class } from './class/entities/class.entity'; 
import { School } from './class/entities/school.entity';
import { Stats } from './user/entities/stats.entity';
import { Subject } from './user/entities/subject.entity';
import { Work } from './work/entities/work.entity';
import { Task } from './work/entities/task.entity';
import { Token } from './auth/entities/token.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WorkModule } from './work/work.module';
import { join } from 'path';
import { ClassModule } from './class/class.module';
import { ChatMessage } from './class/entities/chat_message.entity';
import { myMigration1670034134209 } from './migrations/1670034134209-myMigration';
import { CustomLogger } from './logging/CustomLogger';
import { Solution } from './work/entities/solution.entity';


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
      entities: [User, Teacher, Student, Parent, Class, School, Stats, Subject, Work, Task, Token, ChatMessage, Solution],
      synchronize: true,
      migrationsTableName: "migrations",
      // migrations: [myMigration1670034134209],
      // migrationsRun: true,
      // logging: 'all',
      // logger: new CustomLogger()
  }),
  UserModule,
  AuthModule,
  ClassModule,
  WorkModule
],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule {}

// join(__dirname, '**', '*.entity.{ts,js}')