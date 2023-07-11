import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client/client.service';

@Controller('setting')
export class SettingController {
  constructor(private ClientService: ClientService) {}

  @Get('table')
  table() {
    const usersTable = this.ClientService.UseSetupQuery().UsersTable();
    const shiftsTable = this.ClientService.UseSetupQuery().ShiftsTable();
    return {
      users: usersTable,
      shifts: shiftsTable,
    };
  }

  @Get('data')
  data() {
    return this.ClientService.UseSetupQuery().InsertData();
  }
}
