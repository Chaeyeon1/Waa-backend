import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoryGameDto {
  @ApiProperty({
    description: '개수',
    default: 0,
    required: true,
  })
  count: number;
}
