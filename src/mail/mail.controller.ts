import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MailDto } from './mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @ApiTags('Auth')
  @ApiOperation({ summary: '5회 초과 이메일 보내기' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async sendEmail(@Req() request) {
    const user = request.user;

    return this.mailService.sendEmail(user);
  }

  @Post('authentication')
  @ApiTags('Auth')
  @ApiOperation({ summary: '이메일 인증' })
  @ApiBody({ type: MailDto })
  async getDangerousKeywordsContent(@Body() email): Promise<string> {
    return this.mailService.sendAuthenticationEmail(email);
  }

  @Post('reset-password')
  @ApiTags('Auth')
  @ApiOperation({ summary: '비밀번호 재설정' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async postPasswordResetContent(@Req() request): Promise<string> {
    const user = request.user;

    return this.mailService.setForgetPassword(user);
  }
}
