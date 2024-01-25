import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { shift } from 'types-module';

@Controller('shift')
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get('between/:start/and/:finish')
  @HttpCode(200)
  async GetSchedule(@Param() param: { start: string; finish: string }) {
    try {
      const res = await this.shiftService.GetSchedule(
        param.start,
        param.finish,
      );
      return res;
    } catch (error) {
      console.error(error);
      throw new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:id/between/:start/and/:finish')
  @HttpCode(200)
  async GetYoursShifts(
    @Param()
    param: {
      id: string;
      start: string;
      finish: string;
    },
  ) {
    try {
      const res = await this.shiftService.GetYoursShifts(
        [param.id],
        param.start,
        param.finish,
      );
      return res;
    } catch (error) {
      console.error(error);
      throw new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('')
  @HttpCode(201)
  async WriteSchedule(@Body() body: shift[]) {
    try {
      const res = await this.shiftService.WriteSchedule(body);
      return res;
    } catch (error) {
      console.error(error);
      throw new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }
}
