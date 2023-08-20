import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  ModifyAgeDto,
  ModifyNameDto,
  ModifyPasswordDto,
} from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiTags('Auth')
  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  // 단일 조회
  @ApiTags('유저')
  @Get(':id')
  @ApiOperation({ summary: '유저 조회' })
  async searchUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.searchUser(id);
  }

  @ApiTags('유저')
  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제' })
  async deleteUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.deleteUser(id);
  }

  @ApiTags('유저')
  @Get('/')
  @ApiOperation({ summary: '전체 유저 조회' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async getProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }

  @ApiTags('유저')
  @Put('/password')
  @ApiOperation({ summary: '유저 비밀번호 수정' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: ModifyPasswordDto })
  async updateUser(@Req() request, @Body() data): Promise<boolean> {
    const user = request.user;

    return this.userService.updateUserPassword(user, data.password);
  }

  @ApiTags('유저')
  @Put('/score')
  @ApiOperation({ summary: '유저 스코어 수정' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async updateScore(@Req() request): Promise<User | null> {
    const user = request.user;

    return this.userService.updateUserScore(user);
  }

  @ApiTags('유저')
  @Put('/username')
  @ApiOperation({ summary: '유저 닉네임 수정' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: ModifyNameDto })
  async updateName(@Req() request, @Body() data): Promise<boolean> {
    const user = request.user;

    return this.userService.updateUserName(user, data.username);
  }

  @ApiTags('유저')
  @Put('/age')
  @ApiOperation({ summary: '유저 나이 수정' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: ModifyAgeDto })
  async updateAge(@Req() request, @Body() data): Promise<boolean> {
    const user = request.user;

    return this.userService.updateUserAge(user, data.age);
  }
}
