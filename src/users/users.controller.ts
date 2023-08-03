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
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  async addTodoItem(@Body() data: User): Promise<User> {
    return this.userService.addTodoItem(data);
  }

  // 단일 조회
  @Get(':id')
  async fetchTodoItem(@Param('id') id: number): Promise<User | null> {
    return this.userService.fetchTodoItem(id);
  }

  @Delete(':id')
  async deleteTodoItem(@Param('id') id: number): Promise<User | null> {
    return this.userService.deleteTodoItem(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '비밀번호 수정' })
  @ApiBody({ type: CreateUserDto })
  async updateTodoItem(
    @Param('id') id: number,
    @Body() data: User,
  ): Promise<User | null> {
    return this.userService.updateTodoItem(id, data.password);
  }
}
