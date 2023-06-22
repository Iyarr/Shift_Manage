import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';

type userSec = {
  username: string;
  password: string;
};

type userInfo = {
  displayName: string;
  username: string;
  password: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/shift/week/:date')
  getShift(@Param('date') date: string): JSON {
    return this.appService.getShift(`${date}`);
  }

  @Post('/api/auth/token')
  postAuth(@Body() data: userSec): JSON {
    return this.appService.postAuth(data);
  }

  @Post('/api/user/:username')
  postUser(@Body() data: userInfo): JSON {
    return this.appService.postAuth(data);
  }

  @Patch('/api/shift')
  patchShift(@Body() data: JSON): JSON {
    return this.appService.patchShift(data);
  }
}
