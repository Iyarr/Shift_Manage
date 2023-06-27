import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  PostAuth(@Body() Body: string) {}
}
