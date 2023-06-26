import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DynamoDBProvider } from './dynamodb';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController, ConfigService],
  providers: [ConfigService, DynamoDBProvider],
})
export class AppModule {}
