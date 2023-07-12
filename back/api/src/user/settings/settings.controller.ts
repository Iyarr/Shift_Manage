import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

type UserDto = {
  id: string;
  userName: string;
  displayName: string;
  password: string;
  iaManager: string;
};

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}
  @Get('/:userid')
  getSettings(@Param('userid') id: string) {}

  @Post()
  PostAuth(@Body() user: UserDto) {}
}
