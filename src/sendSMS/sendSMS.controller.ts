import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendSMSService } from './sendSMS.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('send-sms')
export class SendSMSController {
  constructor(private readonly userService: SendSMSService) {}

  @Get()
  @ApiTags('Auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '메시지 보내기' })
  @ApiBearerAuth('access-token')
  async createUser() {
    return this.userService.sendSMS();
  }
}
