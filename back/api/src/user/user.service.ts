import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { UpdateUserItem } from 'types-module';

import {
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  AttributeValue,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class UserService {
  constructor(private dynamodbService: DynamodbService) {}

  VerifyUser(userItem: Record<string, string>) {
    const command = new QueryCommand({
      TableName: 'Users',
      KeyConditionExpression: '#hashKey = :HashValue',
      ExpressionAttributeNames: {
        '#hashKey': 'userName',
        '#password': 'password',
      },
      FilterExpression: '#password = :PassValue',
      ExpressionAttributeValues: {
        ':HashValue': { S: userItem.username },
        ':PassValue': { S: userItem.password },
      },
      ProjectionExpression: 'isManager',
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  async GetUser(Username: string) {
    const command = new GetItemCommand({
      TableName: 'Users',
      Key: {
        userName: { S: Username },
      },
    });
    const response = await this.dynamodbService.SubmitCommand(command);
    return response;
  }

  NewUser(userItem: Record<string, string | boolean>) {
    const command = new PutItemCommand({
      TableName: 'Users',
      Item: this.dynamodbService.ObjectToAttributeValue(userItem),
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  UpdateUser(username: string, userItem: UpdateUserItem) {
    const ExpressionAttributeNames: Record<string, string> = {};
    const ExpressionAttributeValues: Record<string, AttributeValue> = {};
    const UpdateExpression: string[] = [];

    ['password', 'displayName'].forEach((item) => {
      if (item in userItem) {
        ExpressionAttributeNames['#' + item] = item;
        ExpressionAttributeValues[':' + item] = { S: userItem[item] };
        UpdateExpression.push(' #' + item + ' = ' + ':' + item);
      }
    });

    if ('isManager' in userItem) {
      ExpressionAttributeNames['#isManager'] = 'isManager';
      ExpressionAttributeValues[':isManager'] = { BOOL: userItem['isManager'] };
      UpdateExpression.push(' #isManager = :isManager');
    }

    const command = new UpdateItemCommand({
      TableName: 'Users',
      Key: { userName: { S: username } },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: 'SET' + UpdateExpression.join(','),
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  DeleteUser(Username: string) {
    const command = new DeleteItemCommand({
      TableName: 'Users',
      Key: {
        userName: { S: Username },
      },
    });
    return this.dynamodbService.SubmitCommand(command);
  }
}
