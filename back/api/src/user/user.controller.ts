import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UpdateUserItem } from 'types-module';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  Login(@Body() body: Record<string, string>) {
    return this.userService.VerifyUser(body);
  }

  @Post('create')
  Create(@Body() body: Record<string, string>) {
    //console.log(body);
    //return body;
    return this.userService.NewUser(body);
  }

  @Post('update/:username')
  Update(@Param('username') username: string, @Body() body: UpdateUserItem) {
    return this.userService.UpdateUser(username, body);
  }

  @Get(':username')
  get(@Param('username') username: string, @Res() res: Response) {
    const result = this.userService.GetUser(username);
    return res.json(result);
  }

  @Get('delete/:username')
  Delete(@Param('username') username: string) {
    return this.userService.DeleteUser(username);
  }
}
