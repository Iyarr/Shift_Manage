import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from '../client/client.service';

@Controller('testquery')
export class TestqueryController {
  constructor(private ClientService: ClientService) {
    this.ClientService = ClientService;
  }

  @Get(':id/:partition')
  async getHello(@Param() params): Promise<string> {
    return this.ClientService.testQuery(Number(params.id), params.partition);
  }

  @Get('add/:userId/:partition')
  uploadShift(@Param() params) {
    return this.ClientService.uploadShift(params.partition, params.userId);
  }

  @Get('adds')
  uploadsShift(): Promise<string> {
    return this.ClientService.uploadsShift();
  }
}
