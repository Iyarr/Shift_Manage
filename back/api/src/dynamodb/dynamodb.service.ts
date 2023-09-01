import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

@Injectable()
export class DynamodbService {
  private dynamoDBDocClient: DynamoDBDocumentClient;

  constructor() {
    dotenv.config();
    this.dynamoDBDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: 'ap-northeast-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }),
    );
  }

  async SubmitCommand(command) {
    const response = await this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
