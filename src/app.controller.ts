import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller('hello') 라고 하면 localhost:3000/hello가 됨
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
