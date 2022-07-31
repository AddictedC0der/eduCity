import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { Token } from './entities/token.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
      signOptions: {expiresIn: '5d'}
    })
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})

export class AuthModule {}