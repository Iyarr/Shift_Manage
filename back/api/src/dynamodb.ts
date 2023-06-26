import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamoDBProvider {
  private dynamoDBClient: DynamoDBClient;

  constructor() {
    this.dynamoDBClient = new DynamoDBClient({});
  }

  getClient(): DynamoDBClient {
    return this.dynamoDBClient;
  }
}

@Injectable()
export class DynamoDBConfig {
  constructor(private readonly configService: ConfigService) {
    const KeyID = this.configService.get<string>('MY_KEY_ID');
    const SecretKey = this.configService.get<string>('SECRET_KEY');
  }
}
