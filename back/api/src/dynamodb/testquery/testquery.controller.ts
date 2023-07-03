import { Controller, Get } from '@nestjs/common';
import { ClientService } from '../client/client.service';

@Controller('testquery')
export class TestqueryController {
  constructor(private ClientService: ClientService) {
    this.ClientService = ClientService;
  }

  @Get()
  async getHello(): Promise<string> {
    return this.ClientService.testQuery();
  }
}
