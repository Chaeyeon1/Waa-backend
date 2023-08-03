import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ description: 'sender', default: 'chaeyeon', required: true })
  sender: string;

  @ApiProperty({ description: '내용', default: '안녕', required: true })
  content: string;

  @ApiProperty({
    description: '시간',
    default: '2023-07-31T11:10:00.000Z',
    required: true,
  })
  time: Date;
}
