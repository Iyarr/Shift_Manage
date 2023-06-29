import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { SettingsController } from './settings/settings.controller';
import { DynamodbModule } from '../dynamodb/dynamodb.module';

@Module({
  imports: [],
  controllers: [AuthController, SettingsController],
  providers: [],
})
export class UserModule {}
