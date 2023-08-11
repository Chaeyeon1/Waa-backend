import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { env } from 'process';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: env.JWT_ACCESS_EXPIRATION_TIME },
    }),
    PassportModule,
  ],
  providers: [PrismaService, JwtStrategy],
})
export class AuthModule {}
