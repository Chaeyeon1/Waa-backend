import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Id', default: 'chaeyeon', required: true })
  userId: string;

  @ApiProperty({ description: 'Password', default: 'password', required: true })
  password: string;
}
