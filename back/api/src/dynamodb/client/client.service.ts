import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  ScanCommand,
  CreateTableCommand,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
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

  testQuery() {
    const query = async (): Promise<string> => {
      const command = new ScanCommand({ TableName: 'Shift' });
      const response = await this.dynamoDBClient.send(command);
      return JSON.stringify(response);
    };
    return query();
  }

  addtable() {
    const createTable = async () => {
      try {
        const command = new CreateTableCommand({
          TableName: 'Games', // テーブル名
          KeySchema: [
            { AttributeName: 'Hardware', KeyType: 'HASH' }, // パーティションキー
            { AttributeName: 'GameId', KeyType: 'RANGE' }, // ソートキー
          ],
          AttributeDefinitions: [
            { AttributeName: 'Hardware', AttributeType: 'S' }, // 文字列属性
            { AttributeName: 'GameId', AttributeType: 'S' }, // 文字列属性
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          StreamSpecification: {
            StreamEnabled: false,
          },
        });
        return JSON.stringify(await this.dynamoDBClient.send(command), null, 2);
      } catch (err) {
        console.error('ERROR', err);
        return typeof err;
      }
    };
    return createTable();
  }
}
