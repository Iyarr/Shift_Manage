import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  providers: [AppService, ConfigService, DynamoDBProvider],
})
export class AppModule {}
