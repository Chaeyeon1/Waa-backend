import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('mail')
export class MailController {
  constructor(private readonly userService: MailService) {}

  @Get()
  @ApiTags('Auth')
  @ApiOperation({ summary: '이메일 보내기' })
  async createUser() {
    return this.userService.sendEmail();
  }
}
