import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  DeleteCommand,
  BatchGetCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';
import { TestQuery } from './test';
import { SetupQuery } from './setup';

type Shift = {
  partition: string;
  userName: string;
};
type ShiftDto = {
  item: Shift;
  shouldAdd: boolean;
};

type userDto = {
  userName: string;
  displayName: string;
  password: string;
  isManager: boolean;
};

@Injectable()
export class ClientService {
  constructor(
    private dynamoDBDocClient: DynamoDBDocumentClient,
    private testquery: TestQuery,
    private setupquery: SetupQuery,
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
    this.setupquery = new SetupQuery(this.dynamoDBDocClient);
  }
  UseTestQuery() {
    return this.testquery;
  }
  UseSetupQuery() {
    return this.setupquery;
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
      return shift.shouldAdd
        ? {
            PutRequest: {
              Item: shift.item,
            },
          }
        : {
            DeleteRequest: {
              Item: shift.item,
            },
          };
    });
    const command = new BatchWriteCommand({
      RequestItems: {
        Shifts: [requestItems],
      },
    });
    return this.resResult(command);
  }
  WriteUser(userDto: userDto) {
    const command = new PutCommand({
      TableName: 'Shifts',
      Item: userDto,
    });
    return this.resResult(command);
  }
  DeleteUser(userName: string) {
    const command = new DeleteCommand({
      TableName: 'Users',
      Key: {
        userName: userName,
      },
    });
    return this.resResult(command);
  }

  DownloadUserInfo(userName: string) {
    const command = new GetCommand({
      TableName: 'Users',
      Key: {
        userName: userName,
      },
    });
    return this.resResult(command);
  }

  DownloadForAuth(userName: string) {
    const command = new GetCommand({
      TableName: 'Users',
      Key: {
        userName: userName,
      },
      ProjectionExpression: 'userName,password',
    });
    return this.resResult(command);
  }

  resResult(command) {
    const response = this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
