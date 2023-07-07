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

type Item = {
  partition: string;
  userId: number;
};
type ShiftDto = {
  item: Item;
  opera: 'del' | 'up';
};

type userDto = {
  Item: userItem;
  opera: 'del' | 'up';
};
type userItem = {
  id: string;
  userName: string;
  displayName: string;
  password: string;
  iaManager: string;
};

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
    return this.resResult(multipleItemCommand);
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
    return this.resResult(command);
  }

  deletesShift() {
    const command = new BatchWriteCommand({
      RequestItems: {
        Shifts: [
          {
            DeleteRequest: {
              Key: {
                partition: '2023-07-29-C',
                userID: 0,
              },
            },
          },
          {
            DeleteRequest: {
              Key: {
                partition: '2023-07-29-C',
                userID: 0,
              },
            },
          },
        ],
      },
    });
    return this.resResult(command);
  }

  updatesShift(shifts: ShiftDto[]) {
    const requestItems = shifts.map((shift) => {
      if (shift.opera === 'up') {
        return {
          PutRequest: {
            Item: shift.item,
          },
        };
      } else {
        return {
          DeleteRequest: {
            Item: shift.item,
          },
        };
      }
    });
    const command = new BatchWriteCommand({
      RequestItems: {
        Shifts: [requestItems],
      },
    });
    return this.resResult(command);
  }

  updateUser(userDto: userDto) {
    const command = new BatchWriteCommand({
      RequestItems: {
        Users: [
          {
            PutRequest: {
              Item: userDto.Item,
            },
          },
        ],
      },
    });
    return this.resResult(command);
  }
  //　こいつをどの関数でも使いたい
  async resResult(command) {
    const response = await this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
