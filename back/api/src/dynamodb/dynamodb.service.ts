import { Injectable } from '@nestjs/common';
import { DynamoDBClient, AttributeValue } from '@aws-sdk/client-dynamodb';
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

  ObjectToAttributeValue(obj: Record<string, string | boolean>) {
    const res: Record<string, AttributeValue> = {};
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        res[key] = { S: obj[key] as string };
      } else {
        res[key] = { BOOL: obj[key] as boolean };
      }
    }
    return res;
  }

  AttributeValueToString(obj: Record<string, AttributeValue>) {
    const res: Record<string, string | boolean> = {};
    for (const key in obj) {
      if ('S' in obj[key]) {
        res[key] = obj[key].S;
      } else {
        res[key] = obj[key].BOOL;
      }
    }
    return res;
  }

  async SubmitCommand(command) {
    const response = await this.dynamoDBDocClient.send(command);

    if ('Item' in response) {
      return this.AttributeValueToString(response.Item);
    }
    return response;
  }
}
