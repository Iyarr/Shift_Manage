import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientService } from './client/client.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ClientService],
})
export class DynamodbModule {}
