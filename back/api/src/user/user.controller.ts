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

  @Get(':id')
  Get(@Param('id') id: string, @Res() res: Response) {
    return res.json(this.userService.GetUser(id));
  }

  @Post('login')
  Login(@Body() body: Record<string, string>) {
    return this.userService.VerifyUser(body);
  }

  @Put('update/:id')
  Update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    return this.userService.UpdateUser(id, body);
  }

  @Delete(':id')
  Delete(@Param('id') id: string) {
    return this.userService.DeleteUser(id);
  }
}
