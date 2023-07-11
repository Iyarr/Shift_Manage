import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

type authDto = {
  id: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  PostAuth(@Body() Body: authDto) {
    return this.authService.userAuth(Body);
  }
}
