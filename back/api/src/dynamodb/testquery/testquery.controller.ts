import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ClientService } from '../client/client.service';

type Shift = {
  partition: string;
  userName: string;
};
@Controller('query')
export class TestqueryController {
  constructor(private ClientService: ClientService) {}

  @Get()
  testQuery() {
    return this.ClientService.Usetestquery().testQuery();
  }

  @Get('add/:userId/:partition')
  uploadShift(@Param() params: Shift) {
    return this.ClientService.Usetestquery().uploadShift(params);
  }

  @Get('adds')
  uploadsShift() {
    return this.ClientService.Usetestquery().uploadsShift();
  }

  @Patch('adds')
  updateShifts(@Body() shifts: ShiftDto[]) {
    return this.ClientService.updateShifts(shifts);
  }

  @Post('addUser')
  addUser(@Body() user: userItem) {
    return this.ClientService.WriteUser(user);
  }
}

type Item = {
  partition: string;
  userName: string;
};
type ShiftDto = {
  item: Item;
  shouldAdd: boolean;
};
type userItem = {
  userName: string;
  displayName: string;
  password: string;
  isManager: boolean;
};
