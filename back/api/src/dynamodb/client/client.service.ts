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

type Shift = {
  partition: string;
  userId: number;
};
type ShiftDto = {
  item: Shift;
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
  private dynamoDBDocClient: DynamoDBDocumentClient;

  constructor() {
    dotenv.config();
    const dynamoDBClient = new DynamoDBClient({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.dynamoDBDocClient = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  testQuery() {
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

  uploadShift(partition: string, userId: string) {
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
          { partition: '2023-07-29-C', userID: 0 },
          { partition: '2023-06-02-C', userID: 1 },
        ].map((shift) => {
          return { PutRequest: { Item: shift } };
        }),
      },
    });
    return this.resResult(command);
  }

  deletesShift() {
    const command = new BatchWriteCommand({
      RequestItems: {
        Shifts: [
          { partition: '2023-07-29-C', userID: 0 },
          { partition: '2023-06-02-C', userID: 1 },
        ].map((shift) => {
          return { DeleteRequest: { Key: shift } };
        }),
      },
    });
    return this.resResult(command);
  }

  // こっから実際使われそうなAPI
  downloadShifts(shifts: Shift[]) {
    const command = new BatchGetCommand({
      RequestItems: {
        Shifts: {
          Keys: shifts,
        },
      },
    });
    return this.resResult(command);
  }

  updateShifts(shifts: ShiftDto[]) {
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

  //referUser(userid: string, requireItem: string[]) {}

  updateUser(userDto: userDto) {
    const command = new BatchWriteCommand({
      RequestItems: {
        Users: [
          userDto.opera === 'up'
            ? [
                {
                  PutRequest: {
                    Item: userDto.Item,
                  },
                },
              ]
            : [
                {
                  DeleteRequest: {
                    Item: userDto.Item,
                  },
                },
              ],
        ],
      },
    });
    return this.resResult(command);
  }

  //　こいつをどの関数でも使いたい
  resResult(command) {
    const response = this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
