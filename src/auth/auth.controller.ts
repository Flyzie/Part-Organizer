import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() body: loginDto): Promise<{ bearerToken: string }> {
    return this.authService.signIn(body.email, body.password);
  }
}
