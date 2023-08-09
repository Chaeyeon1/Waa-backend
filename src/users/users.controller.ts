import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, ModifyPasswordDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  // 단일 조회
  @Get(':id')
  @ApiOperation({ summary: '유저 조회' })
  async searchUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.searchUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제' })
  async deleteUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '비밀번호 수정' })
  @ApiBody({ type: ModifyPasswordDto })
  async updateUser(
    @Param('id') id: number,
    @Body() data: User,
  ): Promise<User | null> {
    return this.userService.updateUser(id, data.password);
  }
}
