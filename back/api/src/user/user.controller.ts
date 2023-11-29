import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UpdateUserBody } from 'types-module';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  Create(@Body() body: Record<string, string>) {
    return this.userService.CreateUser(body);
  }

  @Get(':user_id')
  Get(@Param('user_id') username: string, @Res() res: Response) {
    return res.json(this.userService.GetUser(username));
  }

  @Post('login')
  Login(@Body() body: Record<string, string>) {
    return this.userService.VerifyUser(body);
  }

  @Put('update/:user_id')
  Update(@Param('user_id') username: string, @Body() body: UpdateUserBody) {
    return this.userService.UpdateUser(username, body);
  }

  @Delete(':user_id')
  Delete(@Param('user_id') username: string) {
    return this.userService.DeleteUser(username);
  }
}
