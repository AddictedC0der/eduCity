import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthService, TokenService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { Token } from './entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
      signOptions: {expiresIn: '5d'}
    }),
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, TokenService, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}