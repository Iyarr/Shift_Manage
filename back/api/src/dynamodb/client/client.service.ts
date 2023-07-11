import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  BatchGetCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';
import { TestQuery } from './testqurery';

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
  constructor(
    private dynamoDBDocClient: DynamoDBDocumentClient,
    private testquery: TestQuery,
  ) {
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
    this.testquery = new TestQuery(this.dynamoDBDocClient);
  }
  Usetestquery() {
    return this.testquery;
  }

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

  DownloadUserInfo(userId: string) {
    const command = new GetCommand({
      TableName: 'Users',
      Key: {
        id: userId,
      },
      ProjectionExpression: 'id,password',
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
