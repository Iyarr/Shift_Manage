import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UpdateUserBody } from 'types-module';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @HttpCode(201)
  async Create(@Body() body: Record<string, string>) {
    try {
      await this.userService.CreateUser(body);
      return { message: 'Created' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error Message', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @HttpCode(200)
  async Login(@Body() body: Record<string, string>) {
    try {
      const res = await this.userService.VerifyUser(body);
      if (res.Count == 1) {
        return { message: 'Login successful' };
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Error Message', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async Get(@Param('id') id: string, @Res() res: Response) {
    try {
      const res = await this.userService.GetUser(id);
      return res;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error Message', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:id')
  @HttpCode(200)
  async Update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    try {
      await this.userService.UpdateUser(id, body);
      return { message: 'Updated' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error Message', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async Delete(@Param('id') id: string) {
    try {
      await this.userService.DeleteUser(id);
      return { message: 'Deleted' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error Message', HttpStatus.BAD_REQUEST);
    }
  }
}
