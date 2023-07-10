import { Injectable } from '@nestjs/common';
import { ClientService } from '../../dynamodb/client/client.service';

@Injectable()
export class SettingsService {
  constructor(private ClientService: ClientService) {}
}
