import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({
    description: '문제',
    default: '세상에서 가장 큰 코는?',
    required: true,
  })
  question: string;

  @ApiProperty({ description: '정답', default: '멕시코', required: true })
  answer: string;

  @ApiProperty({
    description: '나이',
    default: 13,
    required: false,
  })
  age: number;
}
