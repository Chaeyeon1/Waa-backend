import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Id', default: 'chaeyeon', required: true })
  userId: string;

  @ApiProperty({ description: 'Password', default: 'password', required: true })
  password: string;
}
