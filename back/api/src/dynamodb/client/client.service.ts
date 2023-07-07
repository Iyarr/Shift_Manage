import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  BatchGetCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

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

  uploadShift(partition, userId) {
    const command = new PutCommand({
      TableName: 'Shifts',
      Item: {
        partition: partition,
        userID: Number(userId),
      },
    });
    return this.resResult(command);
  }

  uploadsShift() {
    const query = async (): Promise<string> => {
      try {
        const command = new BatchWriteCommand({
          RequestItems: {
            Shifts: [
              {
                PutRequest: {
                  Item: {
                    partition: '2023-07-29-C',
                    userID: 0,
                  },
                },
              },
              {
                PutRequest: {
                  Item: {
                    partition: '2023-06-02-C',
                    userID: 1,
                  },
                },
              },
            ],
          },
        });
        const response = await this.dynamoDBDocClient.send(command);
        console.log(response);
        return JSON.stringify(response);
      } catch (response) {
        console.error('ERROR', response);
        return JSON.stringify(response);
      }
    };
    return query();
  }

  //　こいつをどの関数でも使いたい
  async resResult(command: PutCommand) {
    const response = await this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
