import { Controller, Param, Get, Post, Body } from '@nestjs/common';

@Controller('settings')
export class SettingsController {
  @Get('/:userid')
  getSettings(@Param('userid') id: string) {}

  @Post()
  PostAuth(@Body() Body: string) {}
}
