import { Injectable } from '@nestjs/common';
import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class SetupQuery {
  constructor(private dynamoDBDocClient: DynamoDBDocumentClient) {}
  UsersTable() {
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
  ShiftsTable() {
    const command = new CreateTableCommand({
      TableName: 'Shifts',
      AttributeDefinitions: [
        {
          AttributeName: 'partition',
          AttributeType: 'S',
        },
        {
          AttributeName: 'userName',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'partition',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'userName',
          KeyType: 'RANGE',
        },
      ],
    });

    return this.resResult(command);
  }
  InsertData() {
    const command = new BatchWriteCommand({
      RequestItems: {
        Shifts: [
          { partition: '2023-01-01-X', userName: 'Ohtani' },
          { partition: '2023-01-01-X', userName: 'sato' },
          { partition: '2023-01-01-X', userName: 'yamada' },
          { partition: '2023-01-01-Y', userName: 'Ohtani' },
          { partition: '2023-01-01-Y', userName: 'yamada' },
          { partition: '2023-01-01-Z', userName: 'sato' },
          { partition: '2023-01-01-Z', userName: 'yamada' },
          { partition: '2023-01-01-A', userName: 'Ohtani' },
          { partition: '2023-01-01-B', userName: 'sato' },
          { partition: '2023-01-01-C', userName: 'yamada' },
        ].map((shift) => {
          return { PutRequest: { Item: shift } };
        }),
        Users: [
          {
            userName: 'Ohtani',
            displayName: '大谷',
            password: 'Ohtanipass',
            isManager: false,
          },
          {
            userName: 'sato',
            displayName: '佐藤',
            password: 'satopass',
            isManager: false,
          },
          {
            userName: 'yamada',
            displayName: '山田',
            password: 'yamadapass',
            isManager: false,
          },
          {
            userName: 'taniyama',
            displayName: '谷山',
            password: 'taniyamapass',
            isManager: true,
          },
        ].map((user) => {
          return { PutRequest: { Item: user } };
        }),
      },
    });
    return this.resResult(command);
  }

  async resResult(command) {
    const response = await this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
