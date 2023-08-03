import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() signupData: { userId: string; password: string }) {
    const { userId, password } = signupData;

    const result = await this.authService.signup(userId, password);

    if ('error' in result) {
      return { error: result.error };
    }

    return result;
  }
}
