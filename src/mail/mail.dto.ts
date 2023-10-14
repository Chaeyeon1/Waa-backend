import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty({ description: '이메일', default: '', required: true })
  email: string;
}

export class MailForgetDto {
  @ApiProperty({ description: '아이디', default: '', required: true })
  userId: string;
}
