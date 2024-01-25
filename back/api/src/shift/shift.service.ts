import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import {
  DynamoDBClient,
  WriteRequest,
  BatchWriteItemCommand,
  AttributeValue,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { shift } from 'types-module';

@Injectable()
export class ShiftService {
  private dynamodbClient: DynamoDBClient;
  constructor(private dynamodbService: DynamodbService) {
    this.dynamodbClient = this.dynamodbService.GetClient();
  }

  async GetSchedule(st: string, fi: string) {
    const command = new QueryCommand({
      TableName: 'Shifts',
      KeyConditionExpression:
        '#hashKey = :HashValue AND #sortkey BETWEEN :St AND :Fi',
      ExpressionAttributeNames: {
        '#hashKey': 'ConstantKey',
        '#sortkey': 'part',
      },
      ExpressionAttributeValues: {
        ':HashValue': { S: 'ConstantValue' },
        ':St': { S: st },
        ':Fi': { S: fi },
      },
    });

    const res = await this.dynamodbClient.send(command);
    return res;
  }

  async GetYoursShifts(usernames: string[], st: string, fi: string) {
    const command = new QueryCommand({
      TableName: 'Shifts',
      KeyConditionExpression:
        '#hashKey = :HashValue AND #sortkey BETWEEN :St AND :Fi',
      ExpressionAttributeNames: {
        '#hashKey': 'ConstantKey',
        '#sortkey': 'part',
      },
      ExpressionAttributeValues: {
        ':HashValue': { S: 'ConstantValue' },
        ':St': { S: st },
        ':Fi': { S: fi },
      },
      ProjectionExpression: usernames.join(','),
    });

    const res = await this.dynamodbClient.send(command);
    return res;
  }

  // ユーザーごとに分けた更新ができない
  async WriteSchedule(shifts: shift[]) {
    const RequestItem: WriteRequest[] = shifts.map((shift) => {
      const item: Record<string, AttributeValue> = {
        ConstantKey: { S: 'ConstantValue' },
        partition: { S: shift.part },
      };

      const result: WriteRequest = {};

      if (shift.delete) {
        result.DeleteRequest = { Key: item };
      } else {
        shift.user_ids.forEach((user_ids) => {
          item[user_ids] = { BOOL: true };
        });
        result.PutRequest = { Item: item };
      }

      return result;
    });
    const command = new BatchWriteItemCommand({
      RequestItems: {
        Schedule: RequestItem,
      },
    });

    const res = await this.dynamodbClient.send(command);
    return res;
  }
}
