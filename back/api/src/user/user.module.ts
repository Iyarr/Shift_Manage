import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { ClientService } from '../dynamodb/client/client.service';

@Module({
  imports: [DynamodbModule],
  controllers: [AuthController, SettingsController],
  providers: [SettingsService, AuthService, ClientService],
})
export class UserModule {}
