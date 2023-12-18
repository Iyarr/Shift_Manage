import { Injectable } from '@nestjs/common';
import { DynamoDBClient, AttributeValue } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';
@Injectable()
export class DynamodbService {
  private dynamoDBClient: DynamoDBClient;

  constructor() {
    dotenv.config();
    this.dynamoDBClient = new DynamoDBClient({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
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

  GetClient(): DynamoDBClient {
    return this.dynamoDBClient;
  }
}
