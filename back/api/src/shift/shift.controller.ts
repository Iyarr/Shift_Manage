import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { shift } from 'types-module';

@Controller('shift')
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get('between/:stpartition/and/:fipartition')
  GetSchedule(@Param() param: { stPartition: string; fiPartition: string }) {
    return this.shiftService.GetSchedule(param.stPartition, param.fiPartition);
  }

  @Get('user/:username/between/:stpartition/and/:fipartition')
  GetYoursShifts(
    @Param()
    param: {
      username: string;
      stPartition: string;
      fiPartition: string;
    },
  ) {
    return this.shiftService.GetYoursShifts(
      [param.username],
      param.stPartition,
      param.fiPartition,
    );
  }

  @Post('')
  WriteSchedule(@Body() body: shift[]) {
    return this.shiftService.WriteSchedule(body);
  }
}
