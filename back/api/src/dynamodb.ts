import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

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
