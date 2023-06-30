import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientService } from './client/client.service';
import { TestqueryController } from './testquery/testquery.controller';

@Module({
  imports: [ConfigModule],
  controllers: [TestqueryController],
  providers: [ClientService, ConfigService],
})
export class DynamodbModule {}
