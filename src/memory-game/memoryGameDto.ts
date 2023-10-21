import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoryGameDto {
  @ApiProperty({
    description: '점수',
    default: 0,
    required: true,
  })
  score: number;
}
