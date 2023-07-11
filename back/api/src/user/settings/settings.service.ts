import { Injectable } from '@nestjs/common';
import { ClientService } from '../../dynamodb/client/client.service';

type UserDto = {
  id: string;
  userName: string;
  displayName: string;
  password: string;
  iaManager: string;
};

@Injectable()
export class SettingsService {
  constructor(private ClientService: ClientService) {}
  UpdateSettings(Item: UserDto) {
    {
    }
  }
  CreateUser(UserInfo: UserDto) {
    this.ClientService.updateUser({ Item: UserInfo, opera: 'up' });
  }
  deleteUser() {}

  getSettingns() {}
}
