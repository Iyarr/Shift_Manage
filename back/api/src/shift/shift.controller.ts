import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { ShiftService } from './shift.service';

type Shift = {
  partition: string;
  userName: string;
};

type ShiftDto = {
  item: Shift;
  shouldAdd: boolean;
};

@Controller('shift')
export class ShiftController {
  constructor(private ShiftService: ShiftService) {}
  @Get('/week/:monday')
  getWeeklyShiftData(@Param('monday') day: string) {
    return this.ShiftService.DLWeekFromMonday(day);
  }

  @Patch('')
  patchShifts(@Body() Shifts: ShiftDto[]) {
    return this.ShiftService.UploadShifts(Shifts);
  }
}
