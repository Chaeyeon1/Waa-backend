import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @ApiTags('Auth')
  @ApiOperation({ summary: '이메일 보내기' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async sendEmail(@Req() request) {
    const user = request.user;

    console.log(user);

    return this.mailService.sendEmail(user);
  }
}
