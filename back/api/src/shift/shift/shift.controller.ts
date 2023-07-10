import { Controller, Get, Patch, Body, Param } from '@nestjs/common';

@Controller('shift')
export class ShiftController {
  @Get('/:date')
  getShift(@Param('date') date: string) {}

  @Patch('')
  patchShift(@Body() changed_shift: JSON) {}
}
