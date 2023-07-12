import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ClientService } from './client/client.service';

@Controller('test')
export class TestController {
  constructor(private ClientService: ClientService) {}

  @Get()
  testQuery() {
    return this.ClientService.UseTestQuery().testQuery();
  }

  @Get('add/:userId/:partition')
  uploadShift(@Param() params: Shift) {
    return this.ClientService.UseTestQuery().uploadShift(params);
  }

  @Get('adds')
  uploadsShift() {
    return this.ClientService.UseTestQuery().uploadsShift();
  }

  @Patch('adds')
  updateShifts(@Body() shifts: ShiftDto[]) {
    return this.ClientService.WriteShifts(shifts);
  }

  @Post('addUser')
  addUser(@Body() user: userItem) {
    return this.ClientService.WriteUser(user);
  }
}
type Shift = {
  partition: string;
  userName: string;
};
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
