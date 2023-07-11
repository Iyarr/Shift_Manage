import { Injectable } from '@nestjs/common';
import { ClientService } from '../../dynamodb/client/client.service';

type authDto = {
  id: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private ClientService: ClientService) {}
  userAuth(authInfo: authDto) {
    const password = this.ClientService.DownloadUserInfo(authInfo.id);
    return;
  }
}
