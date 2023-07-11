import { Module, Global } from '@nestjs/common';
import { ClientService } from './client/client.service';
import { SettingController } from './setting.controller';
import { TestController } from './test.controller';

@Module({
  imports: [],
  controllers: [TestController, SettingController],
  providers: [ClientService],
})
export class DynamodbModule {}
