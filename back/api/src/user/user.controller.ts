import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserData, NewUserData, UpdateUserItem } from 'types-module';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  Login(@Body() body: LoginUserData) {
    return this.userService.VerifyUser(body);
  }

  @Post('create')
  Create(@Body() body: NewUserData) {
    //console.log(body);
    //return body;
    return this.userService.NewUser(body);
  }

  @Patch('update/:username')
  Update(@Param('username') username: string, @Body() body: UpdateUserItem) {
    return this.userService.UpdateUser(username, body);
  }

  @Get(':username')
  Download(@Param('username') username: string) {
    return this.userService.GetUserInfo(username);
  }

  @Get('delete/:username')
  Delete(@Param('username') username: string) {
    return this.userService.DeleteUser(username);
  }
}
