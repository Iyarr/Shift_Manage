import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { shift } from 'types-module';

@Controller('shift')
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get('between/:start/and/:finish')
  GetSchedule(@Param() param: { start: string; finish: string }) {
    return this.shiftService.GetSchedule(param.start, param.finish);
  }

  @Get('user/:username/between/:start/and/:finish')
  GetYoursShifts(
    @Param()
    param: {
      username: string;
      start: string;
      finish: string;
    },
  ) {
    return this.shiftService.GetYoursShifts(
      [param.username],
      param.start,
      param.finish,
    );
  }

  @Post('')
  WriteSchedule(@Body() body: shift[]) {
    return this.shiftService.WriteSchedule(body);
  }
}
