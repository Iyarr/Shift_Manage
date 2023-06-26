import {
  Controller,
  Get,
  Post,
  Patch,
  Request,
  Session,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import { ShiftService, UserService } from './app.service';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';

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
  constructor(
    private readonly shiftService: ShiftService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private dynamoDBClient: DynamoDBClient = new DynamoDBClient({
      region: 'ap-southeast-2',
      credentials: {
        secretAccessKey: configService.get<string>('MY_KEY_ID'),
        accessKeyId: configService.get<string>('SECRET_KEY'),
      },
    }),
  ) {}

  @Get('/api/shift/week/:date')
  getShift(@Param('date') date: string): JSON {
    return this.shiftService.getShift(`${date}`, this.dynamoDBClient);
  }

  @Post('/api/auth/token')
  postAuth(@Body() data: userSec): JSON {
    return this.userService.postAuth(data, this.dynamoDBClient);
  }

  @Post('/api/user/:username')
  postUser(@Body() data: userInfo): JSON {
    return this.userService.postUser(data, this.dynamoDBClient);
  }

  @Patch('/api/shift')
  patchShift(@Body() data: JSON): JSON {
    return this.shiftService.patchShift(data, this.dynamoDBClient);
  }
}
