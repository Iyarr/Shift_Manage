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

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  GetSchedule(st: string, fi: string) {
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

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  GetYoursShifts(usernames: string[], st: string, fi: string) {
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

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }
}
