import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '이름', default: 'honghong', required: true })
  username: string;

  @ApiProperty({ description: '아이디', default: 'honghong', required: true })
  userId: string;

  @ApiProperty({ description: '비밀번호', default: 'honghong', required: true })
  password: string;

  @ApiProperty({ description: '나이', default: 23, required: true })
  age: number;
}

export class ModifyPasswordDto {
  @ApiProperty({ description: '비밀번호', default: 'hong', required: true })
  password: string;
}

export class ModifyNameDto {
  @ApiProperty({ description: '닉네임', default: 'hong', required: true })
  username: string;
}

export class ModifyAgeDto {
  @ApiProperty({ description: '나이', default: 0, required: true })
  age: number;
}
