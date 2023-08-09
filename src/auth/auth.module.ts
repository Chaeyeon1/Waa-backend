import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
  providers: [PrismaService],
})
export class AuthModule {}
