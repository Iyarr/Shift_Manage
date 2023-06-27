import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { SettingsController } from './settings/settings.controller';

@Module({
  imports: [],
  controllers: [AuthController, SettingsController],
  providers: [],
})
export class UserModule {}
