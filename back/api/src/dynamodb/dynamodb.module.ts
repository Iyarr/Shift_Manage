import { Module, Global } from '@nestjs/common';
import { ClientService } from './client/client.service';
import { TestqueryController } from './testquery/testquery.controller';

@Module({
  imports: [],
  controllers: [TestqueryController],
  providers: [ClientService],
})
export class DynamodbModule {}
