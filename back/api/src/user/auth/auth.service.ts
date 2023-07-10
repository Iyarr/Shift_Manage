import { Injectable } from '@nestjs/common';
import { ClientService } from '../../dynamodb/client/client.service';

@Injectable()
export class AuthService {
  constructor(private ClientService: ClientService) {}
}
