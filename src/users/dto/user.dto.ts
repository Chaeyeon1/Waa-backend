import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '이름', default: 'hong', required: true })
  username: string;

  @ApiProperty({ description: '아이디', default: 'hong123', required: true })
  userId: string;

  @ApiProperty({ description: '비밀번호', default: 'asdf', required: true })
  password: string;
}

export class ModifyPasswordDto {
  @ApiProperty({ description: '비밀번호', default: 'hong', required: true })
  password: string;
}

export class ModifyScoreDto {
  @ApiProperty({ description: '점수', default: 0, required: true })
  score: string;
}
