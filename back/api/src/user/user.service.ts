import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { UpdateUserBody } from 'types-module';

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
        '#hashKey': 'user_id',
        '#password': 'password',
      },
      FilterExpression: '#password = :PassValue',
      ExpressionAttributeValues: {
        ':HashValue': { S: userItem.username },
        ':PassValue': { S: userItem.password },
      },
      ProjectionExpression: 'is_admin',
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  GetUser(user_id: string) {
    const command = new GetItemCommand({
      TableName: 'Users',
      Key: {
        user_id: { S: user_id },
      },
    });
    const response = this.dynamodbService.SubmitCommand(command);
    return response;
  }

  CreateUser(userItem: Record<string, string | boolean>) {
    const command = new PutItemCommand({
      TableName: 'Users',
      Item: this.dynamodbService.ObjectToAttributeValue(userItem),
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  UpdateUser(user_id: string, userItem: UpdateUserBody) {
    const ExpressionAttributeNames: Record<string, string> = {};
    const ExpressionAttributeValues: Record<string, AttributeValue> = {};
    const UpdateExpression: string[] = [];

    ['password', 'name'].forEach((item) => {
      if (item in userItem) {
        ExpressionAttributeNames['#' + item] = item;
        ExpressionAttributeValues[':' + item] = { S: userItem[item] };
        UpdateExpression.push(' #' + item + ' = ' + ':' + item);
      }
    });

    if ('is_admin' in userItem) {
      ExpressionAttributeNames['#is_admin'] = 'is_admin';
      ExpressionAttributeValues[':is_admin'] = { BOOL: userItem['is_admin'] };
      UpdateExpression.push(' #is_admin = :is_admin');
    }

    const command = new UpdateItemCommand({
      TableName: 'Users',
      Key: { user_id: { S: user_id } },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: 'SET' + UpdateExpression.join(','),
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  DeleteUser(user_id: string) {
    const command = new DeleteItemCommand({
      TableName: 'Users',
      Key: {
        user_id: { S: user_id },
      },
    });
    return this.dynamodbService.SubmitCommand(command);
  }
}
