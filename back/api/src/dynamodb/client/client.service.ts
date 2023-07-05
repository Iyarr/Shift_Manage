import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  ScanCommand,
  CreateTableCommand,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  BatchGetCommand,
} from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

interface Shift {
  id: number;
  partition: string;
}
@Injectable()
export class ClientService {
  private dynamoDBClient: DynamoDBClient;
  private dynamoDBDocClient: DynamoDBDocumentClient;

  constructor() {
    dotenv.config();
    this.dynamoDBClient = new DynamoDBClient({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.dynamoDBDocClient = DynamoDBDocumentClient.from(this.dynamoDBClient);
  }

  getClient(): DynamoDBClient {
    return this.dynamoDBClient;
  }

  testQuery(Id: number, Partition: string) {
    const query = async (): Promise<string> => {
      try {
        const command = new GetCommand({
          // Omit<__GetItemCommandInput, "Key">
          TableName: 'Shift',
          // Key: Record<string, NativeAttributeValue>
          Key: {
            id: Id,
            partition: Partition,
          },
        });
        const key = {
          key: { id: 2, partition: '2023-06-29-C' },
        };
        const multipleItemCommand = new BatchGetCommand({
          RequestItems: {
            Shift: {
              Keys: [
                { id: 1, partition: '2023-06-29-C' },
                { id: 0, partition: '2023-06-29-C' },
              ],
            },
            Shifts: {
              Keys: [
                { userID: 1, partition: '2023-06-29-C' },
                { userID: 0, partition: '2023-06-29-C' },
              ],
            },
          },
        });
        const response = await this.dynamoDBDocClient.send(multipleItemCommand);
        console.log(response);
        return JSON.stringify(response);
      } catch (response) {
        console.error('ERROR', response);
        return JSON.stringify(response);
      }
    };
    return query();
  }

  addShift() {
    const query = async (): Promise<string> => {
      try {
        const command = new PutCommand({
          TableName: 'Shifts',
          Item: {
            partition: '2023-06-29-C',
            userID: 2,
          },
        });
        const response = await this.dynamoDBDocClient.send(command);
        return JSON.stringify(response);
      } catch (response) {
        console.error('ERROR', response);
        return JSON.stringify(response);
      }
    };
    return query();
  }
}
