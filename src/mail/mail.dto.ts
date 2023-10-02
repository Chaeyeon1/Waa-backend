import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty({ description: '이메일', default: '', required: true })
  email: string;
}
