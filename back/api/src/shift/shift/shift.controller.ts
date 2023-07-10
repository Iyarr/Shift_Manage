import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { ClientService } from '../../dynamodb/client/client.service';

@Controller('shift')
export class ShiftController {
  constructor(private ClientService: ClientService) {}

  @Get('/:date')
  getShift(@Param('date') date: string) {}

  @Patch('')
  patchShift(@Body() changed_shift: JSON) {}
}
