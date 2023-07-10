import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ClientService } from '../client/client.service';

@Controller('query')
export class TestqueryController {
  constructor(private ClientService: ClientService) {}

  @Get()
  testQuery() {
    return this.ClientService.testQuery();
  }

  @Get('add/:userId/:partition')
  uploadShift(@Param() params) {
    return this.ClientService.uploadShift(params.partition, params.userId);
  }

  @Get('adds')
  uploadsShift() {
    return this.ClientService.uploadsShift();
  }

  @Patch('adds')
  updateShifts(@Body() shifts: ShiftDto[]) {
    return this.ClientService.updateShifts(shifts);
  }

  @Post('addUser')
  addUser(@Body() user: userDto) {
    return this.ClientService.updateUser(user);
  }
}

type Item = {
  partition: string;
  userId: number;
};
type ShiftDto = {
  item: Item;
  opera: 'del' | 'up';
};
type userDto = {
  Item: userItem;
  opera: 'del' | 'up';
};
type userItem = {
  id: string;
  userName: string;
  displayName: string;
  password: string;
  iaManager: string;
};
