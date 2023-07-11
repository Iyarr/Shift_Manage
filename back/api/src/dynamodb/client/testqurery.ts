import { Injectable } from '@nestjs/common';
import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  BatchGetCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

type Shift = {
  partition: string;
  userName: string;
};

@Injectable()
export class TestQuery {
  constructor(private dynamoDBDocClient: DynamoDBDocumentClient) {}
  createTable() {
    const command = new CreateTableCommand({
      TableName: 'Users',
      AttributeDefinitions: [
        {
          AttributeName: 'userName',
          AttributeType: 'S',
        },
        {
          AttributeName: 'displayName',
          AttributeType: 'S',
        },
        {
          AttributeName: 'password',
          AttributeType: 'S',
        },
        {
          AttributeName: 'isManager',
          AttributeType: 'B',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'userName',
          KeyType: 'HASH',
        },
      ],
    });

    return this.resResult(command);
  }

  testQuery() {
    const command = new BatchGetCommand({
      RequestItems: {
        Shift: {
          Keys: [
            { userName: '1', partition: '2023-06-29-C' },
            { userName: '0', partition: '2023-06-29-C' },
          ],
        },
        Shifts: {
          Keys: [
            { userName: '1', partition: '2023-06-29-C' },
            { userName: '0', partition: '2023-06-29-C' },
          ],
        },
      },
    });
    return this.resResult(command);
  }

  uploadShift(shift: Shift) {
    const command = new PutCommand({
      TableName: 'Shifts',
      Item: shift,
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

  resResult(command) {
    const response = this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
