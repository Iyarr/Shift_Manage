import { Injectable } from '@nestjs/common';
import { ClientService } from '../../dynamodb/client/client.service';

type UserDto = {
  userName: string;
  displayName: string;
  password: string;
  isManager: boolean;
};

@Injectable()
export class SettingsService {
  constructor(private ClientService: ClientService) {}
  WriteUser(UserInfo: UserDto) {
    return this.ClientService.WriteUser(UserInfo);
  }

  deleteUser(userId: string) {
    return this.ClientService.DeleteUser(userId);
  }

  getSettingns(userId: string) {
    return this.ClientService.DownloadUserInfo(userId);
  }
}
