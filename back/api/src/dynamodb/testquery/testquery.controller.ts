import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ClientService } from '../client/client.service';

@Controller('testquery')
export class TestqueryController {
  constructor(private ClientService: ClientService) {
    this.ClientService = ClientService;
  }

  @Get(':id/:partition')
  getHello(@Param() params) {
    return this.ClientService.testQuery(params.id, params.partition);
  }

  @Get('add/:userId/:partition')
  uploadShift(@Param() params) {
    return this.ClientService.uploadShift(params.partition, params.userId);
  }

  @Get('adds')
  uploadsShift(): Promise<string> {
    return this.ClientService.uploadsShift();
  }

  @Patch('adds')
  updatesShift(@Body() shifts: ShiftDto[]): Promise<string> {
    return this.ClientService.updatesShift(shifts);
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
