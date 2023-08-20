import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Id', default: 'honghong', required: true })
  userId: string;

  @ApiProperty({ description: 'Password', default: 'honghong', required: true })
  password: string;
}
