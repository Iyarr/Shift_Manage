import { Injectable } from '@nestjs/common';
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
  // ユーザーごとに分けた更新ができない
  WriteSchedule(shifts: shift[]) {
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

    return this.dynamodbClient.send(command);
  }

  GetSchedule(st: string, fi: string) {
    const command = new QueryCommand({
      TableName: 'Schedule',
      KeyConditionExpression:
        '#hashKey = :HashValue AND #sortkey BETWEEN :St AND :Fi',
      ExpressionAttributeNames: {
        '#hashKey': 'ConstantKey',
        '#sortkey': 'partition',
      },
      ExpressionAttributeValues: {
        ':HashValue': { S: 'ConstantValue' },
        ':St': { S: st },
        ':Fi': { S: fi },
      },
    });

    return this.dynamodbClient.send(command);
  }

  GetYoursShifts(usernames: string[], st: string, fi: string) {
    const command = new QueryCommand({
      TableName: 'Schedule',
      KeyConditionExpression:
        '#hashKey = :HashValue AND #sortkey BETWEEN :St AND :Fi',
      ExpressionAttributeNames: {
        '#hashKey': 'ConstantKey',
        '#sortkey': 'partition',
      },
      ExpressionAttributeValues: {
        ':HashValue': { S: 'ConstantValue' },
        ':St': { S: st },
        ':Fi': { S: fi },
      },
      ProjectionExpression: usernames.join(','),
    });
    return this.dynamodbClient.send(command);
  }
}
